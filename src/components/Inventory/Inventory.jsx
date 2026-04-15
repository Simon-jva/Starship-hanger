// src/components/Inventory/Inventory.jsx
import React from "react";

const Inventory = ({ inventory }) => {
  const entries = Object.entries(inventory).sort((a, b) => b[1] - a[1]);
  const total   = Object.values(inventory).reduce((s, v) => s + v, 0);
  const out     = entries.filter(([, v]) => v === 0).length;
  const low     = entries.filter(([, v]) => v > 0 && v <= 3).length;

  const statusColor = (qty) => {
    if (qty === 0)  return { text: "text-red-400",   bg: "bg-red-400/10",   border: "border-red-400/30",   label: "Out of Stock" };
    if (qty <= 3)  return { text: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/30", label: `${qty} left` };
    return               { text: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/30", label: `${qty} in stock` };
  };
  return (
    <div className="bg-gray-950 text-white min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-4xl">

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-amber-400 mb-2">Inventory</h1>
          <p className="text-gray-500">Live stock levels across the hangar</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            ["Total Units",   total,              "text-amber-400"],
            ["Low Stock",     low,                "text-amber-400"],
            ["Out of Stock",  out,                "text-red-400"],
          ].map(([label, value, color]) => (
            <div key={label} className="bg-black border border-gray-800 rounded-2xl p-5">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{label}</p>
              <p className={`text-3xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>
        <div className="bg-black border border-gray-800 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-6 py-3 border-b border-gray-800 text-xs text-gray-500 uppercase tracking-widest">
            <span>Ship ID</span>
            <span className="text-right">Units</span>
            <span className="text-right">Status</span>
          </div>
          {entries.map(([id, qty]) => {
            const s = statusColor(qty);
            return (
              <div key={id} className="grid grid-cols-[1fr_auto_auto] gap-4 items-center px-6 py-4 border-b border-gray-900 last:border-0 hover:bg-gray-900/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#fbbf24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l-7-7 1.5-1.5L12 16l5.5-5.5 4 4L19 17l-7 2zm0 0V5m0 0L8 9m4-4l4 4" />
                    </svg>
                  </div>
                  <span className="text-gray-300 font-medium">Ship #{id}</span>
                </div>
                <span className={`text-right font-bold ${s.text}`}>{qty}</span>
                <span className={`text-xs font-medium px-3 py-1 rounded-full border ${s.text} ${s.bg} ${s.border}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Inventory;