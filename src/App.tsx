import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useProgress } from '@react-three/drei';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Scene from './components/3d/Scene';
import LoadingScreen from './components/ui/LoadingScreen';
import Home from './components/pages/Home';
import SecurityToolPage from './components/pages/SecurityToolPage';

function App() {
  const { progress, active } = useProgress();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // When 3D assets are fully loaded (or if none exist to load), transition out instantly
    if (progress === 100 || !active) {
      // Small 300ms buffer to allow the fade transition to trigger nicely
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [progress, active]);

  return (
    <BrowserRouter>
      <AnimatePresence>
        {isLoading && <LoadingScreen progress={progress === 0 && !active ? 100 : progress} />}
      </AnimatePresence>

      <div 
        className={`relative w-full min-h-screen text-white/90 font-sans selection:bg-violet-500/30 transition-opacity duration-1000 ${
          isLoading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'
        }`}
      >
        {/* 3D Background layer */}
        <Scene />
        
        {/* Main Content layer */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/security-tool" element={<SecurityToolPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
