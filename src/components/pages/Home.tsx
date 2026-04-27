import { lazy, Suspense } from 'react';
import Hero from '../sections/Hero';

const About = lazy(() => import('../sections/About'));
const Experience = lazy(() => import('../sections/Experience'));
const Skills = lazy(() => import('../sections/Skills'));
const Education = lazy(() => import('../sections/Education'));

export default function Home() {
  return (
    <main className="relative z-10 w-full max-w-7xl mx-auto flex flex-col">
      <Hero />
      <Suspense fallback={null}>
        <About />
        <Experience />
        <Skills />
        <Education />
      </Suspense>
    </main>
  );
}
