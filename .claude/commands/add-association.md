Add a new **association** to the branded landing page system. Do every step below without asking -- just execute.

Association name: $ARGUMENTS

The user will provide three things in their message:
1. The association name (as the argument above)
2. The logo image (drag-and-drop file)
3. The brand color (hex value)

If any of these are missing, ask for the missing item(s) and stop.

Optionally, the user may also provide:
4. Partner note text (a quote/endorsement from the association)
5. Partner name (the person providing the note)
6. Partner title (their role/title)
7. Partner photo (drag-and-drop file)

If the optional partner fields are not provided, omit them from the registry entry. The MoreInfoPage will use placeholder content.

## Step 1: Parse and slug

Extract the association name from the argument above. If blank, stop and ask for it.

Generate the slug: lowercase, spaces to hyphens, strip anything that isn't a letter, number, or hyphen.
Example: "Georgia School Safety Alliance" → `georgia-school-safety-alliance`

## Step 2: Check for duplicates

Read `src/config/schools.ts`. If this slug already exists in the array, stop and tell the user.

## Step 3: Handle the logo

The user must attach/drag-and-drop the logo image.

1. Copy the provided image file to `public/logos/{slug}.png` using `cp`.
2. **Ensure transparent background**: The logo MUST have a transparent background. Do NOT add any background color (dark, white, or otherwise). If the source image has a solid background, use ImageMagick or similar to remove it before saving. Verify transparency is preserved.
3. Verify the file landed: `ls -la public/logos/{slug}.png`

## Step 3.5: Handle partner photo (if provided)

If a partner photo was provided:
1. Create `public/partner-photos/` directory if it doesn't exist.
2. Copy the image to `public/partner-photos/{slug}.jpg` using `cp`.
3. Verify: `ls -la public/partner-photos/{slug}.jpg`

## Step 4: Add to registry

Use the brand color hex provided by the user.

Edit `src/config/schools.ts`. Insert a new entry at the end of the `schools` array (before the closing `];`):

```
  {
    slug: "{slug}",
    name: "{Full Association Name}",
    type: "association",
    logoSrc: "/logos/{slug}.png",
    brandColor: "{hex}",
    partnerNote: "{partnerNote}",              // include only if provided
    partnerName: "{partnerName}",              // include only if provided
    partnerTitle: "{partnerTitle}",            // include only if provided
    partnerPhotoSrc: "/partner-photos/{slug}.jpg",  // include only if photo provided
  },
```

Only include `partnerNote`, `partnerName`, `partnerTitle`, and `partnerPhotoSrc` fields if the user provided values. Omit any that were not provided.

## Step 5: Generate QR code

Run: `npm run qr`

Verify: `ls -la public/qr-codes/{slug}.png`

## Step 6: Start dev server and report

Start the dev server in the background if it isn't already running:

```
lsof -i :5173 >/dev/null 2>&1 || npm run dev &
```

Wait a couple seconds for it to be ready, then print the summary:

```
Added: {Full Association Name} (association)
Slug: {slug}
Logo: public/logos/{slug}.png
Brand color: {hex}
QR code: public/qr-codes/{slug}.png

Preview: http://localhost:5173/s/{slug}
```
