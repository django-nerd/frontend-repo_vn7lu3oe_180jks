import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Catalog(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load(){
      try{
        const res = await fetch(`${API}/watches`)
        const data = await res.json()
        setItems(data)
      }catch(e){
        console.error(e)
      }finally{
        setLoading(false)
      }
    }
    load()
  }, [])

  if(loading){
    return <div className="py-24 text-center text-black/60">Loading collection…</div>
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-semibold mb-8">Signature Collection</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((w) => (
          <motion.div key={w.slug} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.4}} className="group bg-white rounded-2xl p-4 ring-1 ring-black/10 hover:ring-black/20 shadow-sm">
            <img src={w.image} alt={w.name} className="rounded-xl aspect-[4/3] object-cover"/>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="font-medium">{w.name}</p>
                <p className="text-sm text-black/60">${w.price.toLocaleString()}</p>
              </div>
              <button onClick={() => window.location.href = `/payments?item=${w.slug}&price=${w.price}&name=${encodeURIComponent(w.name)}`} className="px-3 py-2 text-sm rounded-full bg-black text-white">Buy</button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
