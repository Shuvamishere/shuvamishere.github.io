# My photo journal

A personal photography portfolio with albums, a photo timeline, a journal, and an About page with a camera-fund tracker. Plain HTML, CSS and JavaScript: no build step, no installs.

## Put it online with GitHub Pages

1. Create a GitHub account if you don't have one.
2. Create a new **public** repository named `yourusername.github.io` (use your real GitHub username).
3. Click **Add file → Upload files**, drag in everything from this folder (including the `photos` folder and the hidden `.nojekyll` file), and click **Commit changes**.
4. Go to **Settings → Pages**. Under "Build and deployment", choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
5. After a minute or two your site is live at `https://yourusername.github.io`.

(If you name the repo something else, like `photos`, the address becomes `https://yourusername.github.io/photos`.)

## Make it yours

Everything you write lives in **`content.js`**. You never need to touch the other files.

- **Your name and intro:** edit the `SITE` section at the top.
- **Add an album:** copy one of the album blocks in `ALBUMS`, give it a new `id` (no spaces), title, date, story, and list of photos.
- **Add a photo:** upload it into `photos/your-album/` and add a line like
  `{ src: "photos/your-album/04.jpg", caption: "What this photo means to me", date: "2026-11-05" },`
- **Write a journal entry:** copy a block in `JOURNAL`. Blank lines make paragraphs. You can use `**bold**`, `*italic*`, `## Subheading`, `> quote`, and `![caption](photos/file.jpg)` for a photo.
- **Camera fund:** update `saved` whenever you add to it. Set `cameraFund: null` to hide it.

Albums, the timeline and the journal all sort themselves by date, newest first.

You can edit `content.js` right on github.com (open the file, click the pencil icon, then **Commit changes**).

## Photo tips

- iPhone photos are usually HEIC, which browsers don't all show. Export as JPG, or set **Settings → Camera → Formats → Most Compatible**.
- Resize to about 2000px on the long edge before uploading so pages load fast. Free tools: squoosh.app or your phone's export size option.
- Keep file names simple: lowercase, no spaces (`sunset-01.jpg`).

## Restyle

Colors and fonts are at the top of `style.css` (`--bg`, `--ink`, `--accent`, and the two font families). Light and dark mode both follow those values.
