// ==========================================
// ARTICLES DATABASE
// Two types: "review" and "recommendation"
// ==========================================

const articles = [

    // ── REVIEW EXAMPLE ────────────────────────────────
    {
        type: 'review',
        id: 'keychron-k2-review',
        hot: true,
        title: 'Keychron K2 Review',
        category: 'Wireless 75%',
        excerpt: 'Hot-swap switches, rock-solid wireless, and two weeks of battery in a compact package. The K2 earns its reputation.',
        date: 'Feb 10, 2026',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80',
            'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80',
            'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80'
        ],
        amazonLink: 'YOUR_AMAZON_AFFILIATE_LINK',
        rating: 8.5,
        price: '$89',
        views: 0,

        // ── Sub-scores (each out of 10) ──
        subScores: {
            'Build':     8.5,
            'Typing':    8.0,
            'Wireless':  9.0,
            'Features':  7.5,
            'Value':     9.0,
        },

        // ── Use-case ratings (stars out of 5) ──
        useCases: [
            { icon: '💻', label: 'Work',        stars: 5 },
            { icon: '🎮', label: 'Gaming',       stars: 3 },
            { icon: '✈️', label: 'Travel',       stars: 4 },
            { icon: '👨‍💻', label: 'Programming', stars: 5 },
        ],

        specs: {
            Brand:       'Keychron',
            Switches:    'Gateron Brown (hot-swap)',
            Layout:      '75% — 84 keys',
            Connection:  'Bluetooth 5.1 / USB-C',
            Keycaps:     'ABS double-shot',
            Lighting:    'RGB',
            Battery:     '4,000 mAh (~240 hrs)',
            Weight:      '600 g',
            Dimensions:  '355 × 127 × 40 mm',
            'Hot-swap':  'Yes (version 2+)',
        },

        summary: 'The Keychron K2 is the wireless mechanical keyboard most people should buy. Hot-swappable switches, exceptional battery life, and reliable multi-device support make it an easy recommendation — especially at $89.',

        fullReview: [
            {
                heading: 'Build Quality & Design',
                paragraphs: [
                    'Pick up the K2 and the aluminum frame immediately communicates quality. At 600 g it feels planted without being burdensome, and the chassis shows essentially no flex. Keychron includes two incline levels via fold-out feet, and two sets of keycaps — one Mac, one Windows — with a toggle switch on the side.',
                    'The 75% layout is the sweet spot for most users: you keep dedicated arrow keys and a full function row while shaving meaningful desk space. The only ergonomic caveat is the high profile — if you type for hours, budget $15 for a wrist rest. It makes a real difference.',
                    'Keycaps are where Keychron cut corners. The included ABS double-shots are acceptable out of the box but will develop a greasy shine within a few months of heavy use. Plan to upgrade to PBT at some point — it\'s the one meaningful improvement you can make.'
                ],
                image: null
            },
            {
                heading: 'Typing Experience',
                paragraphs: [
                    'Gateron Browns strike a middle path: tactile enough to feel satisfying without the loud clack that gets you dirty looks in a coffee shop. After three weeks of daily use — programming, writing, the occasional gaming session — they hold up well. The board sounds deeper than you\'d expect from a keyboard in this price range, partly thanks to the aluminum case and partly just good luck.',
                    'Stabilizers are the one sore spot. Stock, the spacebar and shift keys rattle just enough to notice. Ten minutes with some dielectric grease solves it, but that\'s a step most buyers won\'t take. If you\'re picky about acoustic polish, budget the time. For everyone else, it\'s a mild annoyance at worst.',
                    'The hot-swap sockets are legitimately great and something you don\'t often see below $100. Swapping switches is five minutes with the included puller — no soldering iron, no drama. We dropped in Gateron Yellows for gaming and popped the Browns back in for writing. Highly practical.'
                ],
                image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80'
            },
            {
                heading: 'Wireless & Battery',
                paragraphs: [
                    'Bluetooth 5.1 is solid. We paired with a MacBook Pro, Windows desktop, and iPad and switched between all three with a key combination — no dropped connections, no perceptible lag. Bluetooth keyboards aren\'t recommended for competitive gaming, but for everything else, the connection is indistinguishable from wired.',
                    'Battery life is genuinely impressive. Running RGB at half brightness and typing 4–6 hours daily, we charged after 14 days. Turn RGB off and you\'re looking at months. USB-C charging is appreciated; the board also functions fully while plugged in. Only complaint: no battery indicator beyond a low-battery warning.'
                ],
                image: null
            },
            {
                heading: 'Software & Value',
                paragraphs: [
                    'There\'s no desktop software. Every setting — RGB effects, brightness, speed, device switching — is handled through key combinations. This is a deliberate Keychron choice, and it mostly works. Downsides: no macro recording, no per-key RGB programming, no saved profiles. For most users, this isn\'t a problem. Power users who want those features should look at the Q series.',
                    'At $89, the K2 is difficult to beat. Hot-swap sockets, aluminum construction, genuine wireless, and multi-device support — any one of these is a differentiator in this price bracket. Getting all four in one keyboard is rare. The minor compromises (ABS keycaps, stabilizer rattle, no software) are either fixable or ignorable. The K2 earns its reputation.'
                ],
                image: null
            }
        ],

        pros: [
            'Hot-swappable switches — upgrade anytime, no soldering',
            '14-day battery with RGB; months without',
            'Pairs with 3 devices simultaneously',
            'Solid aluminum frame — zero chassis flex',
            'Mac & Windows compatible, toggle on the side',
            'Genuinely great value at $89'
        ],
        cons: [
            'Stabilizer rattle on spacebar/shift (fixable but annoying)',
            'No desktop software — limited RGB customization',
            'ABS keycaps will shine over time',
            'High profile — wrist rest recommended for long sessions',
            'No battery level indicator'
        ],
        verdict: 'The Keychron K2 is the wireless mechanical keyboard most people should buy. It doesn\'t try to be the flashiest or the most feature-packed — it just delivers a reliable, comfortable typing experience with practical wireless features at a price that doesn\'t sting. Upgrade the keycaps when you feel like it, lube the stabs when you feel like it. As-is, it\'s excellent.',
        bestFor: 'Developers and writers who switch between multiple devices, Mac users, anyone wanting wireless freedom, budget-conscious enthusiasts who value hot-swap',
        relatedArticles: ['best-wireless-mechanical-keyboards-2024', 'best-mechanical-keyboards-under-100']
    },


    // ── RECOMMENDATION EXAMPLE ─────────────────────────
    {
        type: 'recommendation',
        id: 'best-wireless-mechanical-keyboards-2024',
        hot: true,
        title: 'Best Wireless Mechanical Keyboards for 2024',
        category: 'Wireless',
        excerpt: 'Cut the cord without sacrificing feel. Our tested picks for every budget, from $65 to $200.',
        date: 'Feb 15, 2024',
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80',
        views: 0,
        intro: 'Wireless mechanical keyboards have finally caught up with their wired counterparts. Modern options deliver reliable, low-latency connections and battery lives measured in weeks. Here are our tested picks across budgets — no filler, just keyboards worth your money.',
        recommendations: [
            {
                name: 'Keychron K2',
                tag: '⭐ Best Overall',
                price: '$89',
                description: 'The wireless keyboard most people should buy. Hot-swap switches, two-week battery, and seamless three-device pairing make this a genuinely practical daily driver. Read our full review for the deep dive.',
                highlights: ['Hot-swappable switches', '14-day battery (RGB on)', 'Pairs with 3 devices', 'Aluminum frame'],
                reviewLink: 'keychron-k2-review',
                amazonLink: 'YOUR_AMAZON_AFFILIATE_LINK'
            },
            {
                name: 'Logitech MX Mechanical',
                tag: 'Best for Office',
                price: '$169',
                description: 'Logitech\'s low-profile mechanical option is the choice for open-plan offices. Quieter than standard mechanicals, excellent software, and smart backlighting that dims when you walk away.',
                highlights: ['Low-profile quiet switches', 'Logi Options+ software', 'Smart backlight', 'Multi-device Easy-Switch'],
                reviewLink: null,
                amazonLink: 'YOUR_AMAZON_AFFILIATE_LINK'
            },
            {
                name: 'Keychron K3',
                tag: 'Best Compact',
                price: '$84',
                description: 'Ultra-slim at 22 mm, the K3 slips into a laptop bag without protest. Low-profile switches keep mechanical feel in a form factor that doesn\'t hog desk space.',
                highlights: ['22 mm slim profile', 'Low-profile switches', '75% layout', 'Long battery life'],
                reviewLink: null,
                amazonLink: 'YOUR_AMAZON_AFFILIATE_LINK'
            }
        ],
        verdict: 'For most people: Keychron K2, no question. Office workers who need quiet: Logitech MX Mechanical. Always traveling: Keychron K3.',
        relatedArticles: ['keychron-k2-review', 'best-mechanical-keyboards-under-100']
    },


    // ── SECOND RECOMMENDATION ─────────────────────────
    {
        type: 'recommendation',
        id: 'best-mechanical-keyboards-under-100',
        title: 'Best Mechanical Keyboards Under $100 (2024)',
        category: 'Budget',
        excerpt: 'Quality mechanical keyboards that prove you don\'t need to spend $200 to type well.',
        date: 'Feb 14, 2024',
        image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80',
        views: 0,
        intro: 'Budget keyboards have never been better. These picks under $100 deliver real mechanical feel, solid build quality, and features that would have cost twice as much two years ago.',
        recommendations: [
            {
                name: 'Royal Kludge RK84',
                tag: '⭐ Best Value',
                price: '$65',
                description: 'Hot-swap switches, wireless, and PBT keycaps at $65. The RK84 shouldn\'t be this good. If you want the most features per dollar in mechanical keyboards, start here.',
                highlights: ['Hot-swappable switches', 'Tri-mode wireless', 'PBT keycaps included', 'RGB'],
                reviewLink: null,
                amazonLink: 'YOUR_AMAZON_AFFILIATE_LINK'
            },
            {
                name: 'Keychron C1',
                tag: 'Best Wired',
                price: '$49',
                description: 'Keychron\'s entry-level wired board delivers hot-swap and Gateron switches for under $50. No wireless to worry about, no compromise on build. Just a good keyboard.',
                highlights: ['Hot-swappable', 'Gateron switches', 'Full size + TKL options', 'Mac/Windows'],
                reviewLink: null,
                amazonLink: 'YOUR_AMAZON_AFFILIATE_LINK'
            },
            {
                name: 'Redragon K552',
                tag: 'Best First Mech',
                price: '$40',
                description: 'Your first mechanical keyboard. TKL layout, metal plate, genuine mechanical switches — all at $40. It won\'t win awards, but it\'ll show you what mechanical is all about.',
                highlights: ['TKL compact design', 'Metal plate construction', 'Mechanical switches', '$40 price'],
                reviewLink: null,
                amazonLink: 'YOUR_AMAZON_AFFILIATE_LINK'
            }
        ],
        verdict: 'For features: RK84. For simplicity and reliability: Keychron C1. First keyboard ever: Redragon K552.',
        relatedArticles: ['keychron-k2-review', 'best-wireless-mechanical-keyboards-2024']
    },

    // ==========================================
    // ADD YOUR NEW ARTICLES BELOW
    // ==========================================

    // REVIEW TEMPLATE:
    /*
    {
        type: 'review',
        id: 'keyboard-name-review',
        hot: false,             // set true for hot badge
        title: 'Keyboard Name Review',
        category: 'Category',
        excerpt: 'One sentence summary of the keyboard for the card',
        date: 'Feb 16, 2024',
        image: 'https://images.unsplash.com/photo-xxxxx',
        images: ['img1.jpg', 'img2.jpg', 'img3.jpg'],  // 3 images for gallery
        amazonLink: 'YOUR_AMAZON_LINK',
        rating: 8.5,
        price: '$XX',
        views: 0,

        subScores: {
            'Build':    8.0,
            'Typing':   8.5,
            'Wireless': 7.0,    // remove if wired only
            'Features': 7.5,
            'Value':    9.0,
        },

        useCases: [
            { icon: '💻', label: 'Work',        stars: 4 },
            { icon: '🎮', label: 'Gaming',       stars: 5 },
            { icon: '✈️', label: 'Travel',       stars: 3 },
            { icon: '👨‍💻', label: 'Programming', stars: 4 },
        ],

        specs: {
            Brand:      'Brand Name',
            Switches:   'Switch Type',
            Layout:     'Full / TKL / 75% / 65% / 60%',
            Connection: 'Wired / Wireless',
            Keycaps:    'PBT / ABS',
            Lighting:   'RGB / White / None',
            Weight:     'XXXg',
        },

        summary: '2-3 sentence overview',

        fullReview: [
            {
                heading: 'Build Quality',
                paragraphs: ['Paragraph 1...', 'Paragraph 2...'],
                image: null   // or 'https://...'
            },
            {
                heading: 'Typing Experience',
                paragraphs: ['Paragraph 1...', 'Paragraph 2...'],
                image: 'https://...'
            },
            // add more sections as needed
        ],

        pros: ['Pro 1', 'Pro 2', 'Pro 3'],
        cons: ['Con 1', 'Con 2'],
        verdict: 'Final verdict paragraph.',
        bestFor: 'Who this keyboard is best for',
        relatedArticles: ['related-id-1', 'related-id-2']
    },
    */

    // GUIDE TEMPLATE:
    /*
    {
        type: 'recommendation',
        id: 'best-keyboards-for-x',
        hot: false,
        title: 'Best Keyboards for X (2024)',
        category: 'Guide category',
        excerpt: 'One sentence summary for the card',
        date: 'Feb 16, 2024',
        image: 'https://images.unsplash.com/photo-xxxxx',
        views: 0,
        intro: 'Opening paragraph explaining the guide and what to expect.',
        recommendations: [
            {
                name: 'Keyboard Name',
                tag: '⭐ Best Overall',   // optional label
                price: '$XX',
                description: '2-3 sentence description of why this keyboard made the list.',
                highlights: ['Feature 1', 'Feature 2', 'Feature 3'],
                reviewLink: 'review-id-if-exists',  // or null
                amazonLink: 'YOUR_AMAZON_LINK'
            },
            // 3-5 recommendations total
        ],
        verdict: 'Final summary recommendation.',
        relatedArticles: ['id1', 'id2']
    },
    */
];
