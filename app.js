/* Site engine. You don't need to edit this file — edit content.js instead. */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const app = $("#app");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- helpers ---------- */
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const toDate = (d) => new Date(String(d) + "T12:00:00");
  const fmt = (d, opts = { day: "numeric", month: "long", year: "numeric" }) =>
    d ? toDate(d).toLocaleDateString(undefined, opts) : "";
  const byDateDesc = (a, b) => toDate(b.date) - toDate(a.date);
  const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;

  const inline = (s) => s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");
  function md(text) {
    return String(text || "")
      .trim()
      .split(/\n\s*\n/)
      .map((raw) => {
        const block = raw.trim();
        const img = block.match(/^!\[(.*?)\]\((.*?)\)$/);
        if (img)
          return `<figure class="inline-photo"><img src="${esc(img[2])}" alt="${esc(img[1])}" loading="lazy"><figcaption>${esc(img[1])}</figcaption></figure>`;
        const b = esc(block);
        if (b.startsWith("## ")) return `<h2>${inline(b.slice(3))}</h2>`;
        if (b.startsWith("&gt; ")) return `<blockquote>${inline(b.slice(5))}</blockquote>`;
        return `<p>${inline(b).replace(/\n/g, "<br>")}</p>`;
      })
      .join("");
  }
  const excerpt = (text, n = 160) => {
    const plain = String(text || "").replace(/!\[.*?\]\(.*?\)/g, "").replace(/[#>*]/g, "").replace(/\s+/g, " ").trim();
    return plain.length > n ? plain.slice(0, n).replace(/\s\S*$/, "") + "…" : plain;
  };

  /* ---------- data ---------- */
  const albums = [...(typeof ALBUMS !== "undefined" ? ALBUMS : [])].sort(byDateDesc);
  const posts = [...(typeof JOURNAL !== "undefined" ? JOURNAL : [])].sort(byDateDesc);
  const site = typeof SITE !== "undefined" ? SITE : {};
  const allPhotos = albums
    .flatMap((a) => (a.photos || []).map((p) => ({ ...p, date: p.date || a.date, album: a })))
    .sort(byDateDesc);

  /* ---------- shared bits ---------- */
  const albumTile = (a, big = false) => `
    <a class="album-tile${big ? " is-big" : ""}" href="#album/${esc(a.id)}">
      <div class="album-cover"><img src="${esc(a.cover || a.photos?.[0]?.src)}" alt="" loading="lazy"></div>
      <h3>${esc(a.title)}</h3>
      <p class="muted">${fmt(a.date, { month: "long", year: "numeric" })}, ${plural(a.photos?.length || 0, "photo")}</p>
    </a>`;

  const postRow = (p) => `
    <a class="post-row" href="#post/${esc(p.id)}">
      <time datetime="${esc(p.date)}">${fmt(p.date, { day: "numeric", month: "short", year: "numeric" })}</time>
      <div>
        <h3>${esc(p.title)}</h3>
        <p class="muted">${esc(excerpt(p.body))}</p>
      </div>
    </a>`;

  const photoButton = (p, i, set) =>
    `<button class="photo" data-set="${set}" data-i="${i}" aria-label="Open photo: ${esc(p.caption || "untitled")}">
       <img src="${esc(p.src)}" alt="${esc(p.caption || "")}" loading="lazy">
     </button>`;

  // Photo sets the lightbox can step through, keyed by name
  const sets = {};

  /* ---------- views ---------- */
  const views = {
    home() {
      const pile = allPhotos.slice(0, 5).reverse();
      const rots = [-7, 5, -3, 8, -1];
      sets.pile = [...pile].reverse();
      return `
      <section class="hero">
        <div class="hero-text">
          <h1>Hi, I’m ${esc(site.name)}.</h1>
          <p class="lede">${esc(site.intro)}</p>
          <div class="hero-actions">
            <a class="btn btn-solid" href="#albums">See the photos</a>
            <a class="btn" href="#journal">Read the journal</a>
          </div>
        </div>
        ${pile.length ? `
        <div class="pile-wrap">
          <div class="pile" id="pile" role="button" tabindex="0" aria-label="Shuffle through recent photos">
            ${pile.map((p, i) => `
              <figure class="print" style="--r:${rots[i % rots.length]}deg">
                <img src="${esc(p.src)}" alt="${esc(p.caption || "")}">
                <figcaption>${esc(p.caption || "")}</figcaption>
              </figure>`).join("")}
          </div>
          <p class="pile-hint muted">Tap the prints to shuffle</p>
        </div>` : ""}
      </section>

      ${albums.length ? `
      <section class="section">
        <div class="section-head">
          <h2>Recent albums</h2>
          <a class="text-link" href="#albums">All albums</a>
        </div>
        <div class="album-grid home-grid">
          ${albums.slice(0, 3).map((a, i) => albumTile(a, i === 0)).join("")}
        </div>
      </section>` : ""}

      ${posts.length ? `
      <section class="section narrow">
        <div class="section-head">
          <h2>From the journal</h2>
          <a class="text-link" href="#journal">All entries</a>
        </div>
        <div class="post-list">${posts.slice(0, 3).map(postRow).join("")}</div>
      </section>` : ""}`;
    },

    albums() {
      return `
      <section class="page-head">
        <h1>Albums</h1>
        <p class="lede">${plural(albums.length, "album")}, ${plural(allPhotos.length, "photo")}, newest first.</p>
      </section>
      <section class="section">
        ${albums.length
          ? `<div class="album-grid">${albums.map((a) => albumTile(a)).join("")}</div>`
          : `<p class="empty">No albums yet. Add one in <code>content.js</code> under <code>ALBUMS</code>.</p>`}
      </section>`;
    },

    album(id) {
      const a = albums.find((x) => x.id === id);
      if (!a) return views.notfound();
      sets.album = (a.photos || []).map((p) => ({ ...p, date: p.date || a.date, album: a }));
      const i = albums.indexOf(a);
      const newer = albums[i - 1], older = albums[i + 1];
      return `
      <article>
        <header class="album-hero">
          <img src="${esc(a.cover || a.photos?.[0]?.src)}" alt="">
          <div class="album-hero-text">
            <p>${fmt(a.date)}${a.location ? `, ${esc(a.location)}` : ""}</p>
            <h1>${esc(a.title)}</h1>
          </div>
        </header>
        ${a.story ? `<div class="prose story">${md(a.story)}</div>` : ""}
        <div class="masonry">${sets.album.map((p, i) => photoButton(p, i, "album")).join("")}</div>
        <nav class="pager" aria-label="More albums">
          ${newer ? `<a href="#album/${esc(newer.id)}"><span class="muted">Newer</span>${esc(newer.title)}</a>` : "<span></span>"}
          ${older ? `<a class="right" href="#album/${esc(older.id)}"><span class="muted">Older</span>${esc(older.title)}</a>` : ""}
        </nav>
      </article>`;
    },

    timeline() {
      const groups = [];
      allPhotos.forEach((p) => {
        const key = String(p.date).slice(0, 7);
        let g = groups.find((x) => x.key === key);
        if (!g) groups.push((g = { key, photos: [] }));
        g.photos.push(p);
      });
      groups.forEach((g, gi) => (sets["tl" + gi] = g.photos));
      return `
      <section class="page-head">
        <h1>Timeline</h1>
        <p class="lede">Every photo, in the order I took it. Newest at the top.</p>
      </section>
      <ol class="timeline">
        ${groups.map((g, gi) => {
          const albumNames = [...new Set(g.photos.map((p) => p.album))];
          return `
          <li class="tl-month">
            <div class="tl-label">
              <h2>${fmt(g.key + "-01", { month: "long" })}</h2>
              <p class="muted">${g.key.slice(0, 4)}</p>
            </div>
            <div class="tl-body">
              <p class="muted tl-sub">${plural(g.photos.length, "photo")} from ${albumNames
                .map((a) => `<a href="#album/${esc(a.id)}">${esc(a.title)}</a>`)
                .join(", ")}</p>
              <div class="tl-strip">${g.photos.map((p, i) => photoButton(p, i, "tl" + gi)).join("")}</div>
            </div>
          </li>`;
        }).join("")}
      </ol>
      ${groups.length ? "" : `<p class="empty">Your timeline fills in as you add photos to albums.</p>`}`;
    },

    journal() {
      return `
      <section class="page-head">
        <h1>Journal</h1>
        <p class="lede">Notes, small stories, and what I’m learning along the way.</p>
      </section>
      <section class="section narrow">
        ${posts.length
          ? `<div class="post-list">${posts.map(postRow).join("")}</div>`
          : `<p class="empty">No entries yet. Write one in <code>content.js</code> under <code>JOURNAL</code>.</p>`}
      </section>`;
    },

    post(id) {
      const p = posts.find((x) => x.id === id);
      if (!p) return views.notfound();
      const i = posts.indexOf(p);
      const newer = posts[i - 1], older = posts[i + 1];
      return `
      <article class="post">
        <header class="post-head">
          <a class="text-link back" href="#journal">Journal</a>
          <h1>${esc(p.title)}</h1>
          <time class="muted" datetime="${esc(p.date)}">${fmt(p.date)}</time>
        </header>
        ${p.cover ? `<img class="post-cover" src="${esc(p.cover)}" alt="">` : ""}
        <div class="prose">${md(p.body)}</div>
        <nav class="pager" aria-label="More entries">
          ${newer ? `<a href="#post/${esc(newer.id)}"><span class="muted">Newer</span>${esc(newer.title)}</a>` : "<span></span>"}
          ${older ? `<a class="right" href="#post/${esc(older.id)}"><span class="muted">Older</span>${esc(older.title)}</a>` : ""}
        </nav>
      </article>`;
    },

    about() {
      const f = site.cameraFund;
      const pct = f ? Math.min(100, Math.round((f.saved / f.goal) * 100)) : 0;
      return `
      <section class="page-head"><h1>About</h1></section>
      <section class="about">
        <div class="prose">${md(site.about)}</div>
        <aside class="about-side">
          ${site.gear?.length ? `
          <div class="side-block">
            <h2>What I shoot with</h2>
            <ul>${site.gear.map((g) => `<li>${esc(g)}</li>`).join("")}</ul>
          </div>` : ""}
          ${f ? `
          <div class="side-block fund">
            <h2>Camera fund</h2>
            <p class="fund-num"><strong>${esc(f.currency)}${f.saved}</strong> <span class="muted">of ${esc(f.currency)}${f.goal}</span></p>
            <div class="bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Camera fund progress"><span style="width:${pct}%"></span></div>
            ${f.note ? `<p class="muted small">${esc(f.note)}</p>` : ""}
          </div>` : ""}
        </aside>
      </section>`;
    },

    notfound() {
      return `<section class="page-head"><h1>Page not found</h1>
        <p class="lede">That link doesn’t match any album or entry. <a href="#home">Go to the homepage</a>.</p></section>`;
    },
  };

  /* ---------- router ---------- */
  function route() {
    const [page = "home", id] = (location.hash.slice(1) || "home").split("/");
    const view = views[page] && !["notfound"].includes(page) ? views[page] : views.notfound;
    app.innerHTML = view(decodeURIComponent(id || ""));
    document.querySelectorAll("[data-nav]").forEach((a) => {
      const active = a.dataset.nav === page || (page === "album" && a.dataset.nav === "albums") || (page === "post" && a.dataset.nav === "journal");
      a.toggleAttribute("aria-current", active);
    });
    const h1 = $("h1", app);
    document.title = page === "home" ? `${site.name}, photography` : `${h1 ? h1.textContent : ""} | ${site.name}`;
    window.scrollTo(0, 0);
    if (page !== "home") app.focus({ preventScroll: true });
    if (page === "home") setupPile();
  }

  /* ---------- print pile ---------- */
  function setupPile() {
    const pile = $("#pile");
    if (!pile) return;
    let busy = false;
    const next = () => {
      const top = pile.lastElementChild;
      if (!top || busy) return;
      if (reduceMotion) return pile.prepend(top);
      busy = true;
      pile.classList.add("settled");
      top.classList.add("leaving");
      top.addEventListener("animationend", () => {
        top.classList.remove("leaving");
        pile.prepend(top);
        busy = false;
      }, { once: true });
    };
    pile.addEventListener("click", next);
    pile.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); next(); }
    });
  }

  /* ---------- lightbox ---------- */
  const lb = $("#lightbox");
  let lbSet = [], lbIndex = 0;
  function showLb() {
    const p = lbSet[lbIndex];
    $("#lbImg").src = p.src;
    $("#lbImg").alt = p.caption || "";
    $("#lbCaption").textContent = p.caption || "";
    $("#lbMeta").innerHTML = `${fmt(p.date)}${p.album ? `, <a href="#album/${esc(p.album.id)}">${esc(p.album.title)}</a>` : ""} <span class="lb-count">${lbIndex + 1} / ${lbSet.length}</span>`;
  }
  const step = (d) => { lbIndex = (lbIndex + d + lbSet.length) % lbSet.length; showLb(); };

  app.addEventListener("click", (e) => {
    const btn = e.target.closest(".photo");
    if (!btn) return;
    lbSet = sets[btn.dataset.set] || [];
    lbIndex = +btn.dataset.i;
    showLb();
    lb.showModal();
  });
  lb.addEventListener("click", (e) => {
    const action = e.target.closest("[data-lb]")?.dataset.lb;
    if (action === "close" || e.target === lb) lb.close();
    if (action === "prev") step(-1);
    if (action === "next") step(1);
    if (e.target.closest(".lb-meta a")) lb.close();
  });
  lb.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
  let touchX = null;
  lb.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    touchX = null;
  });

  /* ---------- theme ---------- */
  const saved = (() => { try { return localStorage.getItem("theme"); } catch { return null; } })();
  if (saved) document.documentElement.dataset.theme = saved;
  $("#themeToggle").addEventListener("click", () => {
    const dark = document.documentElement.dataset.theme
      ? document.documentElement.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = dark ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    try { localStorage.setItem("theme", nextTheme); } catch {}
  });

  /* ---------- header + footer ---------- */
  $("#brand").textContent = site.name || "Photo Journal";
  $("#footer").innerHTML = `
    <p>${esc(site.tagline || "")}</p>
    <p class="footer-links">${(site.links || []).map((l) => `<a href="${esc(l.url)}" rel="noopener">${esc(l.label)}</a>`).join("")}
    <span class="muted">© ${new Date().getFullYear()} ${esc(site.name)}</span></p>`;

  window.addEventListener("hashchange", route);
  route();
})();
