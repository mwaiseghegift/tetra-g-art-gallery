# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, GitHub Copilot, etc.) when working with code in this repository.

## Project overview

Tetra-G Art Gallery is a digital art portfolio platform with QR-code-linked artwork authentication and storytelling. See `docs/system-overview.md` for the full product spec and `docs/pages.md` for the planned page/route list. `docs/architecture.md` describes the intended module layout — much of this is aspirational; the codebase is currently an early scaffold (see "Current state" notes under each project below). `docs/api.md` documents the implemented backend REST endpoints (auth, artworks, collections, QR codes, signatures).

The repo is split into two independently-run projects:

- `api/` — Django REST backend
- `ui/` — Next.js frontend

### Planned product surface (from `docs/pages.md` / `docs/system-overview.md`)

- **Public site**: home, gallery (filterable grid + search), artwork detail (`/artwork/ART-2026-001`-style routes), collections/series, about artist, contact, commissions, blog
- **QR/authentication**: QR landing page (validates artwork ID, redirects to detail), verification page (digital signature + "verified original" badge + timestamp), QR code info page
- **Admin/artist dashboard**: dashboard home, manage artworks, artwork editor (image, story, metadata, QR generation, signature assignment), QR code generator, signature management, analytics (scans/views/engagement), settings, login
- **System pages**: 404, loading/redirect (for QR scan resolution)

Each artwork has a unique ID (e.g. `ART-2026-001`) that ties together its gallery entry, detail page, QR code, and signature/verification record — this ID is the central join key across the artworks, QR codes, and signatures modules.

## Backend (`api/`)

Django 6.0 project, with dependencies for DRF + JWT + Cloudinary storage already in `api/requirements.txt`, though these are **not yet wired into** `api/config/settings.py` (`INSTALLED_APPS`, `REST_FRAMEWORK`, storage backend, etc.).

Setup and common commands (run from `api/`, using the existing `venv`):

```bash
# Windows
venv\Scripts\activate
pip install -r requirements.txt

python manage.py runserver
python manage.py makemigrations
python manage.py migrate
python manage.py test            # run all tests
python manage.py test accounts   # run tests for one app
python manage.py createsuperuser
```

Structure (per `docs/architecture.md`):

- `accounts/` — JWT authentication and user account endpoints (registration, login/token, `/me`)
- `apps/` — domain modules: `artworks`, `collections`, `qr_codes`, `signatures` are implemented; `analytics` is still planned (mapping to the modules in `docs/system-overview.md` section 6)
- `config/` — project settings (`settings.py`), URL routing (`urls.py`), WSGI/ASGI entry points
- `core/` — shared models/services/utilities/constants across apps; registered in `INSTALLED_APPS`, provides `permissions.py` (`IsAdminOrReadOnly`) and the Cloudinary upload-signature endpoint (`views.py`/`urls.py`)

Current state / gotchas:

- `DEBUG` defaults to `True` and `SECRET_KEY` defaults to the auto-generated dev key — both must be overridden via `api/.env` before any deployment (see `api/.env.example`); `settings.py` reads `SECRET_KEY`, `DEBUG`, and `ALLOWED_HOSTS` via `python-decouple`.
- All `apps.*` endpoints use `IsAdminOrReadOnly` (`core/permissions.py`): `GET` is public, writes require a JWT (from `/api/auth/token/`) for a staff user (`is_staff=True`). Regular registered users can only manage their own profile via `/api/auth/me/`. See `docs/api.md` for the full endpoint reference.
- `core` is registered in `INSTALLED_APPS` and has no migrations beyond the initial empty one.
- DB is sqlite3 (`api/db.sqlite3`) via the default Django config — fine for development, but `docs/system-overview.md` anticipates Postgres/Firebase/Mongo for production.
- Media uploads (artwork `image`/`video`) use a hybrid Cloudinary flow: the dashboard can either paste a direct URL, or upload a file, which the frontend sends straight to Cloudinary using a signature obtained from the staff-only `POST /api/uploads/signature/` endpoint (see `docs/api.md`). Configure `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` / `CLOUDINARY_FOLDER` in `api/.env` (see `api/.env.example`); `settings.py` reads these via `python-decouple`.

## Frontend (`ui/`)

Next.js 16 (App Router) + React 19 + Tailwind CSS 4 + TypeScript, currently the default `create-next-app` scaffold.

Commands (run from `ui/`):

```bash
npm run dev      # start dev server
npm run build    # production build
npm run start    # run production build
npm run lint     # eslint
```

**Important**: This Next.js version has breaking changes vs. training data — consult `node_modules/next/dist/docs/` for current APIs/conventions before writing Next.js code, and follow any deprecation notices.

Planned structure (per `docs/architecture.md`), not yet built out:

- `app/` — routes, layouts, pages (see planned page list above)
- `components/` — reusable UI components
- `lib/` — shared hooks, services, utilities, types, constants, config (e.g. API client, auth context, Cloudinary upload util, etc.)
- `public/` — static assets

## Design references

`design/` contains UI mockups and per-page descriptions (home, gallery, artwork detail) intended to guide implementation of the corresponding pages from `docs/pages.md`.
