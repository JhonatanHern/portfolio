import { Section } from '../layout/Section';
import { motion } from 'framer-motion';

const experiences = [
  {
    company: 'HyperCycle.AI',
    role: 'Engineering Manager & Full Stack Developer',
    period: 'April 2024 – Present',
    description: [
      'Managing the end-to-end lifecycle of 20+ products and services, coordinating between stakeholders and engineering teams.',
      'Developed critical infrastructure fixes for Ethereum mainnet applications, preventing potential high-value fund losses.',
      'Architected and migrated legacy AWS infrastructure, resulting in a 30% reduction in monthly operational costs.',
      'Lead code reviews and technical grooming sessions to maintain high standards and mentor junior developers.',
    ],
  },
  {
    company: 'Fr0ntierX',
    role: 'Senior Full Stack Developer',
    period: 'Jan 2023 – Oct 2023',
    description: [
      'Developed high-performance Web3 dashboards using Next.js and TypeScript, focusing on seamless UX and real-time data.',
      'Collaborated on the architecture of Layer 2 scaling solutions, ensuring low-latency interactions for thousands of users.',
    ],
  },
  {
    company: 'AllianceBlock',
    role: 'Blockchain & Backend Developer',
    period: 'June 2021 – Aug 2022',
    description: [
      'Built and deployed complex automated market maker (AMM) logic and liquidity mining protocols.',
      'Integrated backend services with React-based frontends, ensuring 100% test coverage for mission-critical modules.',
    ],
  },
  {
    company: 'EYSS',
    role: 'Engineering Lead / Manager',
    period: 'Aug 2018 – June 2021',
    description: [
      'Led a team of 5+ developers in the design and execution of corporate web platforms and Holochain experiments.',
      'Implemented Agile methodologies and CI/CD pipelines, increasing team deployment frequency by 40%.',
      'Acted as primary technical point of contact for international clients, translating business requirements into roadmaps.',
    ],
  },
  {
    company: 'Freelance Software Engineer',
    role: 'Full Stack Developer',
    period: 'June 2016 – Present',
    description: [
      'Scaled database architectures for high-traffic applications supporting over 1 million users.',
      'Delivered 20+ custom software solutions globally, from FinTech startups to e-commerce platforms.',
    ],
  },
];

export default function Experience() {
  return (
    <Section id="experience" className="py-24">
      <motion.h2 
        className="text-3xl md:text-5xl font-bold mb-12 text-white"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        Experience
        <span className="text-violet-500">.</span>
      </motion.h2>

      <div className="space-y-8 pl-4 md:pl-0">
        {experiences.map((exp, index) => (
          <motion.div 
            key={index}
            className="relative border-l-2 border-violet-500/30 pl-8 md:pl-10 py-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="absolute w-4 h-4 rounded-full bg-violet-500 -left-[9px] top-10 shadow-[0_0_10px_rgba(139,92,246,0.6)]" />
            <div className="bg-[#050505]/70 backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl hover:bg-white/[0.02] transition-colors">
              <h3 className="text-2xl font-bold text-gray-100">{exp.role}</h3>
              <div className="text-violet-400 font-medium text-lg mb-1">{exp.company}</div>
              <div className="text-gray-500 text-sm mb-5">{exp.period}</div>
              <ul className="list-disc leading-relaxed text-gray-300 space-y-2 ml-4">
                {exp.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
