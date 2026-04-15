// src/App.jsx
import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Ships from "./components/Ships/Ships";

const shipStock = {
  2:  5,  3:  3,  5:  8,  6:  1,  7:  4,
  8:  6,  9:  2,  10: 3,  11: 7,  12: 10,
  13: 5,  14: 12, 15: 2,  17: 4,  21: 6,
  22: 5,  23: 8,  27: 1,  28: 1,  29: 3,
  39: 9,  40: 7,  41: 6,  43: 3,  47: 2,
  48: 5,  49: 4,  52: 8,  58: 6,  59: 10,
  61: 7,  63: 9,  64: 4,  65: 3,  66: 5,
  68: 6,  74: 7,  75: 8,
};

const App = () => {
  const [cart, setCart]           = useState([]);
  const [cartOpen, setCartOpen]   = useState(false);
  const [inventory, setInventory] = useState(shipStock);

  const addToCart = (ship) => {
    const id = parseInt(ship.url.match(/\/(\d+)\/$/)[1]);
    if ((inventory[id] ?? 0) <= 0) return;
    setInventory((prev) => ({ ...prev, [id]: prev[id] - 1 }));
    setCart((prev) => {
      const existing = prev.find((i) => i.url === ship.url);
      return existing
        ? prev.map((i) => i.url === ship.url ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { ...ship, qty: 1 }];
    });
  };

  const removeFromCart = (url) => {
    const item = cart.find((i) => i.url === url);
    const id   = parseInt(url.match(/\/(\d+)\/$/)[1]);
    setInventory((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + item.qty }));
    setCart((prev) => prev.filter((i) => i.url !== url));
  };

  const total = cart.reduce((sum, item) => {
    const n = parseInt((item.cost_in_credits || "").replace(/,/g, ""), 10);
    return sum + (isNaN(n) ? 0 : n) * item.qty;
  }, 0);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="bg-gray-950 min-h-screen">
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <Hero />
      <Ships onAddToCart={addToCart} inventory={inventory} setInventory={setInventory} />

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex justify-end" onClick={() => setCartOpen(false)}>
          <div className="w-[350px] bg-gray-900 h-full p-6 overflow-y-auto border-l border-amber-400/20" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-amber-400">Your Cart</h2>
              <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-white text-2xl">✕</button>
            </div>
            {cart.length === 0 ? (
              <p className="text-gray-500 text-sm">Your cart is empty.</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.url} className="flex justify-between items-start mb-4 border-b border-gray-700 pb-4">
                    <div>
                      <p className="text-white font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500 mb-1">Qty: {item.qty}</p>
                      <p className="text-amber-400 text-sm">
                        {(parseInt((item.cost_in_credits || "").replace(/,/g, ""), 10) * item.qty).toLocaleString()} Credits
                      </p>
                    </div>
                    <button onClick={() => removeFromCart(item.url)} className="text-red-400 hover:text-red-300 text-sm">Remove</button>
                  </div>
                ))}
                <div className="mt-6 border-t border-gray-700 pt-4">
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-400">Total</span>
                    <span className="text-amber-400 font-bold">{total.toLocaleString()} Credits</span>
                  </div>
                  <button className="w-full bg-amber-400 text-gray-950 font-bold py-3 rounded-full hover:bg-amber-300 transition-all duration-200">
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;