# Copilot instructions

This repo is split into `api/` (Django REST backend) and `ui/` (Next.js 16 + React 19 + Tailwind 4 frontend), both currently early scaffolds. Full guidance lives in [AGENTS.md](../AGENTS.md) — read it for setup commands, module layout, and the planned product surface (`docs/pages.md`, `docs/system-overview.md`, `docs/architecture.md`).

Key points:
- Backend: dependencies for DRF/JWT/Cloudinary are in `api/requirements.txt` but not yet wired into `api/config/settings.py` (`INSTALLED_APPS`, etc.). `accounts` and `core` apps exist but aren't registered yet.
- Frontend: this Next.js version has breaking changes vs. older training data — check `node_modules/next/dist/docs/` before writing Next.js code.
- Every artwork has a unique ID (e.g. `ART-2026-001`) used across the gallery, artwork detail page, QR code, and signature/verification record — this is the central join key for the planned `artworks`, `qr_codes`, and `signatures` modules.
