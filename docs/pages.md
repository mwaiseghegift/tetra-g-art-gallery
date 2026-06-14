# Platform Pages: Digital Art Portfolio, Authentication & QR-Linked Storytelling Platform

## 1. Public Website Pages

Public pages are accessible to visitors and collectors. They focus on artwork discovery, artist storytelling, and conversion paths such as inquiries or commissions.

### Home Page

The home page introduces the artist and highlights the most important artwork entry points.

* Featured artworks
* Artist introduction preview
* Navigation to gallery and collections

---

### Gallery Page

The gallery page provides the main browsing experience for the artwork catalog.

* Full artwork grid
* Filters by style, year, collection, and medium
* Search bar for artworks

---

### Artwork Detail Page

The artwork detail page displays the complete public record for an individual artwork. It can be opened from the gallery or through a QR code.

Example route: `/artwork/ART-2026-001`

* Full artwork image
* Title, year, and medium
* Story behind the artwork
* Inspiration and meaning
* Artist signature
* Verification badge
* View count and likes

---

### Collections / Series Page

The collections page groups artworks by theme, story, or creative period.

* Grouped artworks by theme or series
* Series introduction and story
* List of artworks in each collection

---

### About the Artist Page

The about page presents the artist's background and creative philosophy.

* Biography
* Artistic journey timeline
* Philosophy and inspiration
* Exhibitions or achievements

---

### Contact Page

The contact page gives visitors direct ways to reach the artist.

* Contact form
* Commission requests
* Email and WhatsApp links
* Social media links

---

### Commissions / Services Page

The commissions page explains available services and how clients can request custom work.

* Commission types
* Pricing guide
* Ordering process
* Request form

---

### Blog / Journal Page

The blog page supports brand storytelling and ongoing audience engagement.

* Artist reflections
* Behind-the-scenes content
* Art process articles
* Updates and exhibitions

---

## 2. Authentication & QR System Pages

Authentication and QR pages connect physical artworks to their verified digital records.

### QR Landing Page

The QR landing page handles artwork redirects after a collector or visitor scans a code.

* Validates artwork ID
* Loads artwork data dynamically
* Redirects to the related artwork detail page

---

### Artwork Verification Page

The verification page confirms whether an artwork record is authentic.

* Unique artwork ID
* Digital signature
* Verified original artwork badge
* Creation timestamp

---

### QR Code Info Page

The QR code info page explains the authentication system to collectors and buyers.

* How QR codes connect to artwork records
* How authenticity verification works
* What collectors should check before purchase

---

## 3. Admin / Artist Dashboard Pages

Admin pages are private and support artwork management, QR generation, verification, analytics, and platform settings.

### Admin Dashboard Home

The dashboard home summarizes platform activity and recent artwork engagement.

* Artwork overview
* Total views and QR scans
* Recent activity

---

### Manage Artworks Page

The manage artworks page supports catalog administration.

* Add new artwork
* Edit existing artwork
* Delete artworks
* Assign categories and collections

---

### Artwork Editor Page

The artwork editor page manages the full content record for each artwork.

* Upload image
* Add story and description
* Set metadata such as year and medium
* Generate QR code
* Assign digital signature

---

### QR Code Generator Page

The QR code generator page creates printable QR assets for artwork records.

* Create QR codes for artworks
* Download QR images for printing
* Link QR codes to artwork ID mappings

---

### Signature Management Page

The signature management page controls artwork signature assets and verification data.

* Upload or create digital signature
* Assign signatures to artworks
* Manage verification system

---

### Analytics Page

The analytics page provides insight into artwork discovery and visitor behavior.

* QR scan tracking
* Most viewed artworks
* Visitor engagement stats
* Location insights

---

### Settings Page

The settings page manages platform-level configuration.

* Profile settings
* Branding such as logo, colors, and fonts
* Security settings
* Domain settings

---

### Login Page

The login page protects dashboard access.

* Secure access to dashboard
* Optional two-factor authentication

---

## 4. System / Utility Pages

System pages support errors, loading states, and redirect flows.

### 404 Page

The 404 page handles missing or invalid routes.

* Friendly error message
* Link back to gallery or home

---

### Loading / Redirect Page

The loading page appears while QR-linked artwork data is being processed.

* Loading status
* Redirect handling
* Error fallback if artwork data cannot be found

---

## 5. Final Structure Summary

### Public Side

* Home
* Gallery
* Artwork detail
* Collections
* About artist
* Contact
* Commissions
* Blog

### Authentication Side

* QR landing
* Verification
* QR code info

### Admin Side

* Dashboard
* Manage artworks
* Artwork editor
* QR generator
* Signature manager
* Analytics
* Settings
* Login

### System Side

* 404
* Loading / redirect
