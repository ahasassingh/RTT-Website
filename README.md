# 🏔️ Royal Tour & Travels — Cinematic Editorial Experience

A production-grade, immersive travel editorial website built with a focus on atmospheric depth, premium motion systems, and refined editorial design. This project transforms a standard landing page into a quiet, cinematic journey through misty mountains and rugged landscapes.

![Royal Tour & Travels](https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070)

## 🌟 The Experience

This project is designed to feel like a high-end luxury travel magazine brought to life. It prioritizes **emotional intentionality** over flashy UI, using a monochrome palette and sophisticated motion pacing.

### Key Features

*   **Atmospheric Hero Layering**: A multi-plane composition featuring background mountains, midground typography, and foreground drifting fog for true cinematic depth.
*   **Restrained Parallax System**: Calibrated vertical movement for all major elements to create a sense of scale and immersion without causing motion fatigue.
*   **Editorial Reveal System**: Sequential, staggered entrance animations for text and imagery, following a precise `[0.16, 1, 0.3, 1]` cubic-bezier curve.
*   **Torn Paper Transitions**: High-texture section dividers generated via SVG fractal noise filters to maintain an organic, tactile feel.
*   **Premium Interactions**: 
    *   **Cinematic Custom Cursor**: A dual-state trailing cursor that reacts to interactive elements.
    *   **Momentum Scrolling**: Integrated with **Lenis** for a smooth, buttery scroll experience.
    *   **Editorial Hovers**: Subtle scale, brightness bloom, and bottom-up fill transitions for buttons and cards.

## 🛠️ Technology Stack

*   **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Motion**: [Framer Motion](https://www.framer.com/motion/)
*   **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
*   **Typography**: Bebas Neue (Hero), Cormorant Garamond (Editorial Serif), Manrope (Body)
*   **Components**: Radix UI + Shadcn UI foundations

## 📂 Project Structure

```bash
src/
├── components/       # Premium UI components (Hero, Navbar, EditorialSection, etc.)
├── lib/             # Core utilities (motion variants, Lenis config, Tailwind cn)
├── hooks/           # Specialized React hooks for scroll and motion
├── sections/        # Section-specific logic (legacy reference)
├── App.tsx          # Main application orchestration
└── index.css        # Global design tokens and atmospheric animations
```

## 🚀 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/ahasassingh/RTT-Website.git
    cd RTT-Website
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## 🎨 Aesthetic Guidelines

*   **Tone**: Quiet, cinematic, foggy, slow, premium.
*   **Aesthetics**: Avoid corporate SaaS patterns. Use spacious layouts, textured paper effects, and high-contrast monochrome imagery.
*   **Motion**: Everything must feel heavy and intentional. Never use aggressive scaling or spring-heavy "bouncy" animations.

---

Built with passion for the wild. **Royal Tour & Travels.**
