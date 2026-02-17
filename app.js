// App State
let currentFilter = 'all';
let currentSort = 'latest';
let searchTerm = '';

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderContentGrid();
    updateStats();
    initializeSearch();
    initializeScrollEffects();
});

// Scroll Effects
function initializeScrollEffects() {
    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase();
        renderContentGrid();
    });
}

// Filter Content
function filterContent(type) {
    currentFilter = type;
    
    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-filter') === type) {
            tab.classList.add('active');
        }
    });
    
    renderContentGrid();
    
    // Scroll to content
    document.getElementById('content').scrollIntoView({ behavior: 'smooth' });
}

// Sort Content
function sortContent(sortType) {
    currentSort = sortType;
    renderContentGrid();
}

// Get Filtered & Sorted Articles
function getFilteredArticles() {
    let filtered = articles;
    
    // Apply filter
    if (currentFilter !== 'all') {
        filtered = filtered.filter(a => a.type === currentFilter);
    }
    
    // Apply search
    if (searchTerm) {
        filtered = filtered.filter(a => 
            a.title.toLowerCase().includes(searchTerm) ||
            a.excerpt.toLowerCase().includes(searchTerm)
        );
    }
    
    // Apply sort
    if (currentSort === 'rating') {
        filtered = filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (currentSort === 'popular') {
        filtered = filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
    }
    // Latest is default order
    
    return filtered;
}

// Render Content Grid with Varied Layouts
function renderContentGrid() {
    const grid = document.getElementById('contentGrid');
    const filtered = getFilteredArticles();
    
    if (filtered.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 3rem;">No articles found</p>';
        return;
    }
    
    // Assign card sizes for variety
    const cardSizes = ['featured', 'large', 'tall', 'standard', 'standard', 'large', 'standard', 'tall', 'standard', 'standard'];
    
    const html = filtered.map((article, index) => {
        const size = index < cardSizes.length ? cardSizes[index] : 'standard';
        const showExcerpt = size !== 'standard';
        const showQuickInfo = article.type === 'review' && article.rating;
        
        return `
            <div class="card ${size}" onclick="showArticle('${article.id}')">
                <div class="card-image">
                    <img src="${article.image}" alt="${article.title}">
                    <div class="card-badge ${article.type}">${article.type === 'review' ? 'Review' : 'Guide'}</div>
                    ${showQuickInfo ? `
                        <div class="card-quick-info">
                            <div class="quick-info-title">${article.title}</div>
                            <ul class="quick-info-list">
                                <li><strong>Rating:</strong> ${article.rating}/10</li>
                                ${article.price ? `<li><strong>Price:</strong> ${article.price}</li>` : ''}
                                ${article.specs ? `<li><strong>Type:</strong> ${article.specs.Layout}</li>` : ''}
                            </ul>
                            <div class="quick-btn">View Full Review</div>
                        </div>
                    ` : ''}
                </div>
                <div class="card-overlay">
                    <div class="card-meta">
                        <span>${article.date}</span>
                        ${article.rating ? `<span>★ ${article.rating}/10</span>` : ''}
                    </div>
                    <div class="card-title">${article.title}</div>
                    ${showExcerpt ? `<div class="card-excerpt">${article.excerpt}</div>` : ''}
                </div>
            </div>
        `;
    }).join('');
    
    grid.innerHTML = html;
}

// Show Article
function showArticle(id) {
    const article = articles.find(a => a.id === id);
    if (!article) return;
    
    // Increment views
    article.views = (article.views || 0) + 1;
    
    let content = '';
    if (article.type === 'review') {
        content = renderReview(article);
    } else {
        content = renderRecommendation(article);
    }
    
    document.getElementById('articleContent').innerHTML = content;
    document.getElementById('homeView').classList.add('hidden');
    document.getElementById('articleView').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render Review Article
function renderReview(article) {
    return `
        <article>
            <div class="article-hero">
                <h1>${article.title}</h1>
                <div class="article-meta-bar">
                    <div class="meta-info">
                        <span>📅 ${article.date}</span>
                        <span>📖 ${Math.ceil(Math.random() * 5 + 3)} min read</span>
                        <span>👁️ ${article.views || 0} views</span>
                    </div>
                    ${article.rating ? `
                        <div class="rating-display">
                            <div class="rating-number">${article.rating}</div>
                            <div>
                                <div style="font-size: 0.8rem; text-transform: uppercase; font-weight: 700; color: var(--text-light);">Overall</div>
                                <div style="font-size: 0.8rem; text-transform: uppercase; font-weight: 700; color: var(--text-light);">Score</div>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>

            <div class="article-content">
                ${article.images && article.images.length > 0 ? `
                    <div class="image-gallery">
                        ${article.images.map(img => `<img src="${img}" alt="${article.title}" class="gallery-img">`).join('')}
                    </div>
                ` : ''}

                ${article.summary ? `
                    <div class="content-block">
                        <h2>Quick Take</h2>
                        <p><strong>${article.summary}</strong></p>
                    </div>
                ` : ''}

                <div class="cta-box">
                    <h3>Buy ${article.title}</h3>
                    <p>${article.price ? `Current Price: ${article.price} • ` : ''}Check latest deals on Amazon</p>
                    <a href="${article.amazonLink}" class="cta-btn" target="_blank" rel="nofollow noopener">View on Amazon →</a>
                </div>

                ${article.specs ? `
                    <div class="content-block">
                        <h2>Technical Specifications</h2>
                        <div class="specs-grid">
                            ${Object.entries(article.specs).map(([key, value]) => `
                                <div class="spec-card">
                                    <div class="spec-label">${key}</div>
                                    <div class="spec-value">${value}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                ${article.fullReview ? `
                    <div class="content-block">
                        <h2>Full Review</h2>
                        ${article.fullReview.map(section => `
                            <h3 style="font-size: 1.5rem; margin: 2rem 0 1rem; font-weight: 700;">${section.heading}</h3>
                            ${section.paragraphs.map(p => `<p>${p}</p>`).join('')}
                            ${section.image ? `<img src="${section.image}" alt="${section.heading}" style="width: 100%; border-radius: 16px; margin: 2rem 0;">` : ''}
                        `).join('')}
                    </div>
                ` : ''}

                ${article.pros || article.cons ? `
                    <div class="content-block">
                        <h2>Pros & Cons</h2>
                        <div class="pros-cons-grid">
                            ${article.pros ? `
                                <div class="pros-card">
                                    <h3>👍 What's Great</h3>
                                    <ul>
                                        ${article.pros.map(pro => `<li>${pro}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                            ${article.cons ? `
                                <div class="cons-card">
                                    <h3>👎 What's Not</h3>
                                    <ul>
                                        ${article.cons.map(con => `<li>${con}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                ` : ''}

                ${article.verdict ? `
                    <div class="content-block">
                        <h2>Final Verdict</h2>
                        <p>${article.verdict}</p>
                        ${article.bestFor ? `<p><strong>Best For:</strong> ${article.bestFor}</p>` : ''}
                    </div>
                ` : ''}

                <div class="cta-box">
                    <h3>Ready to Purchase?</h3>
                    <p>Get the ${article.title} at the best price</p>
                    <a href="${article.amazonLink}" class="cta-btn" target="_blank" rel="nofollow noopener">View on Amazon →</a>
                </div>

                ${article.relatedArticles && article.relatedArticles.length > 0 ? `
                    <div class="content-block">
                        <h2>Related Articles</h2>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                            ${article.relatedArticles.map(relId => {
                                const rel = articles.find(a => a.id === relId);
                                return rel ? `
                                    <div style="cursor: pointer; padding: 1rem; background: var(--bg-subtle); border-radius: 12px;" onclick="showArticle('${rel.id}')">
                                        <img src="${rel.image}" alt="${rel.title}" style="width: 100%; aspect-ratio: 16/9; object-fit: cover; border-radius: 8px; margin-bottom: 0.5rem;">
                                        <h4 style="font-size: 1rem; font-weight: 600;">${rel.title}</h4>
                                    </div>
                                ` : '';
                            }).join('')}
                        </div>
                    </div>
                ` : ''}

                <div style="background: #fffbeb; border: 2px solid #fde68a; padding: 1.5rem; border-radius: 12px; margin-top: 3rem; font-size: 0.9rem; color: #92400e;">
                    <strong>Disclosure:</strong> This article may contain affiliate links. We may earn a commission from purchases made through these links at no additional cost to you. AI assisted with formatting; all testing and opinions are human-generated.
                </div>
            </div>
        </article>
    `;
}

// Render Recommendation Article
function renderRecommendation(article) {
    return `
        <article>
            <div class="article-hero">
                <h1>${article.title}</h1>
                <div class="article-meta-bar">
                    <div class="meta-info">
                        <span>📅 ${article.date}</span>
                        <span>📖 ${Math.ceil(Math.random() * 4 + 2)} min read</span>
                        <span>👁️ ${article.views || 0} views</span>
                    </div>
                </div>
            </div>

            <div class="article-content">
                ${article.intro ? `
                    <div class="content-block">
                        <p style="font-size: 1.2rem; line-height: 1.8;"><strong>${article.intro}</strong></p>
                    </div>
                ` : ''}

                <div class="content-block">
                    <h2>Our Top Picks</h2>
                    ${article.recommendations ? article.recommendations.map((rec, index) => `
                        <div class="recommendation-card">
                            <div class="rec-header">
                                <h3>${index + 1}. ${rec.name}</h3>
                                ${rec.price ? `<div class="rec-price">${rec.price}</div>` : ''}
                            </div>
                            <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text); margin: 1rem 0;">${rec.description}</p>
                            ${rec.highlights && rec.highlights.length > 0 ? `
                                <div style="background: var(--bg-subtle); padding: 1.5rem; border-radius: 12px; margin: 1rem 0;">
                                    <strong style="display: block; margin-bottom: 1rem;">Key Features:</strong>
                                    <ul style="list-style: none; padding: 0;">
                                        ${rec.highlights.map(h => `<li style="padding: 0.4rem 0; padding-left: 1.5rem; position: relative;">
                                            <span style="position: absolute; left: 0; color: var(--primary);">✓</span>
                                            ${h}
                                        </li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                            <div class="rec-buttons">
                                ${rec.reviewLink ? `
                                    <a href="#" onclick="showArticle('${rec.reviewLink}'); return false;" class="btn" style="background: var(--bg-subtle); color: var(--text);">Read Full Review</a>
                                ` : ''}
                                <a href="${rec.amazonLink}" class="btn btn-primary" target="_blank" rel="nofollow noopener" style="background: var(--primary); color: white;">View on Amazon →</a>
                            </div>
                        </div>
                    `).join('') : ''}
                </div>

                ${article.verdict ? `
                    <div class="content-block">
                        <h2>Final Recommendation</h2>
                        <p style="font-size: 1.1rem; line-height: 1.8;">${article.verdict}</p>
                    </div>
                ` : ''}

                <div style="background: #fffbeb; border: 2px solid #fde68a; padding: 1.5rem; border-radius: 12px; margin-top: 3rem; font-size: 0.9rem; color: #92400e;">
                    <strong>Disclosure:</strong> This article contains affiliate links. We may earn a commission from purchases at no additional cost to you.
                </div>
            </div>
        </article>
    `;
}

// Show Home
function showHome() {
    document.getElementById('homeView').classList.remove('hidden');
    document.getElementById('articleView').classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update Stats
function updateStats() {
    const reviewCount = articles.filter(a => a.type === 'review').length;
    const guideCount = articles.filter(a => a.type === 'recommendation').length;
    document.getElementById('reviewCount').textContent = reviewCount;
    document.getElementById('guideCount').textContent = guideCount;
}
