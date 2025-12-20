<div align="center">
  <h1 align="center">Portfolio</h1>
  <h3>A Modern, Neo-Brutalist Developer Portfolio</h3>
</div>

<p align="center">
  <a href="https://portfolio-lovat-gamma-12.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" />
</p>

<br />

## ⚡ Overview

A high-performance, interactive portfolio website capable of attracting potential employers and clients. Built with a focus on **User Experience (UX)**, **Performance**, and **Design Consistency**. The site features a "Neo-Brutalist" aesthetic—combining bold borders, hard shadows, and high contrast with modern smooth animations.

## ✨ Key Features

- **🎨 Neo-Brutalist Design System**: Custom Tailwind config for consistent shadows, borders, and typography.
- **🖱️ Magnetic Navigation**: Custom hook implementation making buttons stick to the cursor for a premium feel.
- **🎭 Page Transitions**: Smooth "curtain" wipe effects between routes using `AnimatePresence`.
- **📜 Smooth Scrolling**: Integrated **Lenis** for momentum-based scrolling, fully synced with React Router.
- **📧 Functional Forms**: Serverless contact form powered by **EmailJS**.
- **🖼️ Optimized Assets**: Localized and compressed images for sub-second load times.
- **🌗 Dark Mode**: Persistent theme toggle with CSS variable-based color mapping.

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 18, TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS 3.4 |
| **Animation** | Framer Motion |
| **Icons** | Lucide React |
| **Scrolling** | Lenis |
| **Form Handling** | EmailJS |

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Frostt-Dev/Portfolio.git
    cd Portfolio
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory:
    ```env
    VITE_EMAILJS_SERVICE_ID=your_service_id
    VITE_EMAILJS_TEMPLATE_ID=your_template_id
    VITE_EMAILJS_PUBLIC_KEY=your_public_key
    ```

4.  **Start Development Server**
    ```bash
    npm run dev
    ```

## 📂 Project Structure

```bash
src/
├── components/        # Reusable UI components (Magnetic, Navbar, Hero...)
├── pages/            # Page layouts (Home, ProjectsPage)
├── assets/           # Static assets and optimized images
├── index.css         # Global styles & Theme variables
└── main.tsx          # Entry point
```

## ⚡ Performance Optimizations

- **Lazy Loading**: Code splitting for larger routes.
- **Asset Optimization**: Replaced heavy external URLs with local WebP/optimized formats.
- **Event Debouncing**: Scroll listeners optimized for 60fps performance.
- **Type Safety**: Full TypeScript strict mode compliance.

## 📄 License
This project is licensed under the **MIT License**.

---


