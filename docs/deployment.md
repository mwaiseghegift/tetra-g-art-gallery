# Deployment Guide — VPS Setup

This guide walks through deploying Tetra-G Art Gallery (`api/` Django backend +
`ui/` Next.js frontend) to a VPS, served from `tetra-g.mwaisegheware.com`.

It assumes:

- The repo is already cloned at `/apps/tetra-g-art-gallery` on the VPS.
- Ubuntu/Debian-based VPS with `sudo` access.
- A single domain (`tetra-g.mwaisegheware.com`) serves the frontend, with the
  Django API reverse-proxied under `/api/`, `/admin/` and `/static/` on the
  same domain (matches `NEXT_PUBLIC_API_URL=https://tetra-g.mwaisegheware.com/api`
  in `ui/.env.example`).

## 0. Architecture

```text
Internet → Nginx (443/80, tetra-g.mwaisegheware.com)
             ├─ /api/, /admin/, /static/, /media/ → Gunicorn (127.0.0.1:8001) → Django (api/)
             └─ everything else                   → Next.js (127.0.0.1:3000)  → (ui/)
```

Gunicorn and Next.js are run as systemd services so they restart on crash/reboot.

---

## 1. DNS

In your DNS provider for `mwaisegheware.com`, create an **A record**:

| Type | Name      | Value          |
|------|-----------|----------------|
| A    | `tetra-g` | `<VPS_IP>`     |

Wait for propagation (`dig tetra-g.mwaisegheware.com`) before requesting a
TLS certificate in step 7.

---

## 2. System packages

SSH into the VPS and install the base toolchain:

```bash
sudo apt update
sudo apt install -y python3 python3-venv python3-pip nginx git curl

# Node.js 20.x (required by Next.js 16 / React 19)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

node -v   # should be v20.x
python3 --version
```

---

## 3. Get the latest code

```bash
cd /apps/tetra-g-art-gallery
git pull origin main
```

---

## 4. Backend setup (`api/`)

### 4.1 Virtualenv + dependencies

```bash
cd /apps/tetra-g-art-gallery/api
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
pip install gunicorn
```

### 4.2 Production `.env`

Create `/apps/tetra-g-art-gallery/api/.env` (copy from `.env.example` and fill in):

```bash
cp .env.example .env
```

```dotenv
# api/.env
SECRET_KEY=<generate a long random value>
DEBUG=False
ALLOWED_HOSTS=tetra-g.mwaisegheware.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLOUDINARY_FOLDER=tetra-art
```

Generate a secret key:

```bash
python3 -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

> **Note:** `DEBUG` and `ALLOWED_HOSTS` are read from `.env` already
> (`api/config/settings.py`), so no code changes are needed for those. `SECRET_KEY`
> must also be overridden — never run with the default dev key in production.

### 4.3 Allow the production domain in CORS

`CORS_ALLOWED_ORIGINS` in `api/config/settings.py` is currently hardcoded to
localhost. Add the production origin before deploying:

```python
# api/config/settings.py
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://tetra-g.mwaisegheware.com',
]
```

### 4.4 Static files

Add a `STATIC_ROOT` if not already present (needed for `collectstatic` to have
somewhere to write to):

```python
# api/config/settings.py
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
```

Then:

```bash
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser   # first deploy only
```

### 4.5 Gunicorn systemd service

Create `/etc/systemd/system/tetra-api.service`:

```ini
[Unit]
Description=Tetra-G Art Gallery - Django API (Gunicorn)
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/home/dev/apps/tetra-g-art-gallery/api
ExecStart=/home/dev/apps/tetra-g-art-gallery/api/venv/bin/gunicorn \
    --workers 3 \
    --bind 127.0.0.1:8001 \
    config.wsgi:application
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now tetra-api
sudo systemctl status tetra-api
```

---

## 5. Frontend setup (`ui/`)

### 5.1 Environment

Create `/apps/tetra-g-art-gallery/ui/.env.local`:

```dotenv
NEXT_PUBLIC_API_URL=https://tetra-g.mwaisegheware.com/api
NEXT_PUBLIC_SITE_URL=https://tetra-g.mwaisegheware.com
```

### 5.2 Install + build

```bash
cd /apps/tetra-g-art-gallery/ui
npm install
npm run build
```

### 5.3 systemd service

Create `/etc/systemd/system/tetra-ui.service`:

```ini
[Unit]
Description=Tetra-G Art Gallery - Next.js frontend
After=network.target

[Service]
User=dev
Group=www-data
WorkingDirectory=/home/dev/apps/tetra-g-art-gallery/ui
Environment=NODE_ENV=production
Environment=PORT=3004
ExecStart=/usr/bin/npm run start
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now tetra-ui
sudo systemctl status tetra-ui
```

---

## 6. Nginx reverse proxy

Create `/etc/nginx/sites-available/tetra-g.mwaisegheware.com`:

```nginx
server {
    listen 80;
    server_name tetra-g.mwaisegheware.com;

    client_max_body_size 20M;

    # Django admin, API, static & media files
    location /api/ {
        proxy_pass http://127.0.0.1:8004;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /admin/ {
        proxy_pass http://127.0.0.1:8004;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static/ {
        alias /home/dev/apps/tetra-g-art-gallery/api/staticfiles/;
    }

    # Next.js frontend (everything else)
    location / {
        proxy_pass http://127.0.0.1:3004;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/tetra-g.mwaisegheware.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 7. HTTPS with Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d tetra-g.mwaisegheware.com
```

Certbot will edit the Nginx config to redirect HTTP → HTTPS and auto-renew via
a systemd timer (`sudo systemctl status certbot.timer`).

---

## 8. Verifying the deployment

```bash
# Backend
curl -I https://tetra-g.mwaisegheware.com/api/artworks/

# Frontend
curl -I https://tetra-g.mwaisegheware.com/

# Admin
curl -I https://tetra-g.mwaisegheware.com/admin/
```

Visit `https://tetra-g.mwaisegheware.com` in a browser and confirm the gallery
loads and artwork data comes from the API (check the Network tab for calls to
`/api/...`).

---

## 9. Redeploying after changes

```bash
cd /apps/tetra-g-art-gallery
git pull origin main

# Backend
cd api
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
sudo systemctl restart tetra-api

# Frontend
cd ../ui
npm install
npm run build
sudo systemctl restart tetra-ui
```

---

## 10. Troubleshooting

- **502 from Nginx**: check `sudo systemctl status tetra-api` / `tetra-ui` and
  `journalctl -u tetra-api -n 50` / `journalctl -u tetra-ui -n 50`.
- **CORS errors in browser console**: confirm
  `https://tetra-g.mwaisegheware.com` is in `CORS_ALLOWED_ORIGINS`
  (`api/config/settings.py`) and `tetra-api` was restarted after the change.
- **`DisallowedHost` error**: confirm `ALLOWED_HOSTS=tetra-g.mwaisegheware.com`
  is set in `api/.env` and the service was restarted.
- **Static admin CSS missing**: re-run `collectstatic` and confirm the Nginx
  `/static/` alias path matches `STATIC_ROOT`.
- **Cloudinary uploads failing**: verify `CLOUDINARY_*` vars in `api/.env` and
  that `POST /api/uploads/signature/` returns 200 for a staff JWT.

### 11. Updating the systemd services

#### Gunicorn (`tetra-api.service`)

```bash
sudo systemctl daemon-reload
sudo systemctl restart tetra-api
sudo systemctl status tetra-api
journalctl -u tetra-api -n 20 --no-pager
```

#### Next.js (`tetra-ui.service`)

```bash
sudo systemctl daemon-reload
sudo systemctl restart tetra-ui
sudo systemctl status tetra-ui
journalctl -u tetra-ui -n 20 --no-pager
```
