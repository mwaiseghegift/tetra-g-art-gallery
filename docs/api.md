# API Reference

Base URL (development): `http://127.0.0.1:8000/api/`

All request/response bodies are JSON.

## Authentication

Authentication uses JWT (via `djangorestframework-simplejwt`).

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register/` | none | Create a new user account |
| POST | `/api/auth/token/` | none | Obtain an access/refresh token pair |
| POST | `/api/auth/token/refresh/` | none | Exchange a refresh token for a new access token |
| GET | `/api/auth/me/` | required | Get the current user's profile |
| PATCH | `/api/auth/me/` | required | Update the current user's profile |

Send the access token on subsequent requests:

```
Authorization: Bearer <access_token>
```

### POST /api/auth/register/

Request body:

```json
{
  "username": "artist",
  "email": "artist@tetra.art",
  "password": "S3curePass123",
  "first_name": "",
  "last_name": ""
}
```

Response `201`:

```json
{
  "id": 1,
  "username": "artist",
  "email": "artist@tetra.art",
  "first_name": "",
  "last_name": ""
}
```

### POST /api/auth/token/

Request body:

```json
{ "username": "artist", "password": "S3curePass123" }
```

Response `200`:

```json
{ "access": "<jwt>", "refresh": "<jwt>" }
```

### POST /api/auth/token/refresh/

Request body:

```json
{ "refresh": "<jwt>" }
```

Response `200`:

```json
{ "access": "<jwt>" }
```

### GET/PATCH /api/auth/me/

Returns/updates `{ id, username, email, first_name, last_name }` for the authenticated user.

---

## Authorization model

All endpoints below use `IsAuthenticatedOrReadOnly`:

- **`GET`** requests are public (no auth required) — used by the public gallery, artwork detail pages, and QR scans.
- **`POST` / `PUT` / `PATCH` / `DELETE`** require a valid `Authorization: Bearer <access_token>` header — used by the admin/artist dashboard.

---

## Artworks

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/artworks/` | none | List all artworks |
| POST | `/api/artworks/` | required | Create an artwork |
| GET | `/api/artworks/<artwork_id>/` | none | Retrieve a single artwork |
| PUT/PATCH | `/api/artworks/<artwork_id>/` | required | Update an artwork |
| DELETE | `/api/artworks/<artwork_id>/` | required | Delete an artwork |

`<artwork_id>` is the human-readable identifier (e.g. `ART-2024-001`), auto-generated from `year` on create.

### Artwork object

| Field | Type | Notes |
|---|---|---|
| `id` | int | read-only |
| `unique_id` | uuid | read-only, auto-generated |
| `artwork_id` | string | read-only, auto-generated (`ART-<year>-<seq>`) |
| `title` | string | |
| `slug` | string | read-only, derived from `title` |
| `medium` | string | e.g. "Acrylic on Canvas" |
| `year` | int | |
| `dimensions` | string | e.g. "120cm x 90cm" |
| `collection` | string \| null | `Collection.slug`, write by slug |
| `description` | string | |
| `story` | string | "story behind the piece" |
| `origin` | string | e.g. "Kenya" |
| `creation_time` | string | e.g. "3 Weeks" |
| `availability` | enum | `available`, `sold`, `not_for_sale` |
| `image` | url | |
| `video` | url | optional video walkthrough/process clip |
| `is_verified` | bool | |
| `views_count` | int | read-only |
| `likes_count` | int | read-only |
| `created_at` / `updated_at` | datetime | read-only |

### Example: create an artwork

```http
POST /api/artworks/
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Roots Within",
  "medium": "Acrylic on Canvas",
  "year": 2024,
  "dimensions": "120cm x 90cm",
  "collection": "identity-memory",
  "description": "A journey into identity.",
  "story": "Created during a season of reflection.",
  "origin": "Kenya",
  "creation_time": "3 Weeks"
}
```

---

## Collections

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/collections/` | none | List all collections |
| POST | `/api/collections/` | required | Create a collection |
| GET | `/api/collections/<slug>/` | none | Retrieve a single collection |
| PUT/PATCH | `/api/collections/<slug>/` | required | Update a collection |
| DELETE | `/api/collections/<slug>/` | required | Delete a collection |
| GET | `/api/collections/<slug>/artworks/` | none | List artworks belonging to this collection |

### Collection object

| Field | Type | Notes |
|---|---|---|
| `id` | int | read-only |
| `unique_id` | uuid | read-only, auto-generated |
| `name` | string | |
| `slug` | string | read-only, derived from `name` |
| `description` | string | |
| `cover_image` | url | |
| `artworks_count` | int | read-only |
| `created_at` / `updated_at` | datetime | read-only |

---

## QR Codes

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/qr-codes/` | none | List all QR codes |
| POST | `/api/qr-codes/` | required | Generate a QR code for an artwork |
| GET | `/api/qr-codes/<unique_id>/` | none | Resolve a scanned QR code — increments `scans_count` and returns the linked artwork |
| DELETE | `/api/qr-codes/<unique_id>/` | required | Delete a QR code |

`<unique_id>` is the QR code's UUID — this is the value encoded into the physical/printed QR image and is what the QR landing page resolves on scan.

### QRCode object

| Field | Type | Notes |
|---|---|---|
| `id` | int | read-only |
| `unique_id` | uuid | read-only, auto-generated |
| `artwork` | string | `Artwork.artwork_id`, write by artwork_id |
| `artwork_detail` | object | read-only, nested artwork |
| `scans_count` | int | read-only, incremented on each `GET` |
| `created_at` | datetime | read-only |

### Example: generate a QR code

```http
POST /api/qr-codes/
Authorization: Bearer <access_token>
Content-Type: application/json

{ "artwork": "ART-2024-001" }
```

---

## Signatures

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/signatures/` | none | List all signatures |
| POST | `/api/signatures/` | required | Create a signature/verification record for an artwork |
| GET | `/api/signatures/<unique_id>/` | none | Retrieve a signature |
| PUT/PATCH | `/api/signatures/<unique_id>/` | required | Update a signature |
| DELETE | `/api/signatures/<unique_id>/` | required | Delete a signature |

### Signature object

| Field | Type | Notes |
|---|---|---|
| `id` | int | read-only |
| `unique_id` | uuid | read-only, auto-generated |
| `artwork` | string | `Artwork.artwork_id`, write by artwork_id (one-to-one) |
| `artwork_detail` | object | read-only, nested artwork |
| `signature_image` | url | |
| `is_verified` | bool | default `true` |
| `verified_at` | datetime | read-only |
