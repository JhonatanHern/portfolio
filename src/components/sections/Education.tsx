import { Section } from '../layout/Section';
import { motion } from 'framer-motion';
import { Award, GraduationCap } from 'lucide-react';

const certifications = [
  'Smart Contract Security & Auditing – Cyfrin Updraft',
  'Advanced MongoDB & Scalable Databases – MongoDB University',
  'English C2 Proficiency (EF SET)',
  'Cypress: Web Automation Testing from Zero to Hero',
  'Program Oracles Using Chainlink. Chainlink Programming 101',
  'Smart contract security – Moralis Academy',
  'Cryptography & Privacy Coins: Bitcoin, Monero, ZCash and more',
  'Smart contract development (EYSS)',
  'Holochain – Dev Camp'
];

export default function Education() {
  return (
    <Section id="education" className="py-24 mb-20">
      <motion.h2 
        className="text-3xl md:text-5xl font-bold mb-12 text-white"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        Education
        <span className="text-violet-500">.</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          className="bg-gradient-to-br from-[#050505] to-[#120a1f] p-8 rounded-2xl border border-violet-500/20 shadow-lg relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 p-6 opacity-20">
            <GraduationCap className="w-24 h-24 text-violet-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Universidad Central de Venezuela</h3>
          <p className="text-violet-400 font-medium mb-4">Bachelor of Science in Computer Science (In Progress)</p>
          <p className="text-gray-400 leading-relaxed">
            Relevant Coursework: Data Structures, Algorithms, Distributed Systems, Database Management.
          </p>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-[#050505] to-[#1a0b1c] p-8 rounded-2xl border border-fuchsia-500/20 shadow-lg relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="absolute top-0 right-0 p-6 opacity-20">
            <Award className="w-24 h-24 text-fuchsia-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-6">Certifications & Awards</h3>
          <ul className="space-y-4">
            {certifications.map((cert, i) => (
              <li key={i} className="flex items-start">
                <span className="text-fuchsia-400 mr-3 mt-1">✦</span>
                <span className="text-gray-300">{cert}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Section>
  );
}
