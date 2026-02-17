// STATE
let currentFilter = 'all';
let currentSort   = 'default';
let searchTerm    = '';
let sessionReads  = 0;

// BOOT
document.addEventListener('DOMContentLoaded', () => {
    renderGrid();
    updateStats();
    initMood();
    initScrollTop();
    initTypedOn();
    initOnDesk();
    initKonami();
    setTimeLabel();
    document.getElementById('searchInput').addEventListener('input', e => {
        searchTerm = e.target.value.toLowerCase().trim();
        renderGrid();
    });
    initProgressBar();
});

// MOOD CHIP
function initMood() {
    const dot = document.querySelector('.mood-dot');
    if (dot) {
        const h = new Date().getHours();
        if (h >= 5 && h < 12)       dot.classList.add('morning');
        else if (h >= 12 && h < 19) dot.classList.add('afternoon');
        else                         dot.classList.add('evening');
    }

    const moods = [
        'New reviews up', 'Fresh picks in', 'Good typing weather',
        'Updated guides', 'Clicky vibes only', 'Typing away...',
        'thockin it up', 'Sipping & clickin', 'reviewing keybs',
        'CTRL+ALT+DEL', 'Warm switches only', 'Soft lights, loud keys',
        'Rainy day keystrokes', 'Comfort build season', 'Foam? Yes.',
        'Candles & keycaps', 'Factory lubed?', 'Stabs tuned',
        'ABS or PBT?', 'Stock is never enough', 'sudo type',
        'apt install thock', 'printf("thock");', '404: mush not found',
        'git commit -m "thock"', 'low latency thoughts', 'hot-swap era',
        'Thock detected', 'Clickity Clackity', 'Key feel > specs',
        'desk lamp on', 'warm rgb glow', 'typing by lamplight',
        'slow presses only', 'no rattle detected', 'gasket season',
        'deskmat matters', 'make clean && type', 'rm -rf clack',
        'while(true) type;', 'thock++', 'touch grass later',
        'typing as a service', 'typing rn', 'check ur dms',
        'low-pass filter vibes', 'powered by vibezzz', 'im sleeping',
        'no cookies, just crumbs', 'acoustics matter', 'melt ice', 'hardware zen',
        'measured by feel', 'stay a while', 'you can rest', 'ok', 'true',
        'false', 'reply hazy, try again', 'Outlook not so good',
        'nothing exploded', 'passed vibes check', 'brb typing',
        'ok cool', 'still here', 'you noticed', 'hi',
        'this one\'s rare', 'go type', 'i am your father',
        'pe foam arc', 'tape mod enjoyer', 'long pole supremacy',
        'tx stabs spotted', 'cherry picked', 'glarses, i seeee you',
        'break-in complete', 'fr4 energy', 'no standing waves',
        'tty quiet', 'nohup typing', 'stdin accepted', 'stdout: thock',
        'daemon running', 'uptime: too much', 'localhost vibes',
        'under construction', 'static but alive', 'iykyk', 'based',
        'stay real twin', 'ok last one', 'still reading?',
        'edit: nvm', 'i see you', 'last seen 2014', 'btw i use arch',
        'vim users typing', 'rc.local vibes', 'rng smiled',
        'proof omitted', 'invariant holds', 'floating ground',
        'cdn did it', 'http 200', 'css is hard', 'you\'re early',
        'so the prophecy is true', 'pause here', 'we are good', 'carry on',
        'this is intentional', 'are you real?', 'we live in a simulation',
        'luthorcorp intern', 'plato\'s desk', 'the medium is the key',
        'hegel would argue', 'existence precedes feel', 'being-toward-thock',
        'i thock, therefore i am', 'citation needed', 'sample size: me',
        'dead link', 'wayback says yes', 'mirror unavailable', 'account deleted',
        'color graded warm', 'subtext detected', 'proof by vibes', 'warmup didn\'t help',
        'copium applied', 'this is a reference', 'okay you win',
        'clark learns lesson, resets', 'bald by destiny',
        'jouissance detected', 'always-already typing', 'funding pending',
        'null result buried', 'insert mood here', 'phpbb skin',
        'imageshack watermark', 'thread necro', 'ltspice agrees',
        'pink noise ritual', 'up to isomorphism', 'measure zero',
        'assume 27 frictionless pigs', 'heap smells weird',
        'works under gdb', 'no further context', 'being and keyness',
        'plato\'s ideal switch', 'the medium is the keyboard', 'ethics of actuation',
        'existence precedes layout', 'noumenal thock', 'repressed tactility',
        'thock as symptom', 'id, ego, keycap', 'qed but clicky',
        'keys obey newton', 'homeostasis achieved', 'bullish on gasket',
        'means of actuation', 'checks and balances', 'soft reboot energy',
        'pb pace', 'garbage collected clacks', 'best viewed typing',
        'morphology of click', 'language is tactile', '42',
        'in the beginning was the key', 'may the thock be with you',
        'flow state reached', 'timeline forked', 'canon disputed',
        'the key is the key', 'this is not a metaphor', 'we warned you',
        'it works', 'as intended', 'probably fine', 'nice.'
    ];
    const el = document.getElementById('moodText');
    if (el) el.textContent = moods[Math.floor(Math.random() * moods.length)];
}

// PROGRESS BAR
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

// SCROLL-AWARE TOC
function highlightTOC() {
    const links = document.querySelectorAll('.toc-link');
    let current = '';
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        const id = href.replace('#', '');
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 140) current = id;
    });
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        link.classList.toggle('active', href === '#' + current);
    });
}

// KEYBOARD-KEY SCROLL-TO-TOP BUTTON
function initScrollTop() {
    const btn = document.getElementById('keyScrollTop');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// TIME-AWARE GRID LABEL
function setTimeLabel() {
    const h = new Date().getHours();
    let label = 'Latest Articles';
    if (h >= 5  && h < 10)  label = 'Morning Reads';
    if (h >= 10 && h < 13)  label = 'Latest Articles';
    if (h >= 13 && h < 17)  label = 'Afternoon Picks';
    if (h >= 17 && h < 21)  label = 'Evening Reading';
    if (h >= 21 || h < 5)   label = 'Late Night Typing';
    const el = document.getElementById('gridLabel');
    if (el) el.textContent = label;
}

// ON THE DESK — uses ON_DESK_BOARDS from articles.js
function initOnDesk() {
    const pick = ON_DESK_BOARDS[Math.floor(Math.random() * ON_DESK_BOARDS.length)];
    const el = document.getElementById('onDeskBoard');
    if (el) {
        el.textContent = pick.name;
        el.href = 'https://www.amazon.com/s?k=' + encodeURIComponent(pick.q) + '&tag=' + AFFILIATE_TAG;
    }
}

// KONAMI CODE
function initKonami() {
    const seq = [38,38,40,40,37,39,37,39,66,65];
    let pos = 0;
    document.addEventListener('keydown', e => {
        if (e.keyCode === seq[pos]) {
            pos++;
            if (pos === seq.length) {
                pos = 0;
                const chip = document.querySelector('.mood-chip');
                const text = document.getElementById('moodText');
                if (!chip || !text) return;
                const prev = text.textContent;
                chip.classList.add('konami');
                text.textContent = 'being-toward-thock';
                setTimeout(() => {
                    chip.classList.remove('konami');
                    text.textContent = prev;
                }, 5000);
            }
        } else { pos = 0; }
    });
}

// RELATIVE DATE
function relativeDate(dateStr) {
    const parsed = new Date(dateStr);
    if (isNaN(parsed)) return null;
    const diff = Math.floor((Date.now() - parsed) / 1000);
    if (diff < 60)       return 'just now';
    if (diff < 3600)     return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400)    return `${Math.floor(diff / 3600)}h ago`;
    const days = Math.floor(diff / 86400);
    if (days === 1)      return 'yesterday';
    if (days < 7)        return `${days} days ago`;
    if (days < 30)       return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? 's' : ''} ago`;
    if (days < 365)      return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? 's' : ''} ago`;
    return `${Math.floor(days / 365)} year${Math.floor(days / 365) > 1 ? 's' : ''} ago`;
}

function initRelDates() {
    document.querySelectorAll('.rel-date').forEach(el => {
        const original = el.textContent;
        const rel = relativeDate(el.dataset.date);
        if (!rel) return;
        el.addEventListener('mouseenter', () => { el.textContent = rel; });
        el.addEventListener('mouseleave', () => { el.textContent = original; });
    });
}

// TYPED-ON FOOTER
function initTypedOn() {
    const boards = [
        'a Keychron Q1', 'an HHKB Professional Hybrid', 'a Topre Realforce',
        'a Mode Sonnet', 'a Zoom75', 'a KBD67 Lite', 'a Polaris',
        'a Bakeneko65', 'a Ginkgo65', 'a Keychron K2', 'a Satisfaction75',
        'a RAMA WORKS M60-A', 'a Keychron Q5', 'a Cannonkeys Satisfaction',
        'a Leopold FC660M', 'a Ducky One 3', 'a Varmilo VA87M',
    ];
    const el = document.getElementById('typedOn');
    if (el) el.textContent = boards[Math.floor(Math.random() * boards.length)];
}

// GRID
function renderGrid() {
    let list = articles;
    if (currentFilter !== 'all') list = list.filter(a => a.type === currentFilter);
    if (searchTerm) list = list.filter(a =>
        a.title.toLowerCase().includes(searchTerm) ||
        a.excerpt.toLowerCase().includes(searchTerm)
    );
    if (currentSort === 'rating') list = [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0));

    document.getElementById('articleCountLabel').textContent = `${list.length} article${list.length !== 1 ? 's' : ''}`;

    const grid = document.getElementById('contentGrid');
    grid.innerHTML = list.length === 0
        ? '<p style="grid-column:1/-1;padding:3rem;text-align:center;color:var(--text-lite)">No articles found.</p>'
        : list.map((a, i) => {
            const size = i === 0 ? 'wide' : i === 2 ? 'tall' : (i > 0 && i % 7 === 0) ? 'wide' : '';
            return cardHTML(a, size, i);
        }).join('');
}

function cardHTML(a, size = '', index = 0) {
    const isReview = a.type === 'review';
    const readMins = isReview ? Math.ceil(Math.random() * 4 + 5) : Math.ceil(Math.random() * 2 + 2);
    const delay = Math.min(index * 60, 400);
    const typeLabel = isReview ? 'Review' : 'Guide';
    return `
    <div class="card ${size}" data-type="${a.type}" onclick="openArticle('${a.id}')" style="animation-delay:${delay}ms">
        <div class="card-img">
            <img src="${a.image}" alt="${a.title}" loading="lazy">
            <div class="card-type-pill">${typeLabel}</div>
            ${a.rating ? `<div class="card-rating-chip">★ ${a.rating}</div>` : ''}
        </div>
        <div class="card-body">
            <div class="card-meta">
                <span>${a.date}</span>
                ${a.price ? `<span class="card-meta-dot">·</span><span>${a.price}</span>` : ''}
                <span class="card-meta-dot">·</span>
                <span class="read-time">☕ ${readMins} min</span>
            </div>
            <div class="card-title">${a.title}</div>
            ${size !== '' ? `<div class="card-excerpt">${a.excerpt}</div>` : ''}
            <div class="card-footer">
                <span class="card-tag" data-cat="${a.category || typeLabel}">${a.category || typeLabel}</span>
                <span class="card-link">Read <span>→</span></span>
            </div>
        </div>
    </div>`;
}

// ARTICLE
function openArticle(id) {
    const a = articles.find(x => x.id === id);
    if (!a) return;
    a.views = (a.views || 0) + 1;
    sessionReads++;
    document.title = `${a.title} — KeyboardHub`;
    const html = a.type === 'review' ? reviewHTML(a) : guideHTML(a);
    document.getElementById('articleContent').innerHTML = html;
    buildTOC(a);
    document.getElementById('homeView').classList.add('hidden');
    document.getElementById('articleView').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const back = document.getElementById('articleBack');
    if (back) {
        back.innerHTML = `← All Articles${sessionReads >= 2
            ? ` <span class="session-badge">${sessionReads} today</span>`
            : ''}`;
        back.onclick = (e) => { e.preventDefault(); showHome(); };
    }
    initRelDates();
}

// TABLE OF CONTENTS
function buildTOC(a) {
    const sections = [];
    if (a.type === 'review') {
        sections.push({ id: 'overview', label: 'Overview' });
        if (a.specs)      sections.push({ id: 'specs', label: 'Specifications' });
        if (a.fullReview) a.fullReview.forEach((s, i) => sections.push({ id: `section-${i}`, label: s.heading }));
        if (a.pros)       sections.push({ id: 'procons', label: 'Pros & Cons' });
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

// REVIEW HTML
function reviewHTML(a) {
    const subScores = a.subScores || {};
    const allText = [
        a.summary || '', a.verdict || '',
        ...(a.fullReview ? a.fullReview.flatMap(s => s.paragraphs) : [])
    ].join(' ');
    const wordCount = allText.split(/\s+/).filter(Boolean).length;
    const wordDisplay = wordCount > 0 ? `~${Math.round(wordCount / 50) * 50} words` : '';
    const rel = relativeDate(a.date);

    return `
    <div class="article-card">
        <div class="article-label" id="overview">${a.category || 'Review'}</div>
        <h1 class="article-title">${a.title}</h1>
        <div class="article-byline">
            <span class="rel-date" data-date="${a.date}" title="${rel || a.date}">📅 ${a.date}</span>
            ${a.price ? `<span>💰 ${a.price}</span>` : ''}
            <span>👁 ${a.views || 1} views</span>
            ${wordDisplay ? `<span>📄 ${wordDisplay}</span>` : ''}
        </div>
        ${a.images && a.images.length ? `<div class="img-gallery">${a.images.map(img => `<img src="${img}" alt="${a.title}" loading="lazy">`).join('')}</div>` : ''}
        ${a.rating ? `
        <div class="score-row">
            <div class="score-overall">
                <div class="big">${a.rating}</div>
                <div class="lbl">Overall</div>
            </div>
            ${Object.keys(subScores).length ? `
            <div class="sub-scores">
                <div class="sub-scores-title">Score Breakdown</div>
                ${Object.entries(subScores).map(([k, v]) => `
                <div class="sub-score-row">
                    <div class="sub-score-label">${k}</div>
                    <div class="sub-score-bar"><div class="sub-score-fill" style="width:${v * 10}%"></div></div>
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
                <div class="uc-stars">${'★'.repeat(u.stars)}<span class="dim">${'★'.repeat(5 - u.stars)}</span></div>
            </div>`).join('')}
        </div>` : ''}
        ${a.summary ? `<div class="summary-box"><strong>Quick Take:</strong> ${a.summary}</div>` : ''}
        <div class="amazon-cta">
            <h3>Buy the ${a.title.replace(' Review', '')}</h3>
            <p>${a.price ? `Current price: ${a.price} · ` : ''}Check latest deals on Amazon</p>
            <a href="${a.amazonLink}" class="amazon-btn" target="_blank" rel="nofollow noopener">View on Amazon →</a>
        </div>
        ${a.specs ? `
        <div class="art-section" id="specs">
            <h2>Specifications</h2>
            <div class="specs-grid">
                ${Object.entries(a.specs).map(([k, v]) => `
                <div class="spec-card"><div class="spec-lbl">${k}</div><div class="spec-val">${v}</div></div>`).join('')}
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
                ${a.pros ? `<div class="pros-card"><h3>What's Great</h3><ul>${a.pros.map(p => `<li>${p}</li>`).join('')}</ul></div>` : ''}
                ${a.cons ? `<div class="cons-card"><h3>Watch Out For</h3><ul>${a.cons.map(c => `<li>${c}</li>`).join('')}</ul></div>` : ''}
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
                    return r ? `<div class="related-card" onclick="openArticle('${r.id}')">
                        <img src="${r.image}" alt="${r.title}" loading="lazy">
                        <div class="related-card-body"><h4>${r.title}</h4></div>
                    </div>` : '';
                }).join('')}
            </div>
        </div>` : ''}
    </div>`;
}

// GUIDE HTML
function guideHTML(a) {
    const rel = relativeDate(a.date);
    return `
    <div class="article-card">
        <div class="article-label" id="overview">Buying Guide</div>
        <h1 class="article-title">${a.title}</h1>
        <div class="article-byline">
            <span class="rel-date" data-date="${a.date}" title="${rel || a.date}">📅 ${a.date}</span>
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
            ${r.highlights ? `<div class="rec-highlights">${r.highlights.map(h => `<span class="rec-highlight">✓ ${h}</span>`).join('')}</div>` : ''}
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
                    return r ? `<div class="related-card" onclick="openArticle('${r.id}')">
                        <img src="${r.image}" alt="${r.title}" loading="lazy">
                        <div class="related-card-body"><h4>${r.title}</h4></div>
                    </div>` : '';
                }).join('')}
            </div>
        </div>` : ''}
    </div>`;
}

// SHOW HOME
function showHome() {
    document.getElementById('homeView').classList.remove('hidden');
    document.getElementById('articleView').classList.remove('active');
    document.getElementById('readProgress').classList.remove('active');
    document.getElementById('readProgress').style.width = '0%';
    document.title = 'KeyboardHub — Mechanical Keyboard Reviews';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// STATS
function updateStats() {
    document.getElementById('reviewCount').textContent = articles.filter(a => a.type === 'review').length;
    document.getElementById('guideCount').textContent  = articles.filter(a => a.type === 'recommendation').length;
}

// FILTER / SORT
function dissolveGrid(callback) {
    const grid = document.getElementById('contentGrid');
    if (!grid) { callback(); return; }
    // Briefly fade out, update, fade back in with stagger
    grid.style.transition = 'opacity 0.15s ease';
    grid.style.opacity = '0';
    setTimeout(() => {
        callback();
        grid.style.opacity = '';
        grid.style.transition = '';
        grid.classList.add('dissolving');
        setTimeout(() => grid.classList.remove('dissolving'), 400);
    }, 150);
}

function setFilter(f) {
    currentFilter = f;
    document.querySelectorAll('.ftab').forEach(el => el.classList.toggle('active', el.dataset.f === f));
    document.querySelectorAll('nav a').forEach(a => {
        const text = a.textContent.trim().toLowerCase();
        const matches = (f === 'all' && text === 'home') ||
                        (f === 'review' && text === 'reviews') ||
                        (f === 'recommendation' && text === 'guides');
        a.classList.toggle('nav-active', matches);
    });
    setTimeLabel();
    dissolveGrid(() => renderGrid());
    showHome();
    setTimeout(() => {
        document.getElementById('contentGrid').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
}

function setSort(s) { currentSort = s; dissolveGrid(() => renderGrid()); }

function setSortBtn(s, btn) {
    currentSort = s;
    document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    dissolveGrid(() => renderGrid());
}
