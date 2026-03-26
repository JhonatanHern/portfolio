# Jhonatan Hernández - 3D Interactive Portfolio

A high-performance portfolio built with WebGL and React, featuring a deep-space aesthetic, 3D glassmorphism UI, and fluid scroll-based animations.

This repository serves as a live demonstration of rapid, AI-assisted development workflows—showcasing how complex 3D architectures and scalable React frontends can be shipped at 10x velocity without compromising on clean code or performance.

## Tech Stack

- **Framework**: [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **3D Graphics & WebGL**: 
  - [Three.js](https://threejs.org/)
  - [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/) 
  - [@react-three/drei](https://github.com/pmndrs/drei)
  - [@react-three/postprocessing](https://docs.pmnd.rs/react-three-fiber/api/postprocessing) (Bloom effects)
- **UI Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Architecture & Features

- **Dynamic 3D Galaxy Background**: Utilizes procedural mathematical distributions alongside `InstancedMesh` logic to render thousands of mixed 3D shapes (Points, Tetrahedrons, Octahedrons, Cubes) seamlessly at 60fps.
- **Custom Loading Sequence**: Leverages native Three.js `useProgress` state to track 3D asset initialization and gracefully transition into the main application.
- **Scroll-Driven Parallax**: Smooth Framer Motion `whileInView` hooks create weightless structural reveals that trigger as the user naturally scrolls.
- **Glassmorphism UI**: Ambient UI card designs achieved through native CSS backdrop diffusion to separate reading layers from the dynamic 3D background.

## Local Development

To run this project locally, execute the following from the root directory:

```bash
# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

Then, open your browser and navigate to the localhost URL provided in your terminal (typically `http://localhost:5173`).
