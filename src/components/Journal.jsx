import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Journal(){
  const [posts, setPosts] = useState([])

  useEffect(() => {
    (async () => {
      try{
        const res = await fetch(`${API}/blog`)
        setPosts(await res.json())
      }catch(e){ console.error(e) }
    })()
  }, [])

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-semibold mb-8">Journal</h2>
      <div className="space-y-8">
        {posts.map(p => (
          <article key={p.slug} className="bg-white rounded-2xl p-6 ring-1 ring-black/10 hover:ring-black/20">
            <div className="grid md:grid-cols-3 gap-6">
              <img src={p.cover_image} alt={p.title} className="rounded-xl aspect-video object-cover"/>
              <div className="md:col-span-2">
                <h3 className="text-xl font-medium">{p.title}</h3>
                <p className="text-black/70 mt-2">{p.excerpt}</p>
                <p className="text-sm text-black/50 mt-2">By {p.author}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
