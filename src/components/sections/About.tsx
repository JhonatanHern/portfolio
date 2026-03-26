import { Section } from '../layout/Section';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Code2 } from 'lucide-react';

export default function About() {
  return (
    <Section id="about" className="py-24">
      <motion.div 
        className="max-w-5xl mx-auto flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white text-center">
          Building <span className="text-violet-400">Your Vision</span> Faster.
        </h2>
        
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-16 text-center max-w-3xl">
          I integrate advanced AI coding companions into my development process to drastically reduce your project's lifecycle without sacrificing architectural standards. This approach strikes the perfect balance between <strong className="text-white font-semibold">incredible velocity</strong> and <strong className="text-white font-semibold">rigorous system security</strong>. My goal is simple: to ensure your vision reaches the market flawlessly, backed by clean code you can completely trust.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <motion.div 
            className="bg-[#050505]/60 backdrop-blur-md border border-white/5 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center relative overflow-hidden group"
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Zap className="w-12 h-12 text-fuchsia-400 mb-6" />
            <h3 className="text-xl font-bold text-white mb-3">10x Velocity</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Rapid prototyping and coding execution powered by industry-leading AI models, accelerating your time-to-market.</p>
          </motion.div>

          <motion.div 
            className="bg-[#050505]/60 backdrop-blur-md border border-white/5 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center relative overflow-hidden group"
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <ShieldCheck className="w-12 h-12 text-violet-400 mb-6" />
            <h3 className="text-xl font-bold text-white mb-3">Strict Security</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Every line of generated code is meticulously audited and tested to ensure enterprise-grade security and reliability.</p>
          </motion.div>

          <motion.div 
            className="bg-[#050505]/60 backdrop-blur-md border border-white/5 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center relative overflow-hidden group"
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Code2 className="w-12 h-12 text-blue-400 mb-6" />
            <h3 className="text-xl font-bold text-white mb-3">Clean Architecture</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Speed never sacrifices structure. Systems are built from day one to scale seamlessly alongside your user base.</p>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}
