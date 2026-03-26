# 🛡️ 3D Portfolio Website

A stunning, interactive, and high-performance 3D portfolio website designed to showcase developer skills, professional experience, and creative projects with a modern aesthetic.

---
Live Demo : 
---

## 🌟 Overview

This portfolio is built to leave a lasting impression. It features immersive 3D environments, smooth animations, and a responsive design that works flawlessly across all devices. The project highlights a mastery of modern web technologies like **Three.js**, **React**, and **Tailwind CSS**.

## ✨ Features

- **🌐 Immersive 3D Graphics**: Interactive 3D elements including a nebula particle cloud and floating geometric shapes powered by Three.js and React Three Fiber.
- **📱 Responsive Design**: Fully optimized for mobile, tablet, and desktop screens.
- **🎨 Modern Animations**: Seamless transitions and micro-interactions using Framer Motion.
- **🚀 Featured Work**: Dynamic project showcase with flip animations and demo links.
- **📅 Experience Timeline**: A professional history section with structured milestones.
- **📧 Contact Integration**: Custom contact form with direct links to professional profiles.
- **🖱️ Interactive UI**: Custom cursor, smooth scrollbars, and scroll-to-top functionality.

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **3D Graphics**: [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/), [@react-three/drei](https://github.com/pmndrs/drei)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

## 🚀 Installation & Setup

Follow these steps to get a local copy up and running:

### 1. Clone the Repository
```bash
git clone https://github.com/CodeTitan-ux/Portfolio_Website.git
cd Portfolio_Website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory and add your personal details (refer to `.env.example` if available):
```env
VITE_GITHUB_URL="your_github_link"
VITE_LINKEDIN_URL="your_linkedin_link"
# ... other variables
```

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🎮 Usage

- **Navigation**: Use the navbar to jump to specific sections (About, Experience, Projects, etc.).
- **Interaction**: Hover over 3D elements to see physics-based reactions.
- **Projects**: Click on project cards to view descriptions and launch demos.
- **Scrolling**: Enjoy the smooth, customized scrollbar and the progress indicator at the top.

## 📦 Project Structure

```text
3d-portfolio/
├── public/              # Static assets (images, icons)
├── src/
│   ├── assets/          # Component-specific assets
│   ├── components/      # Main UI and 3D components
│   │   ├── CanvasContainer.tsx    # 3D Scene setup
│   │   ├── NebulaParticleCloud.tsx # Core 3D element
│   │   └── ...
│   ├── App.tsx          # Main application entry
│   ├── index.css        # Global styles & Tailwind
│   └── main.tsx         # Root mounting
├── .env                 # Environment variables
├── vite.config.ts       # Vite configuration
└── package.json         # Scripts and dependencies
```

## 🌐 Deployment

This project is optimized for deployment on **Vercel** or **Netlify**.

1. Connect your GitHub repository to your hosting provider.
2. Add your **Environment Variables** in the provider's dashboard.
3. Use the following build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

## 🤝 Contributing

Contributions are welcome! If you have suggestions for new features or improvements, feel free to fork the repo and create a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

## 📬 Contact Information

**Aman Jambhulkar**  
📧 [amansj15021@gmail.com](mailto:amansj15021@gmail.com)  
🔗 [GitHub](https://github.com/CodeTitan-ux) | [LinkedIn](https://linkedin.com/in/aman-jambhulkar-101233237/) | [Instagram](https://www.instagram.com/aman_jambhulkar8904/)

---
