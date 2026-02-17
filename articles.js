// ==========================================
// ARTICLES DATABASE
// Add your articles here - supports two types:
// 1. "review" - Full keyboard review
// 2. "recommendation" - Buying guide / listicle
// ==========================================

const articles = [
    // EXAMPLE RECOMMENDATION ARTICLE
    {
        type: 'recommendation',
        id: 'best-wireless-keyboards-2024',
        title: 'Best Wireless Mechanical Keyboards for 2024',
        excerpt: 'Cut the cord without compromising on performance. Our top picks for wireless mechanical keyboards.',
        date: 'Feb 15, 2024',
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80',
        intro: 'Wireless mechanical keyboards have come a long way. Modern options offer excellent battery life, reliable connectivity, and zero compromises on typing feel. Here are our top picks across different budgets and use cases.',
        recommendations: [
            {
                name: 'Keychron K2',
                price: '$89',
                description: 'The best all-around wireless mechanical keyboard for most people. Hot-swappable switches, excellent battery life, and Mac/Windows compatibility make this a versatile daily driver.',
                highlights: [
                    'Hot-swappable switches',
                    '2-week battery life',
                    'Connects to 3 devices',
                    'Aluminum frame'
                ],
                reviewLink: 'keychron-k2',  // Link to your review if it exists
                amazonLink: 'YOUR_AMAZON_AFFILIATE_LINK'
            },
            {
                name: 'Logitech MX Mechanical',
                price: '$169',
                description: 'Premium option with excellent software, low-profile switches, and professional aesthetics. Perfect for office environments where you need quiet operation.',
                highlights: [
                    'Low-profile mechanical switches',
                    'Multi-device connectivity',
                    'Backlit keys',
                    'Premium build quality'
                ],
                reviewLink: null,  // No review yet
                amazonLink: 'YOUR_AMAZON_AFFILIATE_LINK'
            },
            {
                name: 'Keychron K3',
                price: '$84',
                description: 'Ultra-slim wireless mechanical keyboard with low-profile switches. Great for travel and minimalist setups without sacrificing the mechanical feel.',
                highlights: [
                    'Ultra-slim profile',
                    'Low-profile switches',
                    'Compact 75% layout',
                    'Long battery life'
                ],
                reviewLink: null,
                amazonLink: 'YOUR_AMAZON_AFFILIATE_LINK'
            }
        ],
        verdict: 'For most users, the Keychron K2 offers the best balance of features and value. If you need something quieter for the office, the MX Mechanical is worth the premium. Travel frequently? The K3 is your best bet.'
    },

    // EXAMPLE REVIEW ARTICLE
    {
        type: 'review',
        id: 'keychron-k2',
        title: 'Keychron K2 Review',
        excerpt: 'Versatile wireless mechanical keyboard with hot-swap switches and excellent battery life.',
        date: 'Feb 10, 2024',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
        amazonLink: 'YOUR_AMAZON_AFFILIATE_LINK',
        rating: 8.5,
        price: '$89',
        specs: {
            Brand: 'Keychron',
            Switches: 'Gateron Brown (Hot-swap)',
            Layout: '75% (84 keys)',
            Connection: 'Wireless & USB-C',
            Keycaps: 'ABS Double-shot',
            Lighting: 'RGB',
            Battery: '4000mAh',
            Weight: '600g'
        },
        summary: 'The Keychron K2 is a versatile wireless mechanical keyboard that bridges compact design with full functionality. Hot-swappable switches, solid build quality, and impressive battery life make it an excellent choice for anyone wanting wireless freedom without compromises.',
        pros: [
            'Hot-swappable switches - easy to customize',
            'Excellent 2-week battery life with RGB',
            'Pairs with up to 3 devices simultaneously',
            'Solid aluminum frame feels premium',
            'Mac and Windows compatible out of the box',
            'Compact 75% layout includes arrow keys and function row'
        ],
        cons: [
            'Slight stabilizer rattle on spacebar and shift keys',
            'No dedicated software for advanced customization',
            'Higher profile may require wrist rest for some users',
            'ABS keycaps will develop shine over time'
        ],
        verdict: 'The Keychron K2 delivers exceptional value with practical features that matter. Hot-swap capability future-proofs your investment, while the reliable wireless connection and long battery life make it perfect for multi-device setups. Minor issues like stabilizer rattle are easily forgiven at this price point.',
        bestFor: 'Remote workers, Mac users wanting a mechanical option, anyone needing wireless flexibility, budget-conscious enthusiasts who want hot-swap capability'
    },

    // ANOTHER EXAMPLE RECOMMENDATION
    {
        type: 'recommendation',
        id: 'best-budget-mechanical-keyboards',
        title: 'Best Mechanical Keyboards Under $100',
        excerpt: 'Quality mechanical keyboards that won\'t break the bank. Tested picks under $100.',
        date: 'Feb 14, 2024',
        image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80',
        intro: 'You don\'t need to spend $200+ to get a great mechanical keyboard. These budget-friendly options deliver excellent typing experiences without compromising on quality.',
        recommendations: [
            {
                name: 'Royal Kludge RK84',
                price: '$65',
                description: 'Incredible value with wireless connectivity, hot-swap switches, and solid build quality. One of the best budget options available.',
                highlights: [
                    'Hot-swappable switches',
                    'Wireless and wired modes',
                    'Compact 75% layout',
                    'RGB backlighting'
                ],
                reviewLink: null,
                amazonLink: 'YOUR_AMAZON_AFFILIATE_LINK'
            },
            {
                name: 'Keychron C1',
                price: '$49',
                description: 'Wired full-size option from Keychron at an unbeatable price. No frills, just solid mechanical typing for less than $50.',
                highlights: [
                    'Full-size layout',
                    'Gateron switches',
                    'Hot-swappable',
                    'Tenkeyless option available'
                ],
                reviewLink: null,
                amazonLink: 'YOUR_AMAZON_AFFILIATE_LINK'
            },
            {
                name: 'Redragon K552',
                price: '$40',
                description: 'Entry-level mechanical keyboard perfect for trying out mechanical switches. Compact TKL design and surprising build quality for the price.',
                highlights: [
                    'TKL compact design',
                    'Metal construction',
                    'Red backlighting',
                    'Very affordable'
                ],
                reviewLink: null,
                amazonLink: 'YOUR_AMAZON_AFFILIATE_LINK'
            }
        ],
        verdict: 'The RK84 offers the best overall package under $100, especially if you want wireless capability. For pure value, the Keychron C1 can\'t be beat. First mechanical keyboard? Start with the Redragon K552.'
    },

    // ==========================================
    // ADD YOUR NEW ARTICLES BELOW
    // ==========================================
    
    // REVIEW TEMPLATE:
    /*
    {
        type: 'review',
        id: 'keyboard-slug',
        title: 'Keyboard Name Review',
        excerpt: 'One sentence summary',
        date: 'Feb 16, 2024',
        image: 'https://images.unsplash.com/photo-xxxxx',
        amazonLink: 'YOUR_AMAZON_LINK',
        rating: 8.5,
        price: '$XX',
        specs: {
            Brand: 'Brand Name',
            Switches: 'Switch Type',
            Layout: 'Layout',
            Connection: 'Type',
            Keycaps: 'Material',
            Lighting: 'RGB/None',
            // Add more specs as needed
        },
        summary: '2-3 sentences overview',
        pros: [
            'Pro 1',
            'Pro 2',
            'Pro 3'
        ],
        cons: [
            'Con 1',
            'Con 2'
        ],
        verdict: 'Final thoughts paragraph',
        bestFor: 'Who should buy this'
    },
    */

    // RECOMMENDATION TEMPLATE:
    /*
    {
        type: 'recommendation',
        id: 'article-slug',
        title: 'Best Keyboards for X',
        excerpt: 'One sentence summary',
        date: 'Feb 16, 2024',
        image: 'https://images.unsplash.com/photo-xxxxx',
        intro: 'Introduction paragraph explaining the guide',
        recommendations: [
            {
                name: 'Keyboard Name',
                price: '$XX',
                description: 'Why this keyboard is recommended',
                highlights: [
                    'Feature 1',
                    'Feature 2',
                    'Feature 3'
                ],
                reviewLink: 'review-slug',  // or null if no review
                amazonLink: 'YOUR_AMAZON_LINK'
            },
            // Add more recommendations...
        ],
        verdict: 'Final recommendation paragraph'
    },
    */
];
