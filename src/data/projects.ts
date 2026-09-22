import safeGuardImg from '../assets/projects/safeGuard.png';
import ecommerceImg from '../assets/projects/ecommerce.png';
import insightBoardImg from '../assets/projects/insightBoard.png';
import coderagStudioImg from '../assets/projects/coderagStudio.jpg';

export interface Project {
    id: string;
    title: string;
    description: string;
    shortDesc: string;
    tech: string[];
    image: string;
    github: string;
    category: string;
    featured?: boolean;
    domain?: string;
    highlights?: string[];
    stats?: { label: string; value: string }[];
}

export const projects: Project[] = [
    {
        id: 'coderag-studio',
        title: 'CodeRAG Studio',
        shortDesc: 'Enterprise codebase intelligence powered by RAG & Nvidia Nemotron.',
        description: 'A production-grade RAG system for enterprise codebase intelligence. Ingest GitHub repos or local codebases, chunk code with AST-aware splitting, store embeddings in pgvector, and query with Nvidia Nemotron Ultra via OpenRouter. Features real-time streaming chat, multi-repo support, and semantic code search.',
        tech: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'Nvidia Nemotron', 'OpenRouter'],
        image: coderagStudioImg,
        github: 'https://github.com/Frostt-Dev',
        category: 'AI / Backend',
        featured: true,
        domain: 'coderag.ai',
        highlights: [
            'AST-aware syntax chunking for multi-language repos',
            'PostgreSQL + pgvector hybrid cosine similarity search',
            'SSE streaming chat with Nvidia Nemotron Ultra LLM',
            'Semantic repository search & deep code citation',
        ],
        stats: [
            { label: 'Latency', value: '<350ms' },
            { label: 'Parser', value: 'AST' },
            { label: 'Vector Store', value: 'pgvector' },
        ],
    },
    {
        id: 'safeguard',
        title: 'SafeGuard',
        shortDesc: "A comprehensive women's safety platform with live tracking & SOS.",
        description: 'A comprehensive safety platform featuring Fake Call, SOS, Quick Alerts, Live Location Tracking, and a Community Board. Also provides emergency contacts, self-defense videos, and safety guides.',
        tech: ['React', 'Google Maps API', 'Socket.io', 'Node.js', 'Express'],
        image: safeGuardImg,
        github: 'https://github.com/Frostt-Dev/Women-Safety-Web-App---SafeGuard',
        category: 'Full Stack',
        featured: false,
        domain: 'safeguard-sos.app',
        highlights: [
            'Real-time GPS geolocation streaming via WebSockets',
            'One-click emergency SOS broadcast with SMS alerts',
            'Simulated incoming fake call for discreet de-escalation',
            'Community safety board with verified hazard reports',
        ],
        stats: [
            { label: 'Live Sync', value: 'Socket.io' },
            { label: 'Map Engine', value: 'Google Maps' },
            { label: 'Response', value: 'Instant' },
        ],
    },
    {
        id: 'insight-board',
        title: 'Insight Board',
        shortDesc: 'A Power BI-inspired analytics dashboard with premium dark UI.',
        description: 'A sophisticated analytics replica inspired by Microsoft Power BI. Features modern interactive data visualizations, bar charts, and line graphs built with premium dark mode aesthetics and neo-brutalist styling.',
        tech: ['React', 'D3.js', 'Tailwind CSS', 'TypeScript'],
        image: insightBoardImg,
        github: 'https://github.com/Frostt-Dev',
        category: 'Frontend',
        featured: false,
        domain: 'insightboard.io',
        highlights: [
            'Power BI-inspired data dashboard layout & telemetry widgets',
            'High-performance interactive SVG charts powered by D3.js',
            'Dynamic multi-dimensional filtering & time-series breakdown',
            'Custom neo-brutalist dark & light mode theming engine',
        ],
        stats: [
            { label: 'Charts', value: 'D3.js' },
            { label: 'Theme', value: 'Neo-Brutal' },
            { label: 'Render', value: '60 FPS' },
        ],
    },
    {
        id: 'ecommerce-dashboard',
        title: 'E-Commerce Dashboard',
        shortDesc: 'Real-time store management with sales tracking & customer analytics.',
        description: 'A comprehensive dashboard for managing online stores. Features include real-time sales tracking, inventory management, and customer analytics with a clean, performant UI.',
        tech: ['React', 'Tailwind CSS', 'Recharts', 'Node.js'],
        image: ecommerceImg,
        github: 'https://github.com/Frostt-Dev',
        category: 'Full Stack',
        featured: false,
        domain: 'store-analytics.dev',
        highlights: [
            'Real-time sales velocity tracking & revenue projections',
            'Automated low-stock alerts & SKU inventory management',
            'Customer acquisition cohort analytics & churn indicators',
            'Responsive data tables with instant multi-column search',
        ],
        stats: [
            { label: 'Charts', value: 'Recharts' },
            { label: 'State', value: 'Real-time' },
            { label: 'Layout', value: 'Modular' },
        ],
    },
];
