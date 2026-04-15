import React, { useState, useEffect } from "react";

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

const formatPrice = (val) => {
  if (!val || val === "unknown" || val === "n/a") return "Price unknown";
  const num = parseInt(val.replace(/,/g, ""), 10);
  return isNaN(num) ? "Price unknown" : `${num.toLocaleString()} Credits`;
};

const QuickView = ({ ship, stock, onClose, onAddToCart }) => {
  if (!ship) return null;
  const out = stock <= 0;
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const rows = [
    ["Length",     ship.length !== "unknown" ? `${ship.length}m` : "—"],
    ["Crew",       ship.crew],
    ["Passengers", ship.passengers !== "unknown" && ship.passengers !== "n/a" ? ship.passengers : "—"],
    ["Speed",      ship.max_atmosphering_speed !== "n/a" && ship.max_atmosphering_speed !== "unknown" ? ship.max_atmosphering_speed : "—"],
    ["Hyperdrive", ship.hyperdrive_rating !== "unknown" ? `×${ship.hyperdrive_rating}` : "—"],
    ["Cargo",      ship.cargo_capacity !== "unknown" ? `${parseInt(ship.cargo_capacity).toLocaleString()}kg` : "—"],
    ["MGLT",       ship.MGLT !== "unknown" ? ship.MGLT : "—"],
    ["Films",      `${ship.films.length} appearance${ship.films.length !== 1 ? "s" : ""}`],
  ];

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/60 z-40" />
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-gray-950 border-l border-gray-800 z-50 flex flex-col overflow-y-auto" style={{ animation: "slideIn 0.25s ease" }}>
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800 sticky top-0 bg-gray-950">
          <span className="text-xs text-gray-500 uppercase tracking-widest">Quick View</span>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl px-2">✕</button>
        </div>
        <div className="p-6 flex-1">
          <div className="flex justify-between items-start gap-3 mb-1">
            <h2 className="text-2xl font-bold text-white">{ship.name}</h2>
            <span className="text-xs text-amber-400 border border-amber-400/50 px-2 py-1 rounded-full whitespace-nowrap mt-1">{ship.starship_class}</span>
          </div>
          <p className="text-xs text-gray-500 mb-4">{ship.manufacturer}</p>
          <div className={`inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full mb-6 border ${out ? "text-red-400 bg-red-400/10 border-red-400/30" : stock <= 3 ? "text-amber-400 bg-amber-400/10 border-amber-400/30" : "text-green-400 bg-green-400/10 border-green-400/30"}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {out ? "Out of Stock" : stock <= 3 ? `Only ${stock} left` : `${stock} in stock`}
          </div>
          <div className="grid grid-cols-2 gap-2 mb-6">
            {rows.map(([label, value]) => (
              <div key={label} className="bg-black rounded-lg p-3">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{label}</p>
                <p className="text-sm text-gray-200 font-medium">{value}</p>
              </div>
            ))}
          </div>
          <div className="border-l-2 border-amber-400 pl-4 text-sm text-gray-400 leading-relaxed">
            {ship.pilots.length > 0
              ? `A ${ship.starship_class.toLowerCase()} by ${ship.manufacturer} with ${ship.pilots.length} notable pilot${ship.pilots.length !== 1 ? "s" : ""}.`
              : `A ${ship.starship_class.toLowerCase()} by ${ship.manufacturer}. Cargo: ${ship.cargo_capacity !== "unknown" ? parseInt(ship.cargo_capacity).toLocaleString() + "kg" : "unknown"}.`}
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between gap-4 sticky bottom-0 bg-gray-950">
          <span className="text-amber-400 font-bold text-lg">{formatPrice(ship.cost_in_credits)}</span>
          <button
            onClick={() => !out && onAddToCart(ship)}
            disabled={out}
            className={`flex-1 max-w-[200px] py-2 px-6 rounded-xl font-bold text-sm transition-colors ${out ? "bg-gray-800 text-gray-600 cursor-not-allowed" : "bg-amber-400 hover:bg-amber-300 text-gray-950 cursor-pointer"}`}
          >
            {out ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
      <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
    </>
  );
};

const Ships = ({ onAddToCart, inventory: inventoryProp, setInventory: setInventoryProp }) => {
  const [ships, setShips]               = useState([]);
  const [loading, setLoading]           = useState(true);
  const [page, setPage]                 = useState(1);
  const [totalPages, setTotal]          = useState(1);
  const [quickView, setQuickView]       = useState(null);
  const [sort, setSort]                 = useState("none");
  const [localInventory, setLocalInv]   = useState(shipStock);

  const inventory    = inventoryProp    ?? localInventory;
  const setInventory = setInventoryProp ?? setLocalInv;

  useEffect(() => {
    setLoading(true);
    fetch(`https://swapi.dev/api/starships/?page=${page}`)
      .then((r) => r.json())
      .then((data) => { setShips(data.results); setTotal(Math.ceil(data.count / 10)); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page]);

  const handleAdd = (ship) => {
    const id = parseInt(ship.url.match(/\/(\d+)\/$/)[1]);
    if ((inventory[id] ?? 0) <= 0) return;
    setInventory((p) => ({ ...p, [id]: (p[id] ?? 0) - 1 }));
    if (onAddToCart) onAddToCart(ship);
  };

  const sorted = [...ships].sort((a, b) => {
    if (sort === "none") return 0;
    const pa = parseInt(a.cost_in_credits?.replace(/,/g, "")) || (sort === "high" ? -Infinity : Infinity);
    const pb = parseInt(b.cost_in_credits?.replace(/,/g, "")) || (sort === "high" ? -Infinity : Infinity);
    return sort === "high" ? pb - pa : pa - pb;
  });

  return (
    <div className="bg-gray-950 text-white py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-amber-400 mb-3">Available Ships</h2>
          <p className="text-gray-400">Browse our selection of the galaxy's finest vessels</p>
        </div>
        <div className="flex justify-end gap-2 mb-8">
          {[["none", "Default"], ["high", "Price: High → Low"], ["low", "Price: Low → High"]].map(([val, label]) => (
            <button key={val} onClick={() => setSort(val)}
              className={`px-4 py-1.5 rounded-lg text-sm border transition-colors ${sort === val ? "border-amber-400 text-amber-400 bg-amber-400/10" : "border-gray-700 text-gray-400 hover:border-amber-400 hover:text-amber-400"}`}
            >{label}</button>
          ))}
        </div>{loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sorted.map((ship) => {
                const id    = parseInt(ship.url.match(/\/(\d+)\/$/)[1]);
                const stock = inventory[id] ?? 0;
                const out   = stock <= 0;
                return (
                  <div key={ship.url} className={`bg-black rounded-2xl border border-amber-400 transition-all duration-300 hover:-translate-y-1 flex flex-col ${out ? "opacity-60" : ""}`}>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-xl font-bold text-white">{ship.name}</h3>
                        <span className="text-xs text-amber-400 uppercase tracking-widest border border-amber-400/50 px-2 py-1 rounded-full ml-2 whitespace-nowrap">{ship.starship_class}</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-3">{ship.manufacturer}</p>
                      <div className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full mb-4 border w-fit ${out ? "text-red-400 bg-red-400/10 border-red-400/30" : stock <= 3 ? "text-amber-400 bg-amber-400/10 border-amber-400/30" : "text-green-400 bg-green-400/10 border-green-400/30"}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {out ? "Out of Stock" : stock <= 3 ? `Only ${stock} left` : `${stock} in stock`}
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {[
                          ["Length",     ship.length !== "unknown" ? `${ship.length}m` : "—"],
                          ["Crew",       ship.crew],
                          ["Speed",      ship.max_atmosphering_speed !== "n/a" && ship.max_atmosphering_speed !== "unknown" ? ship.max_atmosphering_speed : "N/A"],
                          ["Hyperdrive", ship.hyperdrive_rating !== "unknown" ? `×${ship.hyperdrive_rating}` : "—"],
                          ["Passengers", ship.passengers !== "unknown" && ship.passengers !== "n/a" ? ship.passengers : "—"],
                          ["Cargo",      ship.cargo_capacity !== "unknown" ? `${parseInt(ship.cargo_capacity).toLocaleString()}kg` : "—"],
                        ].map(([label, value]) => (
                          <div key={label} className="bg-gray-950 rounded-lg p-2">
                            <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
                            <p className="text-sm text-gray-200 font-medium">{value}</p>
                          </div>
                        ))}
                      </div>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {ship.pilots.length > 0
                          ? `Notable pilots: ${ship.pilots.length} recorded. A ${ship.starship_class.toLowerCase()} built by ${ship.manufacturer}.`
                          : `A ${ship.starship_class.toLowerCase()} built by ${ship.manufacturer}.`}
                      </p>
                      <div className="mt-auto flex items-center justify-between gap-2">
                        <span className="text-amber-400 font-semibold text-sm">{formatPrice(ship.cost_in_credits)}</span>
                        <div className="flex gap-2">
                          <button onClick={() => setQuickView(ship)}
                            className="px-3 py-1.5 rounded-lg border border-gray-700 text-gray-400 text-sm hover:border-amber-400 hover:text-amber-400 transition-colors"
                          >Quick View</button>
                          <button onClick={() => handleAdd(ship)} disabled={out}
                            className={`px-4 py-1.5 rounded-xl font-bold text-sm transition-colors ${out ? "bg-gray-800 text-gray-600 cursor-not-allowed" : "bg-amber-400 hover:bg-amber-300 text-gray-950"}`}
                          >{out ? "Out of Stock" : "Add to Cart"}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center items-center gap-4 mt-12">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                className="px-4 py-2 rounded-xl border border-amber-400 text-gray-300 disabled:opacity-30 hover:text-amber-400 transition-colors"
              >Previous</button>
              <span className="text-gray-400">Page {page} of {totalPages}</span>
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="px-4 py-2 rounded-xl border border-gray-600 text-gray-300 disabled:opacity-30 hover:border-amber-400 hover:text-amber-400 transition-colors"
              >Next</button>
            </div>
          </>
        )}
      </div>
      <QuickView
        ship={quickView}
        stock={quickView ? (inventory[parseInt(quickView.url.match(/\/(\d+)\/$/)[1])] ?? 0) : 0}
        onClose={() => setQuickView(null)}
        onAddToCart={handleAdd}
      />
    </div>
  );
};

export default Ships;