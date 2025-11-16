import { useEffect, useMemo, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function Payments(){
  const params = new URLSearchParams(window.location.search)
  const prefill = useMemo(() => ({
    name: params.get('name') || '',
    item: params.get('item') || '',
    price: parseFloat(params.get('price') || '0')
  }), [])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cart, setCart] = useState(prefill.item ? [{ slug: prefill.item, name: prefill.name, price: prefill.price, quantity: 1 }] : [])
  const [status, setStatus] = useState(null)

  function addRandom(){
    setCart(c => [...c, { slug: `item-${Date.now()}`, name: 'Custom Appointment', price: 500, quantity: 1 }])
  }

  async function checkout(){
    try{
      setStatus('processing')
      const res = await fetch(`${API}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: name || 'Guest',
          customer_email: email || 'guest@example.com',
          items: cart
        })
      })
      const data = await res.json()
      setStatus(data)
    }catch(e){
      console.error(e)
      setStatus({ error: 'Checkout failed' })
    }
  }

  const subtotal = cart.reduce((s,i) => s + i.price * i.quantity, 0)

  return (
    <section className="max-w-5xl mx-auto px-6 pt-28 pb-16">
      <h2 className="text-3xl font-semibold mb-6">Secure Checkout</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white rounded-2xl p-6 ring-1 ring-black/10">
          <div className="grid sm:grid-cols-2 gap-4">
            <input className="border rounded-lg px-3 py-2" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
            <input className="border rounded-lg px-3 py-2" placeholder="Email address" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div className="mt-6">
            <h3 className="font-medium mb-2">Order summary</h3>
            <div className="space-y-3">
              {cart.map((i, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div>
                    <p>{i.name}</p>
                    <p className="text-sm text-black/60">${i.price.toLocaleString()} × {i.quantity}</p>
                  </div>
                  <button className="text-sm text-red-600" onClick={()=>setCart(c=>c.filter((_,j)=>j!==idx))}>Remove</button>
                </div>
              ))}
              {cart.length === 0 && (
                <p className="text-black/60">Your cart is empty. Add an item from the collection.</p>
              )}
              <button onClick={addRandom} className="mt-2 text-sm text-black/70 underline">Add concierge appointment ($500)</button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 ring-1 ring-black/10">
          <div className="flex items-center justify-between">
            <p className="text-black/70">Subtotal</p>
            <p className="font-medium">${subtotal.toLocaleString()}</p>
          </div>
          <button onClick={checkout} className="mt-6 w-full px-4 py-3 rounded-full bg-black text-white disabled:opacity-50" disabled={cart.length===0 || status==='processing'}>
            {status==='processing' ? 'Processing…' : 'Confirm Purchase'}
          </button>
          {status && status !== 'processing' && (
            <div className="mt-4 text-sm">
              {status.error ? (
                <p className="text-red-600">{status.error}</p>
              ) : (
                <div className="p-3 rounded-lg bg-green-50 text-green-800">
                  Order confirmed. Reference: {status.order_id} • Total: ${status.subtotal?.toLocaleString?.() || subtotal.toLocaleString()}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
