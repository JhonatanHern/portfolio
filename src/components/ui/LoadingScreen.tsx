import { motion } from 'framer-motion';

export default function LoadingScreen({ progress = 100 }: { progress?: number }) {
  // If there are no assets to load, three.js might not emit progress updates, so we default to 100 if completed fast.
  const displayProgress = progress === 0 ? 100 : progress; 

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <motion.div
        className="text-4xl md:text-6xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500 mb-8"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        LOADING
      </motion.div>
      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex justify-end"
          initial={{ width: '0%' }}
          animate={{ width: `${displayProgress}%` }}
          transition={{ ease: 'easeOut', duration: 0.2 }}
        >
          <div className="w-10 h-full bg-white/30 blur-sm" />
        </motion.div>
      </div>
      <div className="mt-4 text-violet-400 font-mono text-sm tracking-wider">
        {displayProgress.toFixed(0)}% / INITIALIZING
      </div>
    </motion.div>
  );
}
