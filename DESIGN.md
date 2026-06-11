# VIKON CONSTRUCTIONS: Design System Manual

## 1. Overview & Creative North Star
The architectural world is defined by the intersection of precision and vision. For VIKON CONSTRUCTIONS, we move beyond the generic "builder" aesthetic into a realm of **"Architectural Editorial."** Our Creative North Star is **The Precision Curator**. 

This design system rejects the cluttered, grid-locked patterns of standard construction sites. Instead, it utilizes intentional white space, sophisticated tonal layering, and high-contrast typography to mirror the premium quality of high-end residential and commercial developments in Rayalam Rural. The interface should feel like a high-end architectural monograph—clean, authoritative, and structurally sound. We break the template by using overlapping elements (representing construction layers) and an asymmetric balance that guides the eye with intent.

---

## 2. Colors
Our palette is rooted in the "Professional Blue" of structural integrity and the "Vibrant Green" of sustainable, modern growth.

### Core Palette
- **Primary (`#003575`):** Deep Navy. Use for authority and foundational elements.
- **Secondary (`#006d38`):** Vibrant Green. Reserved for growth, sustainability accents, and key conversion points.
- **Tertiary (`#34373a`):** Slate Charcoal. Used for sophisticated technical details and high-end text contrast.

### The "No-Line" Rule
To maintain a premium, editorial feel, **1px solid borders for sectioning are strictly prohibited.** Boundaries must be defined through:
- **Background Shifts:** Moving from `surface` (`#f8fafb`) to `surface-container-low` (`#f2f4f5`).
- **Tonal Transitions:** Using subtle shifts in the surface hierarchy to define edge logic.

### Surface Hierarchy & Nesting
Treat the UI as a physical site plan. Layering is your primary tool:
- **Base:** `surface` (`#f8fafb`)
- **Nesting:** Place `surface-container-lowest` (`#ffffff`) cards on a `surface-container-low` background to create a "lifted paper" effect.
- **Interaction:** Use `surface-bright` for hover states to mimic light reflecting off clean materials.

### The "Glass & Gradient" Rule
For floating navigation or hero overlays, utilize **Glassmorphism**:
- Use `surface` at 80% opacity with a `20px` backdrop-blur. 
- **Signature Textures:** Apply subtle linear gradients from `primary` (`#003575`) to `primary_container` (`#004ba0`) at a 135-degree angle for hero buttons to add depth and "soul" to the professional blue.

---

## 3. Typography
We use a dual-font strategy to balance technical precision with modern approachability.

*   **Display & Headlines (Manrope):** A geometric sans-serif that feels engineered yet modern.
    *   **`display-lg` (3.5rem):** Use for hero statements. Tight letter-spacing (-0.02em).
    *   **`headline-md` (1.75rem):** For section headers. Authoritative and grounded.
*   **Body & Labels (Inter):** High-legibility sans-serif for technical data and descriptions.
    *   **`body-lg` (1rem):** Standard reading text. Increased line-height (1.6) for an editorial feel.
    *   **`label-md` (0.75rem):** Used for "Metadata" (e.g., project dimensions, location coordinates). Always uppercase with +0.05em tracking.

---

## 4. Elevation & Depth
In this system, depth is a result of structural stacking, not artificial shadows.

*   **The Layering Principle:** Avoid elevation shadows where possible. Achieve hierarchy by stacking `surface-container` tiers. A `surface-container-highest` element feels closer to the user than a `surface-dim` element.
*   **Ambient Shadows:** If an element must "float" (like a Modal), use an ultra-diffused shadow: `0px 20px 40px rgba(25, 28, 29, 0.06)`. This mimics soft, natural ambient light hitting a large surface.
*   **The "Ghost Border" Fallback:** If a container requires definition against a similar background, use `outline-variant` (`#c3c6d4`) at **15% opacity**. Never use 100% opaque lines.
*   **Precision Accents:** Use the vibrant green (`secondary`) as a 2px "indicator line" on the left side of active cards to denote "Construction Progress" or active selection.

---

## 5. Components

### Buttons
*   **Primary:** `primary` background with `on_primary` text. `DEFAULT` (0.25rem) corner radius. Use the signature gradient (Primary to Primary-Container) on hover.
*   **Secondary:** `secondary_container` background with `on_secondary_container` text. This is your "Sustainable Choice" or "Contact Us" button.
*   **Tertiary:** Ghost style. No background, `primary` text. Underline only on hover.

### Cards & Lists
*   **The Divider Ban:** Strictly forbid `hr` tags or divider lines. Use `48px` or `64px` vertical spacing blocks or a `surface-container` color shift to separate content blocks.
*   **Project Cards:** Use `surface-container-lowest` with a "Ghost Border." The image should have a subtle 0.25rem radius.

### Input Fields
*   **Styling:** Filled style using `surface-container-high`. No bottom line.
*   **States:** On focus, the background shifts to `surface-container-highest` with a 2px `primary` bottom indicator.

### Custom Component: The "Specification Chip"
*   For construction details (sq. ft, material type). Small, `surface-variant` background, `label-sm` Inter typography. Feels like a technical tag on a blueprint.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical layouts where text blocks are slightly offset from image edges to create a "custom-built" feel.
*   **Do** prioritize `Manrope` for all numbers and measurements to emphasize the "precision" of VIKON.
*   **Do** use the vibrant green sparingly—it is a "signal" color for growth and action.

### Don't
*   **Don't** use "Drop Shadows" that are dark or sharp. It breaks the high-end architectural feel.
*   **Don't** use standard "Construction Yellow." We are a premium builder; we stick to our Professional Blue and Vibrant Green.
*   **Don't** crowd the layout. If a section feels full, add another 32px of vertical padding. Luxury is defined by the space you don't use.
*   **Don't** use fully rounded (pill) buttons. Stick to the `DEFAULT` (0.25rem) or `md` (0.375rem) radius to maintain the "Clean Lines" requested.
