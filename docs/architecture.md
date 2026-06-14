# System Architecture

This project is organized into a backend API and a frontend UI. The backend handles data, business logic, authentication, QR flows, analytics, and media. The frontend presents the public and admin-facing experience using reusable UI modules.

## Backend API

The backend follows a modular Django REST API structure.

```plain
accounts/
apps/
    artworks/
    collections/
    qr_codes/
    analytics/
    signatures/
    // other apps...
config/
core/
```

## Backend Responsibilities

- `accounts/` contains account and authentication-related logic.
- `apps/` contains domain modules such as artworks, collections, QR codes, analytics, and signatures.
- `config/` contains project settings, routing, and application entry points.
- `core/` contains shared models, services, utilities, exceptions, and constants.

## Frontend UI

The frontend is built with Next.js and organized around pages, reusable components, shared utilities, and public assets.

```plain
app/
components/
lib/
public/
```

## Frontend Responsibilities

- `app/` contains routes, layouts, and page-level UI.
- `components/` contains reusable interface components.
- `lib/` contains shared hooks, services, utilities, constants, and types.
- `public/` contains static assets such as images, icons, and exported files.

## Summary

The system should stay modular, reusable, and easy to extend. The backend exposes clear API boundaries, while the frontend consumes those APIs through organized pages, components, and shared utilities.
