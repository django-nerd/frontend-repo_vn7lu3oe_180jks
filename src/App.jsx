import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Catalog from './components/Catalog'
import Journal from './components/Journal'
import Payments from './components/Payments'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function App(){
  const navigate = useNavigate()
  useEffect(() => {
    // Seed demo data silently on first load
    fetch(`${API}/seed`, { method: 'POST' }).catch(()=>{})
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
      <Navbar/>
      <Routes>
        <Route index element={<>
          <Hero/>
          <Catalog/>
          <Journal/>
        </>}/>
        <Route path="/catalog" element={<Catalog/>}/>
        <Route path="/blog" element={<Journal/>}/>
        <Route path="/payments" element={<Payments/>}/>
      </Routes>
      <footer className="border-t border-black/10 mt-24">
        <div className="max-w-7xl mx-auto px-6 py-12 text-sm text-black/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} ROLEX — All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-black">Privacy</a>
            <a href="#" className="hover:text-black">Terms</a>
            <a href="#" className="hover:text-black">Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
