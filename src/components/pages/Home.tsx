import Hero from '../sections/Hero';
import About from '../sections/About';
import Experience from '../sections/Experience';
import Skills from '../sections/Skills';
import Education from '../sections/Education';

export default function Home() {
  return (
    <main className="relative z-10 w-full max-w-7xl mx-auto flex flex-col">
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Education />
    </main>
  );
}
