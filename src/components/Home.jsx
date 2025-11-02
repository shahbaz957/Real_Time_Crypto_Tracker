import React, { useEffect, useState } from "react";
import CoinItem from "./subComponents/CoinItem";

function Home() {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => setCoins(data));
  }, [page]);

  return (
    <div className="max-w-6xl mx-auto px-4 mt-10 text-white">
      <h1 className="text-center text-3xl font-bold mb-8 tracking-wide text-blue-600">
        List of Crypto Coins
      </h1>
      <div className="grid grid-cols-6 font-semibold text-black border-b border-black pb-3 mb-3 text-sm uppercase tracking-wider">
        <h2>Symbol</h2>
        <h2>Name</h2>
        <h2>Current Price</h2>
        <h2>Market Cap</h2>
        <h2>Market Rank</h2>
        <h2>Total Supply</h2>
      </div>

      <div className="flex flex-col gap-3">
        {coins.map((item) => (
          <CoinItem
            id={item.id}
            name={item.name}
            symbol={item.symbol}
            cur_prize={item.current_price}
            market_cap={item.market_cap}
            market_rank={item.market_cap_rank}
            supply={item.total_supply}
            image={item.image}
          />
        ))}
      </div>
      <div className="flex justify-center gap-6 mt-8">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-30 rounded-md"
        >
          ⬅ Previous
        </button>
        <span className="text-lg font-semibold">Page {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}

export default Home;
