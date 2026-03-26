import { Section } from '../layout/Section';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Languages',
    skills: ['JavaScript', 'TypeScript', 'Python', 'Solidity', 'SQL', 'HTML/CSS'],
  },
  {
    title: 'Frontend',
    skills: ['React.js', 'Next.js', 'TailwindCSS', 'Redux', 'Angular.js', 'Vue.js'],
  },
  {
    title: 'Backend & Infrastructure',
    skills: ['Node.js', 'FastAPI', 'AWS', 'Docker', 'PostgreSQL', 'MongoDB'],
  },
  {
    title: 'Leadership & Methods',
    skills: ['Agile/Scrum', 'Product Management', 'Mentorship', 'KPI Tracking', 'System Architecture'],
  },
];

export default function Skills() {
  return (
    <Section id="skills" className="py-24">
      <motion.h2
        className="text-3xl md:text-5xl font-bold mb-16 text-white"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-fuchsia-500">.</span>
        Skills & Expertise
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.title}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm hover:bg-white/10 transition-colors"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <h3 className="text-xl font-bold text-violet-300 mb-6 border-b border-violet-500/20 pb-4">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill) => (
                <motion.span
                  key={skill}
                  className="px-4 py-2 bg-violet-500/10 text-gray-200 border border-violet-500/20 rounded-full text-sm font-medium hover:border-violet-400 hover:text-white transition-colors cursor-default"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
