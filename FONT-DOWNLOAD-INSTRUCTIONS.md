# Self-Hosted Fonts - Download Instructions

Your site now uses self-hosted fonts instead of Google Fonts. 
You need to download the font files and place them in a `/fonts/` directory in your repo root.

## Quick Method: Google Webfonts Helper

Go to https://gwfh.mranftl.com/fonts for each font below. 
Select the weights listed, choose "Modern Browsers" (woff2), download the zip, 
and rename the files to match the filenames below.

## Fonts Needed

Create a `/fonts/` folder in your repo root (same level as index.html).

### Poppins (4 files)
- poppins-400.woff2 (Regular)
- poppins-500.woff2 (Medium)
- poppins-600.woff2 (SemiBold)
- poppins-700.woff2 (Bold)

### Red Hat Display (5 files)
- red-hat-display-400.woff2 (Regular)
- red-hat-display-500.woff2 (Medium)
- red-hat-display-600.woff2 (SemiBold)
- red-hat-display-700.woff2 (Bold)
- red-hat-display-800.woff2 (ExtraBold)

### Inter (3 files)
- inter-400.woff2 (Regular)
- inter-500.woff2 (Medium)
- inter-700.woff2 (Bold)

### Playfair Display (3 files)
- playfair-display-400.woff2 (Regular)
- playfair-display-500.woff2 (Medium)
- playfair-display-700.woff2 (Bold)

### Lora (4 files) - used only on index.html and construction-law.html
- lora-500.woff2 (Medium)
- lora-500-italic.woff2 (Medium Italic)
- lora-600.woff2 (SemiBold)
- lora-700.woff2 (Bold)

## Total: 19 font files

## Alternative: Download from Google Fonts directly

1. Go to https://fonts.google.com
2. Search for each font family
3. Click "Get font" then "Download all"
4. The zip contains .ttf files - you'll need to convert them to .woff2
5. Use https://cloudconvert.com/ttf-to-woff2 to convert

## Verify

After placing the files, your directory should look like:
```
/fonts/
  poppins-400.woff2
  poppins-500.woff2
  poppins-600.woff2
  poppins-700.woff2
  red-hat-display-400.woff2
  red-hat-display-500.woff2
  red-hat-display-600.woff2
  red-hat-display-700.woff2
  red-hat-display-800.woff2
  inter-400.woff2
  inter-500.woff2
  inter-700.woff2
  playfair-display-400.woff2
  playfair-display-500.woff2
  playfair-display-700.woff2
  lora-500.woff2
  lora-500-italic.woff2
  lora-600.woff2
  lora-700.woff2
```

The _headers file already includes caching rules for /fonts/* (1 year, immutable).
