// ─── STATE ───────────────────────────────────────
let currentFilter = 'all';
let currentSort   = 'default';
let searchTerm    = '';

// ─── BOOT ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    renderGrid();
    updateStats();
    initMood();
    initParallax();
    document.getElementById('searchInput').addEventListener('input', e => {
        searchTerm = e.target.value.toLowerCase().trim();
        renderGrid();
    });
    initProgressBar();
});

// ─── MOOD CHIP ────────────────────────────────────
function initMood() {
    const moods = [
        'New reviews up', 'Fresh picks in', 'Good typing weather',
        'Updated guides', 'Clicky vibes only', '3 new reviews'
    ];
    const el = document.getElementById('moodText');
    if (el) el.textContent = moods[Math.floor(Math.random() * moods.length)];
}

// ─── HERO PARALLAX ────────────────────────────────
function initParallax() {
    const dots = document.getElementById('heroDots');
    if (!dots) return;
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        dots.style.transform = `translateY(${y * 0.25}px)`;
    }, { passive: true });
}

// ─── PROGRESS BAR ────────────────────────────────
function initProgressBar() {
    const bar = document.getElementById('readProgress');
    window.addEventListener('scroll', () => {
        const isArticle = document.getElementById('articleView').classList.contains('active');
        if (!isArticle) { bar.classList.remove('active'); bar.style.width = '0%'; return; }
        bar.classList.add('active');
        const scrolled = window.scrollY;
        const total = document.body.scrollHeight - window.innerHeight;
        bar.style.width = total > 0 ? Math.min((scrolled / total) * 100, 100) + '%' : '0%';
        highlightTOC();
    });
}

// ─── SCROLL-AWARE TOC ────────────────────────────
function highlightTOC() {
    const links = document.querySelectorAll('.toc-link');
    let current = '';
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        const id = href.replace('#','');
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 140) current = id;
    });
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        link.classList.toggle('active', href === '#' + current);
    });
}

// ─── GRID ────────────────────────────────────────
function renderGrid() {
    let list = articles;
    if (currentFilter !== 'all') list = list.filter(a => a.type === currentFilter);
    if (searchTerm) list = list.filter(a =>
        a.title.toLowerCase().includes(searchTerm) ||
        a.excerpt.toLowerCase().includes(searchTerm)
    );
    if (currentSort === 'rating') list = [...list].sort((a, b) => (b.rating||0) - (a.rating||0));

    document.getElementById('articleCountLabel').textContent = `${list.length} article${list.length !== 1 ? 's' : ''}`;

    const grid = document.getElementById('contentGrid');
    grid.innerHTML = list.length === 0
        ? '<p style="grid-column:1/-1;padding:3rem;text-align:center;color:var(--text-lite)">No articles found.</p>'
        : list.map((a, i) => {
            const size = i === 0 ? 'wide' : i === 2 ? 'tall' : i > 0 && i % 7 === 0 ? 'wide' : '';
            return cardHTML(a, size, i);
        }).join('');
}

function cardHTML(a, size = '', index = 0) {
    const isReview = a.type === 'review';
    const readMins = isReview ? Math.ceil(Math.random() * 4 + 5) : Math.ceil(Math.random() * 2 + 2);
    const delay = Math.min(index * 60, 400);
    return `
    <div class="card ${size}" onclick="openArticle('${a.id}')" style="animation-delay:${delay}ms">
        <div class="card-img">
            <img src="${a.image}" alt="${a.title}" loading="lazy">
            <div class="card-badges">
                <span class="badge ${isReview ? 'badge-review' : 'badge-guide'}">${isReview ? 'Review' : 'Guide'}</span>
                ${a.hot ? '<span class="badge badge-hot">🔥 Hot</span>' : ''}
            </div>
            ${a.rating ? `<div class="card-rating-chip">★ ${a.rating}</div>` : ''}
        </div>
        <div class="card-body">
            <div class="card-meta">
                ${a.date}${a.price ? ' · ' + a.price : ''}
                <span class="read-time">☕ ${readMins} min</span>
            </div>
            <div class="card-title">${a.title}</div>
            ${size !== '' ? `<div class="card-excerpt">${a.excerpt}</div>` : ''}
            <div class="card-footer">
                <span class="card-tag">${a.category || (isReview ? 'Review' : 'Guide')}</span>
                <span class="card-link">Read →</span>
            </div>
        </div>
    </div>`;
}

// ─── ARTICLE ─────────────────────────────────────
function openArticle(id) {
    const a = articles.find(x => x.id === id);
    if (!a) return;
    a.views = (a.views || 0) + 1;
    const html = a.type === 'review' ? reviewHTML(a) : guideHTML(a);
    document.getElementById('articleContent').innerHTML = html;
    buildTOC(a);
    document.getElementById('homeView').classList.add('hidden');
    document.getElementById('articleView').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── TABLE OF CONTENTS ────────────────────────────
function buildTOC(a) {
    const sections = [];
    if (a.type === 'review') {
        sections.push({ id: 'overview', label: 'Overview' });
        if (a.specs)     sections.push({ id: 'specs', label: 'Specifications' });
        if (a.fullReview) a.fullReview.forEach((s, i) => sections.push({ id: `section-${i}`, label: s.heading }));
        if (a.pros)      sections.push({ id: 'procons', label: 'Pros & Cons' });
        sections.push({ id: 'verdict', label: 'Verdict' });
    } else {
        sections.push({ id: 'overview', label: 'Overview' });
        sections.push({ id: 'picks', label: 'Top Picks' });
        sections.push({ id: 'verdict', label: 'Final Thoughts' });
    }
    document.getElementById('tocLinks').innerHTML = sections.map((s, i) => `
        <a class="toc-link" href="#${s.id}" onclick="scrollToSection('${s.id}'); return false;">${s.label}</a>
        ${i === 0 ? '<div class="toc-sep"></div>' : ''}
    `).join('');
}

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── REVIEW HTML ─────────────────────────────────
function reviewHTML(a) {
    const subScores = a.subScores || {};
    return `
    <div class="article-card">
        <div class="article-label" id="overview">${a.category || 'Review'}</div>
        <h1 class="article-title">${a.title}</h1>
        <div class="article-byline">
            <span>📅 ${a.date}</span>
            ${a.price ? `<span>💰 ${a.price}</span>` : ''}
            <span>👁 ${a.views || 1} views</span>
        </div>

        ${a.images && a.images.length ? `<div class="img-gallery">${a.images.map(img=>`<img src="${img}" alt="${a.title}" loading="lazy">`).join('')}</div>` : ''}

        ${a.rating ? `
        <div class="score-row">
            <div class="score-overall">
                <div class="big">${a.rating}</div>
                <div class="lbl">Overall</div>
            </div>
            ${Object.keys(subScores).length ? `
            <div class="sub-scores">
                <div class="sub-scores-title">Score Breakdown</div>
                ${Object.entries(subScores).map(([k,v]) => `
                <div class="sub-score-row">
                    <div class="sub-score-label">${k}</div>
                    <div class="sub-score-bar"><div class="sub-score-fill" style="width:${v*10}%"></div></div>
                    <div class="sub-score-num">${v}</div>
                </div>`).join('')}
            </div>` : ''}
        </div>` : ''}

        ${a.useCases ? `
        <div class="use-cases">
            ${a.useCases.map(u => `
            <div class="use-case">
                <span class="uc-icon">${u.icon}</span>
                <span class="uc-label">${u.label}</span>
                <div class="uc-stars">${'★'.repeat(u.stars)}<span class="dim">${'★'.repeat(5-u.stars)}</span></div>
            </div>`).join('')}
        </div>` : ''}

        ${a.summary ? `<div class="summary-box"><strong>Quick Take:</strong> ${a.summary}</div>` : ''}

        <div class="amazon-cta">
            <h3>Buy the ${a.title.replace(' Review','')}</h3>
            <p>${a.price ? `Current price: ${a.price} · ` : ''}Check latest deals on Amazon</p>
            <a href="${a.amazonLink}" class="amazon-btn" target="_blank" rel="nofollow noopener">View on Amazon →</a>
        </div>

        ${a.specs ? `
        <div class="art-section" id="specs">
            <h2>Specifications</h2>
            <div class="specs-grid">
                ${Object.entries(a.specs).map(([k,v]) => `
                <div class="spec-card">
                    <div class="spec-lbl">${k}</div>
                    <div class="spec-val">${v}</div>
                </div>`).join('')}
            </div>
        </div>` : ''}

        ${a.fullReview ? a.fullReview.map((s, i) => `
        <div class="art-section" id="section-${i}">
            <h2>${s.heading}</h2>
            ${s.paragraphs.map(p => `<p>${p}</p>`).join('')}
            ${s.image ? `<img src="${s.image}" alt="${s.heading}">` : ''}
        </div>`).join('') : ''}

        ${a.pros || a.cons ? `
        <div class="art-section" id="procons">
            <h2>Pros & Cons</h2>
            <div class="pros-cons">
                ${a.pros ? `<div class="pros-card"><h3>What's Great</h3><ul>${a.pros.map(p=>`<li>${p}</li>`).join('')}</ul></div>` : ''}
                ${a.cons ? `<div class="cons-card"><h3>Watch Out For</h3><ul>${a.cons.map(c=>`<li>${c}</li>`).join('')}</ul></div>` : ''}
            </div>
        </div>` : ''}

        ${a.verdict ? `
        <div class="art-section" id="verdict">
            <h2>Verdict</h2>
            <div class="verdict-box">
                <h3>Our Take</h3>
                <p>${a.verdict}</p>
                ${a.bestFor ? `<div class="best-for"><strong>Best For:</strong> ${a.bestFor}</div>` : ''}
            </div>
        </div>` : ''}

        <div class="amazon-cta">
            <h3>Ready to Buy?</h3>
            <p>Get the best price on Amazon</p>
            <a href="${a.amazonLink}" class="amazon-btn" target="_blank" rel="nofollow noopener">View on Amazon →</a>
        </div>

        ${a.relatedArticles && a.relatedArticles.length ? `
        <div class="art-section">
            <h2>Related Articles</h2>
            <div class="related-grid">
                ${a.relatedArticles.map(id => {
                    const r = articles.find(x => x.id === id);
                    return r ? `
                    <div class="related-card" onclick="openArticle('${r.id}')">
                        <img src="${r.image}" alt="${r.title}" loading="lazy">
                        <div class="related-card-body"><h4>${r.title}</h4></div>
                    </div>` : '';
                }).join('')}
            </div>
        </div>` : ''}
    </div>`;
}

// ─── GUIDE HTML ──────────────────────────────────
function guideHTML(a) {
    return `
    <div class="article-card">
        <div class="article-label" id="overview">Buying Guide</div>
        <h1 class="article-title">${a.title}</h1>
        <div class="article-byline">
            <span>📅 ${a.date}</span>
            <span>👁 ${a.views || 1} views</span>
        </div>

        ${a.intro ? `<div class="summary-box">${a.intro}</div>` : ''}

        <div id="picks">
        ${a.recommendations ? a.recommendations.map((r, i) => `
        <div class="rec-item">
            <div class="rec-top">
                <div class="rec-name">${i + 1}. ${r.name}${r.tag ? `<span>${r.tag}</span>` : ''}</div>
                ${r.price ? `<div class="rec-price">${r.price}</div>` : ''}
            </div>
            <div class="rec-desc">${r.description}</div>
            ${r.highlights ? `<div class="rec-highlights">${r.highlights.map(h=>`<span class="rec-highlight">✓ ${h}</span>`).join('')}</div>` : ''}
            <div class="rec-btns">
                ${r.reviewLink ? `<a href="#" class="btn-sm btn-ghost" onclick="openArticle('${r.reviewLink}'); return false;">Full Review</a>` : ''}
                <a href="${r.amazonLink}" class="btn-sm btn-primary" target="_blank" rel="nofollow noopener">View on Amazon →</a>
            </div>
        </div>`).join('') : ''}
        </div>

        ${a.verdict ? `
        <div class="verdict-box" id="verdict">
            <h3>Our Final Recommendation</h3>
            <p>${a.verdict}</p>
        </div>` : ''}

        ${a.relatedArticles && a.relatedArticles.length ? `
        <div class="art-section">
            <h2>Related Reviews</h2>
            <div class="related-grid">
                ${a.relatedArticles.map(id => {
                    const r = articles.find(x => x.id === id);
                    return r ? `
                    <div class="related-card" onclick="openArticle('${r.id}')">
                        <img src="${r.image}" alt="${r.title}" loading="lazy">
                        <div class="related-card-body"><h4>${r.title}</h4></div>
                    </div>` : '';
                }).join('')}
            </div>
        </div>` : ''}
    </div>`;
}

// ─── SHOW HOME ───────────────────────────────────
function showHome() {
    document.getElementById('homeView').classList.remove('hidden');
    document.getElementById('articleView').classList.remove('active');
    document.getElementById('readProgress').classList.remove('active');
    document.getElementById('readProgress').style.width = '0%';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── STATS ───────────────────────────────────────
function updateStats() {
    document.getElementById('reviewCount').textContent = articles.filter(a => a.type === 'review').length;
    document.getElementById('guideCount').textContent  = articles.filter(a => a.type === 'recommendation').length;
}


// ─── FILTER / SORT ───────────────────────────────
function setFilter(f) {
    currentFilter = f;
    document.querySelectorAll('.ftab, .hero-pill').forEach(el => {
        el.classList.toggle('active', el.dataset.f === f || el.textContent.trim().toLowerCase().replace(' ','') === f);
    });
    const labels = { all: 'Latest Articles', review: 'Reviews', recommendation: 'Buying Guides' };
    const lbl = document.getElementById('gridLabel');
    if (lbl) lbl.textContent = labels[f] || 'Articles';
    renderGrid();
    showHome();
    document.getElementById('contentGrid').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function setSort(s) { currentSort = s; renderGrid(); }

// ─── GRID ────────────────────────────────────────
function renderGrid() {
    let list = articles;
    if (currentFilter !== 'all') list = list.filter(a => a.type === currentFilter);
    if (searchTerm) list = list.filter(a =>
        a.title.toLowerCase().includes(searchTerm) ||
        a.excerpt.toLowerCase().includes(searchTerm)
    );
    if (currentSort === 'rating') list = [...list].sort((a, b) => (b.rating||0) - (a.rating||0));

    document.getElementById('articleCountLabel').textContent = `${list.length} article${list.length !== 1 ? 's' : ''}`;

    // Card size pattern: first = wide, second = tall, rest = standard, every 7th = wide
    const grid = document.getElementById('contentGrid');
    grid.innerHTML = list.length === 0
        ? '<p style="grid-column:1/-1;padding:3rem;text-align:center;color:var(--text-lite)">No articles found.</p>'
        : list.map((a, i) => {
            const size = i === 0 ? 'wide' : i === 2 ? 'tall' : i > 0 && i % 7 === 0 ? 'wide' : '';
            return cardHTML(a, size);
        }).join('');
}

function cardHTML(a, size = '') {
    const isReview = a.type === 'review';
    const readMins = isReview ? Math.ceil(Math.random() * 4 + 5) : Math.ceil(Math.random() * 2 + 2);
    return `
    <div class="card ${size}" onclick="openArticle('${a.id}')">
        <div class="card-img">
            <img src="${a.image}" alt="${a.title}" loading="lazy">
            <div class="card-badges">
                <span class="badge ${isReview ? 'badge-review' : 'badge-guide'}">${isReview ? 'Review' : 'Guide'}</span>
                ${a.hot ? '<span class="badge badge-hot">🔥 Hot</span>' : ''}
            </div>
            ${a.rating ? `<div class="card-rating-chip">★ ${a.rating}</div>` : ''}
        </div>
        <div class="card-body">
            <div class="card-meta">
                ${a.date}${a.price ? ' · ' + a.price : ''}
                <span class="read-time">☕ ${readMins} min</span>
            </div>
            <div class="card-title">${a.title}</div>
            ${size !== '' ? `<div class="card-excerpt">${a.excerpt}</div>` : ''}
            <div class="card-footer">
                <span class="card-tag">${a.category || (isReview ? 'Review' : 'Guide')}</span>
                <span class="card-link">Read →</span>
            </div>
        </div>
    </div>`;
}

// ─── ARTICLE ─────────────────────────────────────
function openArticle(id) {
    const a = articles.find(x => x.id === id);
    if (!a) return;
    a.views = (a.views || 0) + 1;
    const html = a.type === 'review' ? reviewHTML(a) : guideHTML(a);
    document.getElementById('articleContent').innerHTML = html;
    buildTOC(a);
    document.getElementById('homeView').classList.add('hidden');
    document.getElementById('articleView').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── TABLE OF CONTENTS ────────────────────────────
function buildTOC(a) {
    const sections = [];
    if (a.type === 'review') {
        sections.push({ id: 'overview', label: 'Overview' });
        if (a.specs)     sections.push({ id: 'specs', label: 'Specifications' });
        if (a.fullReview) a.fullReview.forEach((s, i) => sections.push({ id: `section-${i}`, label: s.heading }));
        if (a.pros)      sections.push({ id: 'procons', label: 'Pros & Cons' });
        sections.push({ id: 'verdict', label: 'Verdict' });
    } else {
        sections.push({ id: 'overview', label: 'Overview' });
        sections.push({ id: 'picks', label: 'Top Picks' });
        sections.push({ id: 'verdict', label: 'Final Thoughts' });
    }
    document.getElementById('tocLinks').innerHTML = sections.map((s, i) => `
        <a class="toc-link" href="#${s.id}" onclick="scrollToSection('${s.id}'); return false;">${s.label}</a>
        ${i === 0 ? '<div class="toc-sep"></div>' : ''}
    `).join('');
}

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── REVIEW HTML ─────────────────────────────────
function reviewHTML(a) {
    const subScores = a.subScores || {};
    return `
    <div class="article-card">
        <div class="article-label" id="overview">${a.category || 'Review'}</div>
        <h1 class="article-title">${a.title}</h1>
        <div class="article-byline">
            <span>📅 ${a.date}</span>
            ${a.price ? `<span>💰 ${a.price}</span>` : ''}
            <span>👁 ${a.views || 1} views</span>
        </div>

        ${a.images && a.images.length ? `<div class="img-gallery">${a.images.map(img=>`<img src="${img}" alt="${a.title}" loading="lazy">`).join('')}</div>` : ''}

        <!-- SCORES -->
        ${a.rating ? `
        <div class="score-row">
            <div class="score-overall">
                <div class="big">${a.rating}</div>
                <div class="lbl">Overall</div>
            </div>
            ${Object.keys(subScores).length ? `
            <div class="sub-scores">
                <div class="sub-scores-title">Score Breakdown</div>
                ${Object.entries(subScores).map(([k,v]) => `
                <div class="sub-score-row">
                    <div class="sub-score-label">${k}</div>
                    <div class="sub-score-bar"><div class="sub-score-fill" style="width:${v*10}%"></div></div>
                    <div class="sub-score-num">${v}</div>
                </div>`).join('')}
            </div>` : ''}
        </div>` : ''}

        <!-- USE CASES -->
        ${a.useCases ? `
        <div class="use-cases">
            ${a.useCases.map(u => `
            <div class="use-case">
                <span class="uc-icon">${u.icon}</span>
                <span class="uc-label">${u.label}</span>
                <div class="uc-stars">${'★'.repeat(u.stars)}<span class="dim">${'★'.repeat(5-u.stars)}</span></div>
            </div>`).join('')}
        </div>` : ''}

        <!-- SUMMARY -->
        ${a.summary ? `<div class="summary-box"><strong>Quick Take:</strong> ${a.summary}</div>` : ''}

        <!-- TOP CTA -->
        <div class="amazon-cta">
            <h3>Buy the ${a.title.replace(' Review','')}</h3>
            <p>${a.price ? `Current price: ${a.price} · ` : ''}Check latest deals on Amazon</p>
            <a href="${a.amazonLink}" class="amazon-btn" target="_blank" rel="nofollow noopener">View on Amazon →</a>
        </div>

        <!-- SPECS -->
        ${a.specs ? `
        <div class="art-section" id="specs">
            <h2>Specifications</h2>
            <div class="specs-grid">
                ${Object.entries(a.specs).map(([k,v]) => `
                <div class="spec-card">
                    <div class="spec-lbl">${k}</div>
                    <div class="spec-val">${v}</div>
                </div>`).join('')}
            </div>
        </div>` : ''}

        <!-- REVIEW SECTIONS -->
        ${a.fullReview ? a.fullReview.map((s, i) => `
        <div class="art-section" id="section-${i}">
            <h2>${s.heading}</h2>
            ${s.paragraphs.map(p => `<p>${p}</p>`).join('')}
            ${s.image ? `<img src="${s.image}" alt="${s.heading}">` : ''}
        </div>`).join('') : ''}

        <!-- PROS / CONS -->
        ${a.pros || a.cons ? `
        <div class="art-section" id="procons">
            <h2>Pros & Cons</h2>
            <div class="pros-cons">
                ${a.pros ? `<div class="pros-card"><h3>What's Great</h3><ul>${a.pros.map(p=>`<li>${p}</li>`).join('')}</ul></div>` : ''}
                ${a.cons ? `<div class="cons-card"><h3>Watch Out For</h3><ul>${a.cons.map(c=>`<li>${c}</li>`).join('')}</ul></div>` : ''}
            </div>
        </div>` : ''}

        <!-- VERDICT -->
        ${a.verdict ? `
        <div class="art-section" id="verdict">
            <h2>Verdict</h2>
            <div class="verdict-box">
                <h3>Our Take</h3>
                <p>${a.verdict}</p>
                ${a.bestFor ? `<div class="best-for"><strong>Best For:</strong> ${a.bestFor}</div>` : ''}
            </div>
        </div>` : ''}

        <!-- BOTTOM CTA -->
        <div class="amazon-cta">
            <h3>Ready to Buy?</h3>
            <p>Get the best price on Amazon</p>
            <a href="${a.amazonLink}" class="amazon-btn" target="_blank" rel="nofollow noopener">View on Amazon →</a>
        </div>

        <!-- RELATED -->
        ${a.relatedArticles && a.relatedArticles.length ? `
        <div class="art-section">
            <h2>Related Articles</h2>
            <div class="related-grid">
                ${a.relatedArticles.map(id => {
                    const r = articles.find(x => x.id === id);
                    return r ? `
                    <div class="related-card" onclick="openArticle('${r.id}')">
                        <img src="${r.image}" alt="${r.title}" loading="lazy">
                        <div class="related-card-body"><h4>${r.title}</h4></div>
                    </div>` : '';
                }).join('')}
            </div>
        </div>` : ''}

        <div class="disclosure"><strong>Disclosure:</strong> AI assisted with formatting this review. All testing, opinions, and scores are human-generated from hands-on use.</div>
    </div>`;
}

// ─── GUIDE HTML ──────────────────────────────────
function guideHTML(a) {
    return `
    <div class="article-card">
        <div class="article-label" id="overview">Buying Guide</div>
        <h1 class="article-title">${a.title}</h1>
        <div class="article-byline">
            <span>📅 ${a.date}</span>
            <span>👁 ${a.views || 1} views</span>
        </div>

        ${a.intro ? `<div class="summary-box">${a.intro}</div>` : ''}

        <div id="picks">
        ${a.recommendations ? a.recommendations.map((r, i) => `
        <div class="rec-item">
            <div class="rec-top">
                <div class="rec-name">${i + 1}. ${r.name}${r.tag ? `<span>${r.tag}</span>` : ''}</div>
                ${r.price ? `<div class="rec-price">${r.price}</div>` : ''}
            </div>
            <div class="rec-desc">${r.description}</div>
            ${r.highlights ? `<div class="rec-highlights">${r.highlights.map(h=>`<span class="rec-highlight">✓ ${h}</span>`).join('')}</div>` : ''}
            <div class="rec-btns">
                ${r.reviewLink ? `<a href="#" class="btn-sm btn-ghost" onclick="openArticle('${r.reviewLink}'); return false;">Full Review</a>` : ''}
                <a href="${r.amazonLink}" class="btn-sm btn-primary" target="_blank" rel="nofollow noopener">View on Amazon →</a>
            </div>
        </div>`).join('') : ''}
        </div>

        ${a.verdict ? `
        <div class="verdict-box" id="verdict">
            <h3>Our Final Recommendation</h3>
            <p>${a.verdict}</p>
        </div>` : ''}

        ${a.relatedArticles && a.relatedArticles.length ? `
        <div class="art-section">
            <h2>Related Reviews</h2>
            <div class="related-grid">
                ${a.relatedArticles.map(id => {
                    const r = articles.find(x => x.id === id);
                    return r ? `
                    <div class="related-card" onclick="openArticle('${r.id}')">
                        <img src="${r.image}" alt="${r.title}" loading="lazy">
                        <div class="related-card-body"><h4>${r.title}</h4></div>
                    </div>` : '';
                }).join('')}
            </div>
        </div>` : ''}

        <div class="disclosure"><strong>Disclosure:</strong> This guide contains affiliate links. We earn a commission at no extra cost to you. AI assisted with formatting; recommendations are based on real testing.</div>
    </div>`;
}

// ─── SHOW HOME ───────────────────────────────────
function showHome() {
    document.getElementById('homeView').classList.remove('hidden');
    document.getElementById('articleView').classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── STATS ───────────────────────────────────────
function updateStats() {
    document.getElementById('reviewCount').textContent = articles.filter(a => a.type === 'review').length;
    document.getElementById('guideCount').textContent  = articles.filter(a => a.type === 'recommendation').length;
}
