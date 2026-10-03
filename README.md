# THE REMAINED

A plain HTML/CSS/JS blog. All content lives in `posts.json`.

## Files

- `index.html`: page shell
- `style.css`: look and feel (colors are at the top)
- `app.js`: reads `posts.json` and draws the posts
- `posts.json`: every post, in display order

## Editing posts

Each post looks like this:

```json
{
  "title": "optional title",
  "style": "big",
  "body": [
    "first paragraph\nline two\n\nnew paragraph",
    { "image": "images/photo.jpg", "alt": "what the image shows" },
    "> an indented quote block"
  ],
  "tags": ["still", "notes"]
}
```

- **Order**: posts show top to bottom in the order they appear in the file. Cut and paste to reorder.
- **title**: optional. Leave it out for untitled posts.
- **style**: optional. `"big"` makes the text large and bold.
- **body**: a list of blocks, shown in order. A block is either text (a string) or an image.
- **Text formatting**:
  - blank line (`\n\n`) = new paragraph
  - single `\n` = line break
  - `*italic*`, `**bold**`
  - start a block with `> ` to make it an indented quote
- **tags**: clicking a tag on the site filters to that tag.

Watch the commas: every post except the last needs a `,` after its closing `}`. If the page goes blank, paste `posts.json` into jsonlint.com to find the typo.

## Images

Images show centered at 300px tall; width follows the image's shape. Very wide images get trimmed at the sides so they never overflow the card. An image block can have:

```json
{ "image": "https://images.unsplash.com/photo-...", "alt": "what it shows", "credit": "Photo by Name on Unsplash" }
```

- **image** (required): a URL or a local path like `images/photo.jpg`.
- **alt**: description for screen readers.
- **credit**: optional caption under the image. Supports `*italic*`.

To change the height everywhere, edit `height: 300px` in `style.css` (and `h=600` in `app.js`, which should stay about double).

**Getting the right Unsplash link:** the photo's page URL (`unsplash.com/photos/...`) won't work, because it's a web page, not an image. On the photo page, right-click the photo and choose **Copy Image Address**. You want a link starting with `https://images.unsplash.com/photo-`. Paste it in as-is; the page resizes it automatically, so long query strings on the end don't matter.

The 8 imported image posts currently use the same placeholder photo. Swap in the real Unsplash links when you find them.

## Preview locally

Opening `index.html` by double-clicking won't load the JSON (browser security). From this folder, run:

```
python3 -m http.server
```

then open http://localhost:8000.

## Publish on GitHub Pages

1. Create a repo and push these files to the `main` branch.
2. Repo **Settings > Pages**, source: **Deploy from a branch**, branch `main`, folder `/ (root)`.
3. The site appears at `https://<username>.github.io/<repo>/` within a minute or two.
