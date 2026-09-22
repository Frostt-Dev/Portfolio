<div align="center">
  <img src="./public/favicon.svg" alt="Logo" width="80" height="80">
  <h1 align="center">Krish Chourasia - Portfolio</h1>
  <h3>A Modern, Neo-Brutalist Developer Portfolio & Engineering Showcase</h3>
</div>

<p align="center">
  <a href="https://portfolio-lovat-gamma-12.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/Google_Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white" />
</p>

## ⚡ Overview

A high-performance, interactive portfolio website engineered to showcase full-stack architectures, enterprise AI systems, and frontend design. It features a bold **Neo-Brutalist** design system—combining crisp borders, hard offset shadows, high contrast, and tactile physical feedback with fluid Framer Motion spring physics.

## ✨ Key Features

- **🎨 Neo-Brutalist Design System**: Custom Tailwind tokens for consistent brutalist shadows (`shadow-neo`, `shadow-neo-lg`), robust borders, and sharp typography.
- **🧊 3D Perspective Tilt & Spotlight Sheen**: Interactive project cards that track cursor movement in 3D space with spring dynamics (`useSpring`, `rotateX`, `rotateY`) and a real-time radial spotlight highlight.
- **🔍 Quick View Deep-Dive Modals**: Architecture modals with technical deep dives, engineering highlights, and performance metrics without page reloads.
- **🤖 Built-in AI Assistant**: Interactive chatbot powered by the **Google Gemini API** (`@google/generative-ai`), personalized to discuss Krish's projects, tech stack, and background in real time.
- **🔄 Infinite Tech Marquee**: Continuous smooth-scrolling marquee ribbon paired with interactive category filter tabs for skills and tools.
- **📋 Contact Micro-Interactions**: One-click clipboard copy for email and phone with animated confirmation tags, plus direct WhatsApp and LinkedIn connect pills.
- **📜 Smooth Scrolling**: Integrated **Lenis** momentum scrolling, isolated from modal dialogs via `data-lenis-prevent`.
- **🚀 Staggered Screen Transitions**: Page transition animations and custom curtain loading sequence powered by **Framer Motion**.
- **🌗 Dark / Light Mode**: Instant theme toggle with full CSS variable support.

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend Framework** | React 19, TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS 3.4 |
| **Motion & Physics** | Framer Motion (Spring & 3D Tilt) |
| **Smooth Scrolling** | Lenis |
| **AI Integration** | Google Generative AI (Gemini 2.5 Flash) |
| **Icons** | Lucide React |
| **Forms & Email** | EmailJS |

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Frostt-Dev/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**  
   Create a `.env` file in the root directory:
   ```env
   # EmailJS Configuration
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key

   # Google Gemini API Key (for AI Portfolio Chatbot)
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   The application will start on `http://localhost:5173/`.

5. **Build for Production**
   ```bash
   npm run build
   ```

## 📂 Project Structure

```bash
src/
├── assets/           # Static assets, images, project screenshots, and Resume.pdf
├── components/       # Reusable UI components
│   ├── About.tsx         # Bio, engineering telemetry stats, and architectural pillars
│   ├── Background.tsx    # Floating neo-brutalist geometry and dot matrix grid
│   ├── Chatbot.tsx       # Gemini-powered interactive portfolio AI assistant
│   ├── Contact.tsx       # Contact form with EmailJS & 1-click clipboard micro-interactions
│   ├── CustomCursor.tsx  # Interactive magnetic cursor
│   ├── Education.tsx     # Timeline of academic achievements
│   ├── Footer.tsx        # Social links and copyright
│   ├── Hero.tsx          # Dynamic role ticker, status pill & floating 3D micro-badges
│   ├── LoadingScreen.tsx # Multi-curtain entrance loader
│   ├── Magnetic.tsx      # Cursor-following magnetic component wrapper
│   ├── Navbar.tsx        # Fixed blur navigation with scroll tracking
│   ├── PageTransition.tsx# Staggered curtain route transitions
│   ├── Projects.tsx      # Interactive 3D tilt project cards & Quick View modals
│   ├── ScrollProgress.tsx# Reading progress bar
│   ├── ScrollToTop.tsx   # Lenis-aware route scroll reset
│   └── Skills.tsx        # Infinite marquee tape & categorized skills filter
├── data/
│   └── projects.ts       # Centralized projects data, domains, highlights & stats
├── pages/
│   ├── Home.tsx          # Main landing page
│   └── ProjectsPage.tsx  # Full projects & labs showcase archive
├── utils/
│   └── chatbotPersona.ts # System prompt and context for the AI assistant
├── App.tsx               # Main routing, theme provider & Lenis smooth scroll
├── index.css             # Design tokens, CSS variables & Lenis utilities
└── main.tsx              # React DOM root entry
```

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
