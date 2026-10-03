<img src="https://images.unsplash.com/photo-1664263966666-b5e60f1f315f?w=1760&h=600&fit=crop&q=80&auto=format" alt="" width="100%">

# CORDYCEPS

*Those who never left. A serialized record of altered continuation.*

CORDYCEPS is an epistolary fiction told through one blog in several voices: an archivist keeping the record, two people living inside the change, and a few documents posted by someone other than their writer. Something fungal-adjacent has settled into people's bodies, and the genre expects an apocalypse: spores, outbreaks, things that click in the dark. None of that happens. The change doesn't spread or hunt anyone. It builds workarounds around old damage, reroutes perception toward rooms instead of faces, and leaves the people living with it to handle what's actually hard, which is everyone else deciding how close to stand.

There is no plot summary and no lore page. The world comes through in short posts: logs, notes to self, an unsent draft, answers to questions people keep asking. Read it like a stranger's blog you found and couldn't stop scrolling.

Reads oldest first: start at the top, scroll down to move forward in time.

## About this repo

A plain HTML/CSS/JS site with no build step. All content lives in `posts.json`.

## Files

- `index.html`: page shell
- `style.css`: look and feel (colors are at the top)
- `app.js`: reads `posts.json` and draws the posts
- `posts.json`: every post, in display order

## Site settings

The top of `posts.json` has the site-wide settings:

```json
"site": {
  "title": "CORDYCEPS",
  "definition": { ... },
  "favicon": "https://images.unsplash.com/photo-...",
  "description": "**Those who never left.**\nA serialized record of altered continuation."
}
```

- **title**: the name in the browser tab.
- **definition**: the dictionary-entry header at the top of the page:

  ```json
  "definition": {
    "term": "CORDYCEPS",
    "pronunciation": "/ˈkɔːrdɪsɛps/",
    "senses": [
      { "label": "popular", "text": "the “zombie fungus.”" },
      { "label": "in this story", "text": "something considerably less cooperative with categories.", "highlight": true }
    ]
  }
  ```

  The header renders as a typed index card whose edges line up with the sidebar and feed below. Add `"footer": ["REF. C-03", "THE REMAINED", "REV. 01"]` for the small typed line along the bottom of the card (any number of items, spread evenly). Senses are numbered automatically in order. `"highlight": true` makes a sense's text darker. Text supports `*italic*` and `**bold**`. Delete the whole `"definition"` block to hide the header.
- **favicon**: the browser-tab icon. Paste any Unsplash image link; it gets cropped to a square automatically. Browsers cache favicons hard, so a hard refresh (Cmd+Shift+R) may be needed to see a new one.

Colors and the column widths (`--side-w`, `--feed-w`, `--col-gap`) live at the top of `style.css`. The header card is sized from those three, so it stays aligned if you change them.

## The voices

The blog has several writers, told apart by typeface. A card at the top of the feed introduces them; clicking a voice shows only that speaker's posts.

| speaker id  | name            | font                | who they are |
|-------------|-----------------|---------------------|--------------|
| `archivist` | The Archivist   | Source Serif 4      | Keeps the record. Explains, corrects, logs everything like weather. |
| `navigator` | The Navigator   | IBM Plex Sans       | Perception, rerouted. Rooms before faces. |
| `grower`    | The Grower      | Shantell Sans       | The visible one. Still paying rent. |
| `found`     | Found Documents | Cormorant Garamond  | Words posted by someone other than their writer. |

- **Names and descriptions** on the card: edit `"speakers"` in `posts.json`.
- **Fonts**: edit the `.speaker-…` blocks in `style.css` (each has `--voice-font`, plus size and spacing tweaks), and update the Google Fonts link in `index.html` if you swap in a new font.
- **Adding a speaker**: add an entry under `"speakers"` in `posts.json`, a matching `.speaker-yourid` block in `style.css`, and use `"speaker": "yourid"` on posts.

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
- **speaker**: who wrote it: `archivist`, `navigator`, `grower`, or `found`. Each speaker's posts are set in their own typeface, so readers tell the voices apart by font.
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
