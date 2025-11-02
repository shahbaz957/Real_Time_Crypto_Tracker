import React from "react";
import { NavLink } from "react-router-dom";

function CoinItem({ id, name, symbol, cur_prize, market_cap, market_rank, supply, image }) {
  return (
    <NavLink 
      to={`/coin/${id}`} 
      className="block"
    >
      <div className="grid grid-cols-6 items-center bg-[#0f111a] p-4 rounded-xl shadow-md">
  {/* Symbol + Image */}
  <div className="flex items-center gap-3">
    <img src={image} alt={name} className="w-8 h-8" />
    <span className="font-semibold text-white">{symbol}</span>
  </div>

  <p className="text-white">{name}</p>
  <p className="text-white">${cur_prize}</p>
  <p className="text-white">${market_cap}</p>
  <p className="text-white">#{market_rank}</p>
  <p className="text-white">{supply}</p>
</div>

    </NavLink>
  );
}

export default CoinItem;
