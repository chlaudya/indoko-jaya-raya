# Indoko Jaya Raya — Wireframes v1 (page shells)

**Brand:** APEL Group green–black · B2B agribusiness · desktop-first, fully responsive  
**Locales:** ID (default) · EN · ZH · VI · HI — switcher in header on every page  
**CTA rule:** every primary CTA opens WhatsApp with context (product / page / job). Mode (API vs wa.me) is a config switch — UI stays the same.

---

## Global chrome

### Header (sticky)
`[Logo]` · Nav: Beranda | Tentang Kami | Profil Perusahaan | Produk | Jasa Penjemuran | Karier | Kontak · `[Language switcher ▼]` · `[Hubungi Kami → WA]`

Mobile: logo + hamburger; language + WA stay reachable (top bar or drawer footer).

### Footer
Company short blurb · quick links · address · WA CTA · language links · ©

### Shared patterns
- **Hero:** eyebrow · H1 · short lead · primary WA CTA · optional secondary link
- **Section:** H2 · body · optional media
- **Product card:** image · name · short blurb · category chip · “Tanya via WhatsApp”
- **Job card:** title · location · short blurb · “Lamar via WhatsApp” (± CV form if config = form/both)
- **Empty / draft states:** hide unpublished CMS items; no fake data in UI

---

## Shell 1 — Beranda (Home)

1. Hero — company highlight + primary WA CTA  
2. Keunggulan / trust strip (3–4 points from CMS)  
3. Komoditi unggulan — grid of featured products (CMS)  
4. Jasa Penjemuran teaser → link to service page  
5. Tentang singkat teaser → Tentang Kami  
6. Final CTA band — “Hubungi tim kami” → WA

**CMS hooks:** `home` singleton (hero, trust, featured product refs, CTAs)

---

## Shell 2 — Tentang Kami (narrative)

1. Hero — story title  
2. Sejarah / narasi panjang (portable text)  
3. Visi & Misi blocks  
4. Keunggulan list  
5. Soft CTA → Profil & Data Perusahaan + WA

**CMS hooks:** `aboutPage` singleton (localized narrative fields)

---

## Shell 3 — Profil & Data Perusahaan (factual) — separate from Tentang Kami

1. Hero — official identity (legal name, logo, tagline)  
2. Visi & Misi (short, official)  
3. Legalitas — NIB / akta / NPWP (only public-approved fields)  
4. Struktur organisasi — key management list or org chart image  
5. Lokasi & fasilitas — cards or gallery  
6. Sertifikasi / standar kualitas  
7. Galeri foto fasilitas & aktivitas  
8. WA CTA

**CMS hooks:** `companyProfile` singleton (legal fields, org, facilities, certs, gallery)

---

## Shell 4 — Produk / Komoditi (katalog)

### 4a — Index
1. Hero — catalog intro  
2. Filters: category chips (kacang-kacangan, umbi, jagung, layanan, …)  
3. Optional search (v1 nice-to-have)  
4. Grid of product cards (incl. Jasa Penjemuran as service card → service page)  
5. WA band

### 4b — Detail (`/products/[slug]`)
1. Gallery + title + category  
2. Deskripsi  
3. Spesifikasi table (grade, kemasan, kapasitas suplai, …)  
4. Sticky / bottom CTA “Tanya via WhatsApp” (prefill includes product name)  
5. Related products

**Launch catalog (8):**
1. Kacang Mete  
2. Asam (Kupas)  
3. Kacang Tanah  
4. Kacang Hijau  
5. Ubi Porang  
6. Jagung (Kupas)  
7. Kopi  
8. Jasa Penjemuran Komoditi *(type: service — card links to Shell 5)*

**CMS hooks:** `product` documents · `category` · localized name/desc/specs · `kind: product | service`

---

## Shell 5 — Jasa Penjemuran Komoditi

1. Hero — service name + WA “Konsultasi Jasa Penjemuran”  
2. Deskripsi layanan  
3. Kapasitas & lokasi  
4. Proses / how it works (optional steps)  
5. Galeri  
6. Final WA CTA

**CMS hooks:** prefer one `product`/`service` doc (`kind: service`) so catalog stays single source of truth, plus optional long-form fields for this page.

---

## Shell 6 — Karier

1. Hero  
2. List of active jobs (cards)  
3. Job detail (page or expandable): deskripsi · kualifikasi · lokasi  
4. Apply CTA — driven by config:
   - `wa` → WA prefill with job title  
   - `form` → CV upload form  
   - `both` → WA + form  
5. Closed jobs hidden

**CMS hooks:** `job` documents · site `settings.applyMode`

---

## Shell 7 — Kontak

1. Hero  
2. Alamat + map embed  
3. Contact details (phone/email if any)  
4. Primary WA CTA  
5. Optional short inquiry note (no full contact form required for v1 if WA is primary)

**CMS hooks:** `contactPage` / `settings` (address, map, WA targets)

---

## Site settings (global CMS)

- Default locale, enabled locales  
- WA targets (number / BSP config) — **P0 admin-configurable**  
- Per-CTA message templates (home, product, drying, career, contact)  
- `applyMode`: wa | form | both  
- `waTransport`: api | wame *(client-blocked — UI identical)*  
- SEO defaults + per-page overrides

---

## URL sketch (SEO / i18n)

```
/{locale}/                    → Home
/{locale}/about               → Tentang Kami
/{locale}/company             → Profil & Data Perusahaan
/{locale}/products            → Katalog
/{locale}/products/[slug]     → Detail
/{locale}/services/drying     → Jasa Penjemuran (or products/[slug] if unified)
/{locale}/careers             → Karier
/{locale}/careers/[slug]      → Job detail (optional)
/{locale}/contact             → Kontak
```

ID default may omit prefix or use `/id/...` — Fullstack choice; keep locale in path for ZH/VI/HI fonts & SEO.

---

## Visual tokens (v1)

- Primary: deep green · Accent: black · Surface: off-white / white  
- Typography: clean sans; CJK + Devanagari capable stack for ZH/HI  
- Cards: soft shadow or 1px border · 8/12/16 spacing scale  
- Buttons: solid green primary · outline secondary · WA green for contact CTAs  

*(Exact hex from APEL Group logo when client assets land — placeholders OK in v1.)*

---

## Out of scope for these shells

- WA click tracking  
- Guessing client copy in 5 languages (structure + ID placeholders only)  
- Final photography / official Indoko logo (use APEL Group interim)

---

**Status:** Shells locked for schema freeze. Fullstack can model Sanity 1:1 from CMS hooks above.
