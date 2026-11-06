# DESIGN.md

# INDOKO JAYA RAYA — DESIGN SYSTEM

> **Rooted in Indonesia. Connected to the World.**

This file is the visual and UX source of truth for the Indoko Jaya Raya website.

Before creating or modifying any UI, read and follow this file.

Do not introduce visual patterns that conflict with this document.

---

# 1. DESIGN DIRECTION

## Primary References

The design combines:

### EverGreen Agriculture

Use for:

- agricultural visual language
- green brand identity
- product/service presentation
- clean corporate structure
- clear content hierarchy

### Agro Terra

Use for:

- premium modern aesthetic
- large editorial typography
- immersive photography
- strong whitespace
- contemporary compositions
- sophisticated visual hierarchy

### Target Result

The website must feel:

**Premium + Natural + Modern + International + Trustworthy + Agricultural**

It must NOT feel like:

- a generic Indonesian company profile
- a generic agriculture template
- an ecommerce marketplace
- Alibaba/Tokopedia-style ecommerce
- a SaaS dashboard
- a farming blog
- a rustic organic-farm website
- a luxury hotel website

---

# 2. CORE UX PRINCIPLE

This is a **B2B agribusiness discovery and inquiry website**, not a checkout ecommerce website.

Primary user journey:

```text
DISCOVER
   ↓
UNDERSTAND
   ↓
EXPLORE COMMODITIES
   ↓
EVALUATE PRODUCT
   ↓
INQUIRE
   ↓
WHATSAPP
```

The primary conversion is **product inquiry through WhatsApp**.

Every important product/service CTA should provide contextual information to WhatsApp.

Example:

```text
Ask About Cashew Nuts
```

not:

```text
Buy Now
```

---

# 3. BRAND CHARACTER

The interface should communicate:

- Indonesian agricultural origin
- product quality
- reliability
- professional sourcing
- international capability
- long-term business relationships
- modernity
- authenticity

The visual language should be **confident but not aggressive**.

Premium should come from:

- typography
- photography
- spacing
- composition
- consistency
- restraint

Do not use decorative effects to manufacture a premium feeling.

---

# 4. COLOR TOKENS

The logo is two colors: lime `#97f44b` and black. The site uses that pair. Charcoal `#17201b` is the black. There is no second brand green.

Retired, do not reintroduce: forest `#123b2a`, leaf `#2e6b38`, mid green `#3d8443`, sage `#557048`, numeral `#6f8f62`, and the old lime values `#7afa52` / `#c8e6a0`.

```css
--color-lime: #97f44b;       /* logo. Buttons, Why Choose Us, accents on #17201b, rules, focus on dark */
--color-lime-tint: #66c344;  /* button hover only */
--color-lime-wash: #f4f9ef;  /* pale bands (.band-lime). Same ground as --color-mist */
--color-forest: #17201b;     /* dark panels, footer, button text on lime. Alias of charcoal */
--color-charcoal: #17201b;   /* text, headings, links on white */
--color-ivory: #ffffff;      /* page base */
--color-white: #ffffff;
--color-muted: #5a665f;      /* secondary text on white */
--color-mist: #f4f9ef;
--color-hairline: #e3e1d6;
--color-hover-line: #a8b89c;
/* Aliases so old utility names cannot bring a different green back. */
--color-leaf: #17201b;
--color-green: #97f44b;
--color-sage: #17201b;
--color-numeral: #17201b;
```

| Token | Role | Value |
|---|---|---|
| `--color-lime` | Button fill, Why Choose Us, hero accent words, footer labels, icons and focus on dark, nav underline, eyebrow rule | `#97f44b` |
| `--color-lime-tint` | Button hover fill only | `#66c344` |
| `--color-lime-wash` / `--color-mist` | Pale page-header and alternate bands | `#f4f9ef` |
| `--color-forest` / `--color-charcoal` | Ink, dark panels, footer, text on lime | `#17201b` |
| `--color-muted` | Secondary text on white | `#5a665f` |

## Where lime goes

- Primary and WhatsApp buttons: fill `#97f44b`, text and border `#17201b`. Hover fill `#66c344`. Focus ring on the button is `#17201b`.
- Why Choose Us (`.surface-lime`): full `#97f44b` ground. Every text token on it is `#17201b`.
- On `#17201b` (footer, dark bands, hero scrim): labels, accent words, icon strokes, and the focus ring are `#97f44b`.
- On white: section eyebrows (`.label` on `p` / `h2` / `h3` / `h4`) are `#17201b` with a 24×2px `#97f44b` rule. Links stay `#17201b` and take a `#97f44b` underline. Nav current and hover use a `#97f44b` underline, not a green word.

## Where lime does not go

`#97f44b` on white is 1.37:1 (1.28:1 on `#f4f9ef`). It fails text and it fails a 3:1 UI boundary. Do not set lime as text, a small icon, or the only state indicator on white or `#f4f9ef`. The charcoal word carries the contrast. The lime rule is the brand mark beside it.

Never white or grey text on `#97f44b` or `#66c344`.

## Contrast

| Pair | Ratio | Use |
|---|---|---|
| `#17201b` on `#97f44b` | 12.2:1 | Button and Why Choose Us text |
| `#17201b` on `#66c344` | 7.5:1 | Button hover text |
| `#17201b` on `#ffffff` | 16.7:1 | Body, headings, links, labels |
| `#17201b` on `#f4f9ef` | 15.6:1 | Text on pale bands |
| `#ffffff` on `#17201b` | 16.7:1 | Dark panel and footer body |
| `#97f44b` on `#17201b` | 12.2:1 | Accents, footer labels, icons, focus |
| `#5a665f` on `#ffffff` | 6.0:1 | Muted secondary text |

# 5. COLOR RULES

```text
White and pale wash     40%
Charcoal #17201b        30%
Photography             15%
Logo lime #97f44b       10%
Hairline and muted       5%
```

Do not:

- add another green
- paint headings, body, or links `#97f44b` on white
- put white text on lime
- recolor the logo
- lay a green wash over photography

If a new color is required, use an existing token first.

---

# 6. TYPOGRAPHY

## Display Font

Preferred:

```text
Cormorant Garamond
```

Alternative:

```text
DM Serif Display
```

Use for:

- hero headlines
- major editorial headlines
- large statements
- campaign-style messaging

## UI Font

Preferred:

```text
Inter
```

Alternative:

```text
Manrope
```

Use for:

- navigation
- body
- buttons
- labels
- metadata
- product specifications
- forms

Do not introduce additional fonts without a clear reason.

---

# 7. TYPE SCALE

Use responsive typography.

```css
--text-display: clamp(3.5rem, 7vw, 7rem);

--text-h1: clamp(2.5rem, 5vw, 5rem);

--text-h2: clamp(2rem, 4vw, 3.5rem);

--text-h3: clamp(1.35rem, 2vw, 1.75rem);

--text-body-lg: 1.125rem;

--text-body: 1rem;

--text-small: 0.875rem;

--text-label: 0.75rem;
```

Display typography should have tight line-height:

```css
line-height: 0.95 - 1.1;
```

Body:

```css
line-height: 1.6;
```

---

# 8. TYPOGRAPHY RULES

Headlines should be concise.

Prefer:

> Rooted in Indonesia.
> Connected to the World.

Over:

> Welcome to PT Indoko Jaya Raya Official Company Website.

Prefer:

> Indonesian Agriculture. Global Opportunity.

Over:

> We Are a Leading Agricultural Trading Company.

Do not use excessive uppercase headings.

Use uppercase primarily for:

- labels
- categories
- metadata
- navigation accents

---

# 9. LAYOUT

Use an editorial 12-column grid.

## Desktop

```text
max-width: 1440px
horizontal padding: 48px–80px
12 columns
```

## Large Desktop

```text
max-width: 1600px
```

## Tablet

```text
padding: 32px
8 columns
```

## Mobile

```text
padding: 20px
4 columns
```

Content should never feel cramped.

---

# 10. SPACING

Use this spacing scale:

```text
4
8
12
16
24
32
48
64
80
96
120
160
```

Major sections:

```text
desktop: 120px–160px
mobile: 64px–96px
```

Do not randomly create spacing values when an existing token works.

---

# 11. BORDER RADIUS

Use restrained rounding.

Default:

```text
8px
```

Large imagery:

```text
12px
```

Small controls:

```text
6px
```

Avoid excessive pill-shaped interfaces.

Use `999px` only for intentional CTA/button treatments.

---

# 12. PHOTOGRAPHY

Photography is a major part of the design system.

Prioritize real imagery of:

1. Indonesian agricultural landscapes
2. Crops
3. Farmers
4. Harvesting
5. Commodity close-ups
6. Processing
7. Warehouses
8. Facilities
9. Packaging
10. Logistics/export

Photography should feel:

- authentic
- editorial
- cinematic
- natural
- high-quality
- professionally composed

Avoid generic corporate stock photography whenever possible.

---

# 13. IMAGE TREATMENT

Prefer:

- large crops
- full-bleed images
- asymmetric compositions
- natural lighting
- subtle overlays when text requires contrast

Avoid:

- heavy filters
- artificial HDR
- excessive saturation
- green tinting every photograph

Brand green should come primarily from the interface.

---

# 14. HOMEPAGE STRUCTURE

Recommended order:

```text
01 Hero
02 Company Introduction
03 Commodity Showcase
04 Why Partner With Indoko
05 Indonesia → Global Markets
06 Commodity Drying Service
07 Sustainability / Community
08 Company / Facilities
09 Careers
10 Final Inquiry CTA
11 Footer
```

---

# 15. HERO

The hero must communicate the company immediately.

Recommended:

```text
INDOKO JAYA RAYA

Rooted in Indonesia.
Connected to the World.

Short supporting statement.

[Explore Commodities]
[Partner With Us]

Large agricultural image
```

Hero should be:

- spacious
- cinematic
- editorial
- immediately understandable

Do not overcrowd the hero with cards, statistics, badges, or long paragraphs.

---

# 16. NAVIGATION

Desktop:

```text
Company
Commodities
Services
Sustainability
Careers
Contact
```

Right side:

```text
ID | EN | 中文 | VI | HI

Request Inquiry
```

Navigation should remain minimal.

Do not create a mega menu unless the catalog becomes large enough to justify it.

---

# 17. MOBILE NAVIGATION

Mobile header:

```text
Logo
Language
Menu
```

Primary CTA should remain easy to access.

Do not force users to navigate multiple menu levels to reach product inquiries.

---

# 18. COMPANY INTRODUCTION

Use an editorial statement.

Example:

> Local agricultural products, prepared for global markets.

Structure:

```text
Small label
Large statement
Short description
Large supporting image
Optional supporting statistic
```

Avoid large blocks of corporate text.

---

# 19. COMMODITY SHOWCASE

This is a primary homepage section.

Title:

> Our Commodities

Supporting text:

> Selected agricultural commodities sourced from Indonesia for buyers and partners worldwide.

Initial commodities from the project brief:

```text
Cashew Nuts
Tamarind
Peanuts
Mung Beans
Porang
Corn
Coffee
```

Commodity drying is a **service**, not a physical commodity.

---

# 20. COMMODITY CARD

Use editorial product cards.

Structure:

```text
CATEGORY

Large image

PRODUCT NAME

Short metadata

View Commodity →
```

Cards should prioritize:

1. image
2. product name
3. useful metadata
4. CTA

Do not overload cards with specifications.

---

# 21. PRODUCT LISTING

The catalog must support:

- category filtering
- search when useful
- responsive grid
- product image
- product name
- category
- origin
- CTA

Suggested categories:

```text
All
Nuts
Seeds
Grains
Roots
Coffee
Services
```

Categories must be CMS-driven.

Do not hard-code the product count.

---

# 22. PRODUCT DETAIL

Product pages should feel like premium B2B commodity sheets.

Structure:

```text
Breadcrumb

Category

PRODUCT NAME

Short introduction

Large product image

Product Overview

Specifications

Additional Information

Inquiry CTA
```

Specifications may include:

```text
Origin
Product Type
Grade / Quality
Packaging
Supply Capacity
Availability
```

Only display fields that have actual data.

Do not fabricate specifications.

---

# 23. PRODUCT INQUIRY

Primary CTA:

```text
Ask About This Product
```

For a product:

```text
Ask About Cashew Nuts
```

The WhatsApp pre-filled message should contain the product name and relevant context.

Do not use:

```text
Buy Now
Add to Cart
Checkout
```

unless ecommerce functionality is explicitly added later.

---

# 24. WHY PARTNER WITH INDOKO

Use four concise pillars:

```text
01
Local Sourcing

02
Quality Focus

03
Reliable Supply

04
Global Reach
```

Use large numbers and minimal supporting copy.

If company statistics become available, they can be prominently displayed.

Never invent statistics.

---

# 25. INDONESIA → GLOBAL

Create a visual supply-chain narrative:

```text
INDONESIA
↓
SOURCING
↓
PROCESSING
↓
QUALITY
↓
DISTRIBUTION
↓
GLOBAL MARKETS
```

Use photography, diagrams, or geographic visuals only when supported by actual company information.

Do not imply facilities or markets that have not been confirmed.

---

# 26. DRYING SERVICE

Treat commodity drying as a dedicated service.

Structure:

```text
COMMODITY SERVICES

Professional Commodity Drying

Large facility/commodity image

Description

Capacity
Location
Process

[Discuss Your Requirements]
```

Keep the section visually connected to the agricultural supply chain.

---

# 27. SUSTAINABILITY

Use only factual, supportable claims.

Relevant themes from the project brief include:

- local agricultural sourcing
- farmer welfare
- employment
- sustainable growth
- internationalizing Indonesian agricultural products

Do not invent:

- ESG certifications
- carbon-neutral claims
- sustainability metrics
- farmer counts
- environmental achievements

---

# 28. COMPANY PROFILE

Separate narrative storytelling from formal company information.

## Company / About

```text
Our Story
Vision
Mission
Values
Approach
Facilities
```

## Formal Company Profile

```text
Legal Identity
Legal Documents
Management
Organization
Locations
Facilities
Certifications
```

---

# 29. CAREERS

Hero:

> Build the future of Indonesian agriculture.

Job cards:

```text
Position
Location
Employment Type
Short Description
View Position
```

Application can use:

```text
Apply via WhatsApp
```

or a CV form if implemented.

---

# 30. BUTTON SYSTEM

## Primary

```css
background: #97f44b;
color: #17201b;
border: 1px solid #17201b;
```

Hover:

```css
background: #66c344;
color: #17201b;
```

## Secondary

```css
background: transparent;
border: 1px solid #17201b;
color: #17201b;
```

## Dark Background Secondary

```css
background: transparent;
border: 1px solid rgba(255, 255, 255, 0.6);
color: #ffffff;
```

Height:

```text
44px–52px
```

---

# 31. CTA LANGUAGE

Prefer:

```text
Explore Commodities
View Commodity
Request an Inquiry
Ask About This Product
Partner With Us
Discuss Your Requirements
Explore Our Capabilities
```

Avoid generic:

```text
Click Here
Learn More
Submit
Buy Now
```

when a more contextual CTA is possible.

---

# 32. WHATSAPP

WhatsApp is a primary conversion channel.

Relevant CTAs include:

```text
Request an Inquiry
Ask About Cashew Nuts
Discuss Drying Services
Apply for This Position
```

Pre-filled messages must be contextual.

The WhatsApp destination should be configurable through the CMS/admin configuration rather than hard-coded throughout the application.

---

# 33. MULTI-LANGUAGE

Supported languages:

```text
ID
EN
ZH
VI
HI
```

Language switching must be accessible from the global header.

Design must support:

- longer translated strings
- Chinese characters
- Vietnamese diacritics
- Devanagari
- different line lengths

Never use fixed-width text containers that break when translations become longer.

Never hard-code UI text inside components when it belongs to translatable content.

---

# 34. CMS-FIRST DESIGN

The design must support a scalable CMS.

Commodity content should support:

```text
name
slug
category
images
description
specifications
grade
packaging
supply capacity
availability
SEO metadata
translations
```

Career content should support:

```text
position
slug
location
description
requirements
status
application method
translations
```

All repeated content must be data-driven.

Do not create layouts that depend on a fixed number of products.

---

# 35. COMPONENT SYSTEM

Prefer reusable components.

Core components:

```text
Header
MobileNavigation
LanguageSwitcher
Hero
SectionHeading
EditorialSection
ImageTextSection
CommodityCard
CommodityGrid
CommodityFilter
ProductGallery
ProductSpecifications
CTAButton
WhatsAppCTA
StatsSection
ServiceSection
CareerCard
InquirySection
Footer
```

Avoid duplicating similar UI in individual pages.

---

# 36. CARD RULE

Cards should be used selectively.

Preferred:

```text
Large image
Product name
Minimal metadata
Minimal CTA
```

Avoid excessive:

```text
Icon
Title
Paragraph
Button
Badge
Badge
Badge
Shadow
Border
```

The site should feel editorial, not like a SaaS dashboard.

---

# 37. ANIMATION

Animation must be subtle.

Allowed:

- image reveal
- fade
- slide
- hover image zoom
- navigation transitions
- subtle section transitions

Avoid:

- aggressive parallax
- bouncing UI
- excessive scroll animations
- animation on every component
- distracting loaders

Recommended duration:

```text
200ms–600ms
```

Always support:

```css
prefers-reduced-motion
```

---

# 38. RESPONSIVE RULES

## Desktop

Prioritize:

- editorial layouts
- large imagery
- asymmetric composition
- generous whitespace
- multi-column catalog

## Tablet

Reduce:

- typography scale
- column count
- spacing

Maintain the same hierarchy.

## Mobile

Prioritize:

- readability
- touch targets
- vertical storytelling
- simple navigation
- product browsing

Do NOT simply shrink desktop layouts.

Mobile should have intentional composition.

---

# 39. ACCESSIBILITY

Always maintain:

- semantic HTML
- keyboard navigation
- visible focus states
- sufficient color contrast
- accessible forms
- accessible navigation
- meaningful image alt text
- touch targets of at least approximately 44px
- accessible language switching

Never communicate important information using color alone.

---

# 40. PERFORMANCE

Prioritize:

- optimized images
- responsive images
- modern image formats
- lazy loading below the fold
- minimal client-side JavaScript
- server rendering where appropriate
- fast initial page load

Large hero images must be optimized.

Visual quality must not compromise performance.

---

# 41. SEO

Every page should support:

```text
title
meta description
canonical URL
Open Graph image
localized metadata
structured URL
```

Example:

```text
/en/products/cashew-nut
/id/products/kacang-mete
```

SEO should be integrated into the component/data architecture.

---

# 42. DO

- Use forest green as the dominant brand color
- Use warm ivory backgrounds
- Use real agricultural photography
- Use large editorial typography
- Use generous whitespace
- Use asymmetric layouts
- Make commodities visually important
- Make product inquiry obvious
- Keep the interface restrained
- Design for international B2B users
- Keep content CMS-driven
- Keep product architecture scalable
- Preserve strong mobile UX

---

# 43. DO NOT

- Do not use generic green SaaS UI
- Do not use bright neon green
- Do not use excessive gradients
- Do not use excessive shadows
- Do not use excessive rounded cards
- Do not use glassmorphism
- Do not use cartoon agricultural illustrations
- Do not make the site look like a marketplace
- Do not make every section a card grid
- Do not use fake statistics
- Do not invent certifications
- Do not invent sustainability claims
- Do not invent product specifications
- Do not hide product inquiry CTAs
- Do not introduce random colors
- Do not add unnecessary animations
- Do not use unsupported company claims

---

# 44. CONTENT RULE

Do not invent factual company information.

If information is missing:

1. Create the appropriate UI structure.
2. Use a clearly marked placeholder.
3. Do not fabricate values.
4. Ask for or retrieve the real data before presenting it as factual.

This is especially important for:

- legal information
- certifications
- supply capacity
- locations
- management
- statistics
- export destinations
- sustainability claims

---

# 45. DESIGN DECISION PRIORITY

When making a UI decision, prioritize in this order:

```text
1. Usability
2. Brand consistency
3. Product clarity
4. B2B credibility
5. Accessibility
6. Performance
7. Visual sophistication
8. Decorative detail
```

Do not sacrifice usability for visual effects.

---

# 46. FINAL QUALITY CHECK

Before considering a page complete, verify:

### Brand

Does it feel like a premium Indonesian agribusiness company?

### Visual

Does it combine EverGreen's agricultural clarity with Agro Terra's premium modern aesthetic?

### B2B

Would an international buyer consider the interface professional and trustworthy?

### Product

Can users quickly understand what Indoko supplies?

### Conversion

Can users easily inquire about a product or service?

### Scalability

Will the UI still work with 50+ commodities?

### Internationalization

Will the design work correctly across all five languages?

### Responsive

Does the page have intentional mobile composition?

### Accessibility

Can the interface be navigated and understood without relying solely on color or animation?

### Performance

Are images and interactions optimized?

### Content integrity

Are all company claims and product information based on actual data?

If any answer is **no**, revise the implementation before considering the page complete.
