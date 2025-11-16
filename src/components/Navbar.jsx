import { Menu, ShoppingBag, Search } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/60 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-semibold tracking-widest text-gray-900 text-xl">
          ROLEX
        </Link>
        <nav className="hidden md:flex gap-8 text-sm">
          <NavLink to="/" className={({isActive}) => `hover:text-black/80 ${isActive ? 'text-black' : 'text-black/60'}`}>Home</NavLink>
          <NavLink to="/catalog" className={({isActive}) => `hover:text-black/80 ${isActive ? 'text-black' : 'text-black/60'}`}>Collection</NavLink>
          <NavLink to="/blog" className={({isActive}) => `hover:text-black/80 ${isActive ? 'text-black' : 'text-black/60'}`}>Journal</NavLink>
          <NavLink to="/payments" className={({isActive}) => `hover:text-black/80 ${isActive ? 'text-black' : 'text-black/60'}`}>Payments</NavLink>
        </nav>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-black/5"><Search size={18}/></button>
          <Link to="/payments" className="p-2 rounded-full hover:bg-black/5"><ShoppingBag size={18}/></Link>
          <button className="md:hidden p-2 rounded-full hover:bg-black/5"><Menu size={18}/></button>
        </div>
      </div>
    </header>
  )
}
