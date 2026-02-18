// ==========================================
// AFFILIATE CONFIG
// ==========================================
// Set your Amazon affiliate tag once here.
// Every link on the site (cards, articles, on-the-desk) uses this.
//
const AFFILIATE_TAG = 'keyboardhub08-20';

// Helper — builds an Amazon search URL with your tag
function amzSearch(query) {
    return `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=${AFFILIATE_TAG}`;
}

// Helper — builds an Amazon product URL from a full ASIN
// Usage: amzProduct('B09MFMTMPD')
function amzProduct(asin) {
    return `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;
}

// ==========================================
// "ON THE DESK" BOARDS
// All of these become clickable affiliate links in the hero.
// Add/remove boards here. q = the Amazon search query string.
// ==========================================
const ON_DESK_BOARDS = [
    { name: 'Keychron Q1 Pro',                  q: 'Keychron Q1 Pro' },
    { name: 'HHKB Professional Hybrid Type-S',  q: 'HHKB Professional Hybrid Type-S' },
    { name: 'Topre Realforce R2',               q: 'Topre Realforce R2' },
    { name: 'Mode Sonnet',                      q: 'Mode Sonnet keyboard' },
    { name: 'Zoom75',                           q: 'Zoom75 keyboard' },
    { name: 'KBD67 Lite R4',                    q: 'KBD67 Lite keyboard' },
    { name: 'Polaris 60',                       q: 'Polaris 60 keyboard' },
    { name: 'Bakeneko65',                       q: 'Bakeneko65 keyboard' },
    { name: 'Ginkgo65 Pro',                     q: 'Ginkgo65 Pro keyboard' },
    { name: 'Satisfaction75',                   q: 'Satisfaction75 keyboard' },
    { name: 'RAMA WORKS M60-A',                 q: 'RAMA WORKS M60 keyboard' },
    { name: 'Keychron Q5 Max',                  q: 'Keychron Q5 Max' },
    { name: 'Cannonkeys Satisfaction75',        q: 'Cannonkeys Satisfaction75' },
    { name: 'Leopold FC660M',                   q: 'Leopold FC660M' },
    { name: 'Ducky One 3 Mini',                 q: 'Ducky One 3 Mini' },
    { name: 'Varmilo VA87M',                    q: 'Varmilo VA87M' },
    { name: 'Feker IK75 Pro',                   q: 'Feker IK75 Pro' },
    { name: 'QK65 R2',                          q: 'QK65 keyboard' },
    { name: 'Mode Envoy',                       q: 'Mode Envoy keyboard' },
    { name: 'Glacier 80',                       q: 'Glacier 80 keyboard' },
];


// ==========================================
// ARTICLES DATABASE
// Two types: "review" and "recommendation"
//
// For amazonLink, use amzSearch() or amzProduct():
//   amzSearch('Keychron K2')         — pre-queued search
//   amzProduct('B09MFMTMPD')         — direct product link (preferred if you have the ASIN)
// ==========================================

const articles = [

    // ── REVIEW ───────────────────────────────────────────────────
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
        amazonLink: amzSearch('Keychron K2'),
        rating: 8.5,
        price: '$89',
        views: 0,

        subScores: {
            'Build':     8.5,
            'Typing':    8.0,
            'Wireless':  9.0,
            'Features':  7.5,
            'Value':     9.0,
        },

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
            Dimensions:  '355 x 127 x 40 mm',
            'Hot-swap':  'Yes (version 2+)',
        },

        summary: 'The Keychron K2 is the wireless mechanical keyboard most people should buy. Hot-swappable switches, exceptional battery life, and reliable multi-device support make it an easy recommendation at $89.',

        fullReview: [
            {
                heading: 'Build Quality & Design',
                paragraphs: [
                    'Pick up the K2 and the aluminum frame tells you something right away. At 600 g it feels planted without being burdensome, and the chassis shows essentially no flex. Keychron includes two incline levels via fold-out feet, and two sets of keycaps (one Mac, one Windows) with a toggle switch on the side.',
                    'The 75% layout hits the sweet spot for most people: you keep dedicated arrow keys and a full function row while shaving meaningful desk space. The only ergonomic note is the high profile. If you type for hours, budget $15 for a wrist rest. It makes a real difference.',
                    'Keycaps are where Keychron cut corners. The included ABS double-shots are fine out of the box but will develop a greasy shine within a few months of heavy use. Plan to upgrade to PBT at some point. It is the one meaningful improvement you can make.'
                ],
                image: null
            },
            {
                heading: 'Typing Experience',
                paragraphs: [
                    'Gateron Browns strike a middle path: tactile enough to feel satisfying without the loud clack that gets you dirty looks in a coffee shop. After three weeks of daily use (programming, writing, the occasional gaming session), they hold up well. The board sounds deeper than you would expect from a keyboard in this price range, partly thanks to the aluminum case.',
                    'Stabilizers are the one sore spot. Stock, the spacebar and shift keys rattle just enough to notice. Ten minutes with some dielectric grease solves it, but that is a step most buyers will not take. If you are picky about acoustic polish, budget the time. For everyone else, it is a mild annoyance at worst.',
                    'The hot-swap sockets are where the K2 earns its rep. Swapping switches is five minutes with the included puller. No soldering iron, no drama. We dropped in Gateron Yellows for gaming and popped the Browns back in for writing. Highly practical.'
                ],
                image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80'
            },
            {
                heading: 'Wireless & Battery',
                paragraphs: [
                    'Bluetooth 5.1 is solid. We paired with a MacBook Pro, Windows desktop, and iPad and switched between all three with a key combination. No dropped connections, no perceptible lag. Bluetooth keyboards are not ideal for competitive gaming, but for everything else, the connection is indistinguishable from wired.',
                    'Battery life is impressive. Running RGB at half brightness and typing 4-6 hours daily, we charged after 14 days. Turn RGB off and you are looking at months. USB-C charging is appreciated; the board also functions fully while plugged in. Only complaint: no battery indicator beyond a low-battery warning.'
                ],
                image: null
            },
            {
                heading: 'Software & Value',
                paragraphs: [
                    'There is no desktop software. Every setting (RGB effects, brightness, speed, device switching) is handled through key combinations. This is a deliberate Keychron choice, and it mostly works. The downsides: no macro recording, no per-key RGB programming, no saved profiles. For most users, this is not a problem. Power users who want those features should look at the Q series.',
                    'At $89, the K2 is hard to beat. Hot-swap sockets, aluminum construction, genuine wireless, multi-device support. Any one of these is a differentiator in this price bracket. Getting all four in one keyboard is rare. The minor compromises (ABS keycaps, stabilizer rattle, no software) are either fixable or ignorable.'
                ],
                image: null
            }
        ],

        pros: [
            'Hot-swappable switches, upgrade anytime with no soldering',
            '14-day battery with RGB on; months without',
            'Pairs with 3 devices simultaneously',
            'Solid aluminum frame with zero chassis flex',
            'Mac & Windows compatible, toggle on the side',
            'Good value at $89'
        ],
        cons: [
            'Stabilizer rattle on spacebar/shift (fixable but annoying)',
            'No desktop software, limited RGB customization',
            'ABS keycaps will shine over time',
            'High profile, wrist rest recommended for long sessions',
            'No battery level indicator'
        ],
        verdict: 'The Keychron K2 is the wireless mechanical keyboard most people should buy. It does not try to be the flashiest or the most feature-packed. It just delivers a reliable, comfortable typing experience with practical wireless features at a price that does not sting. Upgrade the keycaps when you feel like it, lube the stabs when you feel like it. As-is, it is excellent.',
        bestFor: 'Developers and writers who switch between multiple devices, Mac users, anyone wanting wireless freedom, budget-conscious enthusiasts who value hot-swap',
        relatedArticles: ['best-wireless-mechanical-keyboards-2024', 'best-mechanical-keyboards-under-100']
    },


    // ── RECOMMENDATION ────────────────────────────────────────────
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
        intro: 'Wireless mechanical keyboards have finally caught up with their wired counterparts. Modern options deliver reliable, low-latency connections and battery lives measured in weeks. Here are our tested picks across budgets. No filler, just keyboards worth your money.',
        recommendations: [
            {
                name: 'Keychron K2',
                tag: 'Best Overall',
                price: '$89',
                description: 'The wireless keyboard most people should buy. Hot-swap switches, two-week battery, and seamless three-device pairing make this a practical daily driver. Read our full review for the deep dive.',
                highlights: ['Hot-swappable switches', '14-day battery (RGB on)', 'Pairs with 3 devices', 'Aluminum frame'],
                reviewLink: 'keychron-k2-review',
                amazonLink: amzSearch('Keychron K2')
            },
            {
                name: 'Logitech MX Mechanical',
                tag: 'Best for Office',
                price: '$169',
                description: 'The choice for open-plan offices. Quieter than standard mechanicals, good software, and smart backlighting that dims when you walk away.',
                highlights: ['Low-profile quiet switches', 'Logi Options+ software', 'Smart backlight', 'Multi-device Easy-Switch'],
                reviewLink: null,
                amazonLink: amzSearch('Logitech MX Mechanical')
            },
            {
                name: 'Keychron K3',
                tag: 'Best Compact',
                price: '$84',
                description: 'Ultra-slim at 22 mm, the K3 slips into a laptop bag without protest. Low-profile switches keep mechanical feel in a form factor that does not hog desk space.',
                highlights: ['22 mm slim profile', 'Low-profile switches', '75% layout', 'Long battery life'],
                reviewLink: null,
                amazonLink: amzSearch('Keychron K3')
            }
        ],
        verdict: 'For most people: Keychron K2, no question. Office workers who need quiet: Logitech MX Mechanical. Always traveling: Keychron K3.',
        relatedArticles: ['keychron-k2-review', 'best-mechanical-keyboards-under-100']
    },


    // ── RECOMMENDATION ────────────────────────────────────────────
    {
        type: 'recommendation',
        id: 'best-mechanical-keyboards-under-100',
        title: 'Best Mechanical Keyboards Under $100 (2024)',
        category: 'Budget',
        excerpt: 'Quality mechanical keyboards that prove you do not need to spend $200 to type well.',
        date: 'Feb 14, 2024',
        image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80',
        views: 0,
        intro: 'Budget keyboards have never been better. These picks under $100 deliver real mechanical feel, solid build quality, and features that would have cost twice as much two years ago.',
        recommendations: [
            {
                name: 'Royal Kludge RK84',
                tag: 'Best Value',
                price: '$65',
                description: 'Hot-swap switches, wireless, and PBT keycaps at $65. The RK84 should not be this good. If you want the most features per dollar in mechanical keyboards, start here.',
                highlights: ['Hot-swappable switches', 'Tri-mode wireless', 'PBT keycaps included', 'RGB'],
                reviewLink: null,
                amazonLink: amzSearch('Royal Kludge RK84')
            },
            {
                name: 'Keychron C1',
                tag: 'Best Wired',
                price: '$49',
                description: 'Keychron\'s entry-level wired board delivers hot-swap and Gateron switches for under $50. No wireless to worry about, no compromise on build. Just a good keyboard.',
                highlights: ['Hot-swappable', 'Gateron switches', 'Full size + TKL options', 'Mac/Windows'],
                reviewLink: null,
                amazonLink: amzSearch('Keychron C1')
            },
            {
                name: 'Redragon K552',
                tag: 'Best First Mech',
                price: '$40',
                description: 'A solid first mechanical keyboard. TKL layout, metal plate, genuine mechanical switches, all at $40. It will not win awards, but it will show you what mechanical is all about.',
                highlights: ['TKL compact design', 'Metal plate construction', 'Mechanical switches', '$40 price'],
                reviewLink: null,
                amazonLink: amzSearch('Redragon K552')
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
        hot: false,
        title: 'Keyboard Name Review',
        category: 'Category',
        excerpt: 'One sentence summary for the card.',
        date: 'Feb 16, 2026',
        image: 'https://...',
        images: ['img1.jpg', 'img2.jpg', 'img3.jpg'],
        amazonLink: amzSearch('Keyboard Name'),   // or amzProduct('ASIN')
        rating: 8.5,
        price: '$XX',
        views: 0,
        subScores: { 'Build': 8, 'Typing': 8.5, 'Wireless': 7, 'Features': 7.5, 'Value': 9 },
        useCases: [
            { icon: '💻', label: 'Work',        stars: 4 },
            { icon: '🎮', label: 'Gaming',       stars: 5 },
            { icon: '✈️', label: 'Travel',       stars: 3 },
            { icon: '👨‍💻', label: 'Programming', stars: 4 },
        ],
        specs: { Brand: 'X', Switches: 'Y', Layout: 'Z', Connection: 'W', Keycaps: 'PBT', Lighting: 'RGB', Weight: 'XXXg' },
        summary: '2-3 sentence overview.',
        fullReview: [
            { heading: 'Build Quality', paragraphs: ['...', '...'], image: null },
            { heading: 'Typing Experience', paragraphs: ['...', '...'], image: 'https://...' },
        ],
        pros: ['Pro 1', 'Pro 2'],
        cons: ['Con 1', 'Con 2'],
        verdict: 'Final verdict.',
        bestFor: 'Who this is best for',
        relatedArticles: ['related-id-1', 'related-id-2']
    },
    */

    // GUIDE TEMPLATE:
    /*
    {
        type: 'recommendation',
        id: 'best-keyboards-for-x',
        hot: false,
        title: 'Best Keyboards for X (2026)',
        category: 'Guide category',
        excerpt: 'One sentence summary for the card.',
        date: 'Feb 16, 2026',
        image: 'https://...',
        views: 0,
        intro: 'Opening paragraph.',
        recommendations: [
            {
                name: 'Keyboard Name',
                tag: 'Best Overall',
                price: '$XX',
                description: '2-3 sentences.',
                highlights: ['Feature 1', 'Feature 2'],
                reviewLink: 'review-id-if-exists',
                amazonLink: amzSearch('Keyboard Name'),   // or amzProduct('ASIN')
            },
        ],
        verdict: 'Final summary.',
        relatedArticles: ['id1', 'id2']
    },
    */
];
