// Loads posts.json and renders the blog.
// Posts appear in the same order as in the JSON file.

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Tiny formatter: **bold**, *italic*, blank line = new paragraph, single newline = line break.
function formatParagraphs(str) {
  return str
    .split(/\n{2,}/)
    .map(p => {
      let html = escapeHtml(p)
        .replace(/\*\*([\s\S]+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([\s\S]+?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');
      return `<p>${html}</p>`;
    })
    .join('');
}

// Unsplash image links (images.unsplash.com/...) get resized on Unsplash's side,
// so the page loads a 600px-tall version (sharp at 300px on retina screens).
function imageUrl(src) {
  try {
    const url = new URL(src);
    if (url.hostname === 'images.unsplash.com') {
      url.searchParams.delete('w');
      url.searchParams.set('h', '600');
      url.searchParams.set('q', '80');
      url.searchParams.set('auto', 'format');
      url.searchParams.set('fit', 'max');
      return url.toString();
    }
  } catch (e) { /* relative path like images/foo.jpg: use as-is */ }
  return src;
}

// A text block starting with "> " becomes an indented quote.
function renderBlock(block) {
  if (typeof block === 'string') {
    if (block.startsWith('> ')) {
      return `<blockquote class="text">${formatParagraphs(block.slice(2))}</blockquote>`;
    }
    return `<div class="text">${formatParagraphs(block)}</div>`;
  }
  if (block && block.image) {
    const alt = escapeHtml(block.alt || '');
    const cls = 'post-image';
    const credit = block.credit
      ? `<figcaption>${formatParagraphs(block.credit).replace(/<\/?p>/g, '')}</figcaption>`
      : '';
    return `<figure class="${cls}"><img src="${escapeHtml(imageUrl(block.image))}" alt="${alt}" loading="lazy">${credit}</figure>`;
  }
  return '';
}

function renderPost(post) {
  const title = post.title ? `<h1 class="post-title">${escapeHtml(post.title)}</h1>` : '';
  const body = (post.body || []).map(renderBlock).join('');
  const tags = (post.tags || [])
    .map(t => `<a href="#tag/${encodeURIComponent(t)}">${escapeHtml(t)}</a>`)
    .join('');
  return `
    <div class="entry">
      <article class="post ${post.style === 'big' ? 'big' : ''}">
        ${title}
        <div class="post-body">${body}</div>
      </article>
      ${tags ? `<div class="tags">${tags}</div>` : ''}
    </div>`;
}

let DATA = null;

function render() {
  const match = location.hash.match(/^#tag\/(.+)$/);
  const tag = match ? decodeURIComponent(match[1]) : null;
  const posts = tag ? DATA.posts.filter(p => (p.tags || []).includes(tag)) : DATA.posts;

  const filter = document.getElementById('filter');
  if (tag) {
    filter.hidden = false;
    filter.innerHTML = `tagged: <strong>${escapeHtml(tag)}</strong> (${posts.length}) &nbsp;/&nbsp; <a href="#">show all</a>`;
  } else {
    filter.hidden = true;
  }

  document.getElementById('posts').innerHTML = posts.map(renderPost).join('');
  window.scrollTo(0, 0);
}

fetch('posts.json')
  .then(r => r.json())
  .then(data => {
    DATA = data;
    const site = data.site || {};
    if (site.title) {
      document.title = site.title;
      document.getElementById('site-title').textContent = site.title;
    }
    if (site.description) {
      document.getElementById('site-description').innerHTML = formatParagraphs(site.description);
    }
    render();
    window.addEventListener('hashchange', render);
  })
  .catch(err => {
    document.getElementById('posts').innerHTML =
      '<p>Could not load posts.json. If you opened index.html directly from your computer, run a local server instead (see README).</p>';
    console.error(err);
  });
