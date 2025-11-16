import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Hero(){
  return (
    <section className="relative overflow-hidden pt-28">
      <div className="absolute inset-0 bg-[radial-gradient(1000px_400px_at_70%_-20%,rgba(0,0,0,0.08),transparent)]" />
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.h1
            initial={{opacity:0,y:10}}
            animate={{opacity:1,y:0}}
            transition={{duration:.6}}
            className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-900">
            Time, Perfected.
          </motion.h1>
          <p className="mt-6 text-lg text-black/70 leading-relaxed">
            Discover a world of horological excellence. Our iconic timepieces blend timeless design with uncompromising performance.
          </p>
          <div className="mt-8 flex gap-4">
            <Link to="/catalog" className="px-5 py-3 rounded-full bg-black text-white hover:bg-black/90">Explore Collection</Link>
            <Link to="/blog" className="px-5 py-3 rounded-full border border-black/20 hover:bg-black/5">Read Journal</Link>
          </div>
        </div>
        <div className="relative">
          <motion.img 
            initial={{opacity:0,scale:.98}}
            animate={{opacity:1,scale:1}}
            transition={{duration:.7, delay:.1}}
            src="https://images.unsplash.com/photo-1548171916-c0dea5c53030?q=80&w=1600&auto=format&fit=crop" 
            alt="Luxury watch" 
            className="rounded-3xl shadow-2xl ring-1 ring-black/10"/>
          <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-white/70 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg flex items-center justify-center text-sm">
            Swiss Crafted
          </div>
        </div>
      </div>
    </section>
  )
}
