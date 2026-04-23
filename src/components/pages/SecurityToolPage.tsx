import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Search, Zap, Code, Mail, Database, Globe, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Section } from '../layout/Section';

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
);

export default function SecurityToolPage() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "Web Scanning Pipeline | Jhonatan Hernández";
    return () => {
      document.title = "Jhonatan Hernández | Portfolio";
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('jhonatanhernandez998@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="relative z-10 w-full max-w-7xl mx-auto flex flex-col pt-24 pb-16 px-6 sm:px-12">
      <Section id="security-tool" className="items-start min-h-[80vh]">
        <motion.div
  // ... omitting the unchanged parts, wait, replace_file_content replaces EVERYTHING between StartLine and EndLine.
  // I should narrow down the StartLine and EndLine, but I need to inject `useState` at the top and the handler inside the component.
  // So I'll just use multi_replace_file_content instead or just replace from the top to bottom.

          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full"
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>

          <h1 className="text-4xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-rose-300 to-violet-400">
            Professional Web Security Scanning
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl leading-relaxed">
            Protect your application before it hits the market. Most recently developed web apps are missing critical security headers and are susceptible to common exploits. An automated, comprehensive pentesting scan is an absolute must.
          </p>
        </motion.div>

        {/* Selling Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black/20 backdrop-blur-md border border-red-500/10 p-8 rounded-2xl"
          >
            <Shield className="w-12 h-12 text-red-400 mb-6" />
            <h3 className="text-2xl font-bold mb-4 text-white">50,000+ Known Vulnerabilities</h3>
            <p className="text-gray-400 leading-relaxed">
              Powered by advanced Nuclei engines, my pipeline automatically tests your app against thousands of CVEs, information disclosures, and specific exploits across all layers of your stack.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-black/20 backdrop-blur-md border border-violet-500/10 p-8 rounded-2xl"
          >
            <Globe className="w-12 h-12 text-violet-400 mb-6" />
            <h3 className="text-2xl font-bold mb-4 text-white">Critical Header Validation</h3>
            <p className="text-gray-400 leading-relaxed">
              Newly shipped web applications frequently forget to implement robust security headers. Our scan ensures your API endpoints and frontend bundles are not exposing your users to generic web attacks.
            </p>
          </motion.div>
        </div>

        {/* Pipeline Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-white">The Scanning Pipeline</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-6 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Search className="w-8 h-8 text-blue-400 shrink-0 mt-1" />
              <div>
                <h4 className="text-xl font-bold text-gray-200 mb-2">1. Subdomain Discovery</h4>
                <p className="text-gray-400">Identifies all available subdomains, DNS records, APIs, and exposed interfaces before proceeding.</p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Code className="w-8 h-8 text-yellow-400 shrink-0 mt-1" />
              <div>
                <h4 className="text-xl font-bold text-gray-200 mb-2">2. Headless Crawling</h4>
                <p className="text-gray-400">Deep crawling using headless browsers. We intercept JavaScript `fetch()` and `XHR` calls to find hidden API endpoints and secret tokens inside JS bundles.</p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Zap className="w-8 h-8 text-rose-400 shrink-0 mt-1" />
              <div>
                <h4 className="text-xl font-bold text-gray-200 mb-2">3. Vulnerability Exploitation</h4>
                <p className="text-gray-400">Employs Automatic Scanning to fingerprint technology and execute relevant exploits, testing for SQLi, LFI, and Zero-days.</p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Database className="w-8 h-8 text-emerald-400 shrink-0 mt-1" />
              <div>
                <h4 className="text-xl font-bold text-gray-200 mb-2">4. Reporting & Evidence</h4>
                <p className="text-gray-400">You receive a high-fidelity report detailing every finding severity, the exact URL, and the exact HTTP Request and Response that triggered the finding.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5 }}
           className="w-full flex flex-col items-center p-8 md:p-12 bg-gradient-to-r from-red-600/10 to-violet-600/10 rounded-3xl border border-white/10 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to secure your product?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl">
            A comprehensive security scan is critical before any major release. Don't wait for your users to discover your vulnerabilities.
          </p>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 w-full max-w-4xl">
            {/* Email Contact */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 bg-black/40 p-2 sm:pl-2 sm:pr-6 rounded-3xl sm:rounded-full border border-white/10 shadow-lg w-full sm:w-auto">
               <a
                  href="mailto:jhonatanhernandez998@gmail.com?subject=Web%20Application%20Security%20Scan%20Inquiry"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.4)]"
               >
                 <Mail className="w-5 h-5 shrink-0" />
                 <span className="whitespace-nowrap">Email Me</span>
               </a>
               <div className="flex flex-row items-center justify-center gap-3 text-gray-300 px-4 py-2 sm:py-0 w-full sm:w-auto mt-2 sm:mt-0">
                 <span className="font-mono text-sm whitespace-nowrap">jhonatanhernandez998@gmail.com</span>
                 <button 
                   onClick={handleCopyEmail}
                   className="hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                   title="Copy Email"
                 >
                   {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                 </button>
               </div>
            </div>

            {/* LinkedIn Contact */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 bg-black/40 p-2 sm:pl-2 sm:pr-6 rounded-3xl sm:rounded-full border border-white/10 shadow-lg w-full sm:w-auto">
              <a
                href="https://www.linkedin.com/in/jhonatanhern/"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#0a66c2] hover:bg-[#0a66c2]/80 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(10,102,194,0.4)]"
              >
                <LinkedinIcon className="w-5 h-5 shrink-0" />
                <span className="whitespace-nowrap">Connect on LinkedIn</span>
              </a>
              <div className="flex flex-row items-center justify-center gap-3 text-gray-300 px-4 py-2 sm:py-0 w-full sm:w-auto mt-2 sm:mt-0">
                <span className="font-mono text-sm hidden sm:inline-block whitespace-nowrap">/in/jhonatanhern</span>
              </div>
            </div>
          </div>
        </motion.div>

      </Section>
    </main>
  );
}
