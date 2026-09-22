import safeGuardImg from '../assets/projects/safeGuard.png';
import ecommerceImg from '../assets/projects/ecommerce.png';
import insightBoardImg from '../assets/projects/insightBoard.png';
import coderagStudioImg from '../assets/projects/coderagStudio.jpg';

export interface Project {
    title: string;
    description: string;
    shortDesc: string;
    tech: string[];
    image: string;
    github: string;
    category: string;
}

export const projects: Project[] = [
    {
        title: 'CodeRAG Studio',
        shortDesc: 'Enterprise codebase intelligence powered by RAG & Nvidia Nemotron.',
        description: 'A production-grade RAG system for enterprise codebase intelligence. Ingest GitHub repos or local codebases, chunk code with AST-aware splitting, store embeddings in pgvector, and query with Nvidia Nemotron Ultra via OpenRouter. Features real-time streaming chat, multi-repo support, and semantic code search.',
        tech: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'Nvidia Nemotron', 'OpenRouter'],
        image: coderagStudioImg,
        github: 'https://github.com/Frostt-Dev',
        category: 'AI / Backend',
    },
    {
        title: 'SafeGuard',
        shortDesc: "A comprehensive women's safety platform with live tracking & SOS.",
        description: 'A comprehensive safety platform featuring Fake Call, SOS, Quick Alerts, Live Location Tracking, and a Community Board. Also provides emergency contacts, self-defense videos, and safety guides.',
        tech: ['React', 'Google Maps API', 'Socket.io', 'Node.js', 'Express'],
        image: safeGuardImg,
        github: 'https://github.com/Frostt-Dev/Women-Safety-Web-App---SafeGuard',
        category: 'Full Stack',
    },
    {
        title: 'Insight Board',
        shortDesc: 'A Power BI-inspired analytics dashboard with premium dark UI.',
        description: 'A sophisticated analytics replica inspired by Microsoft Power BI. Features modern interactive data visualizations, bar charts, and line graphs built with premium dark mode aesthetics and neo-brutalist styling.',
        tech: ['React', 'D3.js', 'Tailwind CSS', 'TypeScript'],
        image: insightBoardImg,
        github: 'https://github.com/Frostt-Dev',
        category: 'Frontend',
    },
    {
        title: 'E-Commerce Dashboard',
        shortDesc: 'Real-time store management with sales tracking & customer analytics.',
        description: 'A comprehensive dashboard for managing online stores. Features include real-time sales tracking, inventory management, and customer analytics with a clean, performant UI.',
        tech: ['React', 'Tailwind CSS', 'Recharts', 'Node.js'],
        image: ecommerceImg,
        github: 'https://github.com/Frostt-Dev',
        category: 'Full Stack',
    },
];
