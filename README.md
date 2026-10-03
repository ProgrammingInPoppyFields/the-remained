<img src="https://images.unsplash.com/photo-1664263966666-b5e60f1f315f?w=1400&h=300&fit=crop&crop=entropy&q=80&auto=format" alt="" width="100%">

# THE REMAINED

A plain HTML/CSS/JS blog. All content lives in `posts.json`. Reads oldest first: top of the page is the beginning, scroll down to move forward in time.

## Files

- `index.html`: page shell
- `style.css`: look and feel (colors are at the top)
- `app.js`: reads `posts.json` and draws the posts
- `posts.json`: every post, in display order

## Site settings

The top of `posts.json` has the site-wide settings:

```json
"site": {
  "title": "THE REMAINED",
  "favicon": "https://images.unsplash.com/photo-...",
  "sidebarImage": "https://images.unsplash.com/photo-...",
  "description": "**Those who never left.**\nA serialized record of altered continuation."
}
```

- **favicon**: the browser-tab icon. Paste any Unsplash image link; it gets cropped to a square automatically. Browsers cache favicons hard, so a hard refresh (Cmd+Shift+R) may be needed to see a new one.
- **sidebarImage**: the photo at the top of the sidebar, cropped to a tall rectangle automatically. Delete the line to hide it.

Colors live at the top of `style.css`.

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

- **Order**: posts show top to bottom in the order they appear in the file, oldest first. New posts go at the **bottom** of the list. Cut and paste to reorder.
- **title**: optional. Leave it out for untitled posts.
- **style**: optional. `"big"` makes the text large and bold.
- **Bold** text inside posts shows as a small uppercase label (like `LOG:`), matching the original theme. In `"big"` posts it stays normal.
- **body**: a list of blocks, shown in order. A block is either text (a string) or an image.
- **Text formatting**:
  - blank line (`\n\n`) = new paragraph
  - single `\n` = line break
  - `*italic*`, `**bold**`
  - start a block with `> ` to make it an indented quote
- **tags**: clicking a tag on the site filters to that tag.

Watch the commas: every post except the last needs a `,` after its closing `}`. If the page goes blank, paste `posts.json` into jsonlint.com to find the typo.

## Images

Images show left-aligned at 400px wide; height follows the image's shape. On phones they shrink to fit. An image block can have:

```json
{ "image": "https://images.unsplash.com/photo-...", "alt": "what it shows", "credit": "Photo by Name on Unsplash" }
```

- **image** (required): a URL or a local path like `images/photo.jpg`.
- **alt**: description for screen readers.
- **credit**: optional caption under the image. Supports `*italic*`.

To change the width everywhere, edit `width: 400px` in `style.css` (and `w=800` in `app.js`, which should stay about double).

## Reading labels

The small "start here", "keep scrollin'" and "caught up" labels are generated in `app.js`. Change `NUDGE_EVERY` to space the mid-feed nudges out, or edit the `nudges` list to change their wording. The sidebar note lives in `index.html`.

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
