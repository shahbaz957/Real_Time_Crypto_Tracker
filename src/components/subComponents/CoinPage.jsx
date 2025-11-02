import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

// Now here you gonna use Chart JS and show the complete detail of particular coin
function CoinPage() {
  const [coinDetails, setCoinDetails] = useState(null);
  const [chartDetails, setChartDetails] = useState([]);
  const [days, setDays] = useState(7);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((res) => res.json())
      .then((data) => setCoinDetails(data));

    fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
    )
      .then((res) => res.json())
      .then((data) => setChartDetails(data.prices));
  }, [id, days]);
  if (!coinDetails)
    return <p className="text-center text-gray-400 mt-10">Loading...</p>;

  const chartData = {
    labels: chartDetails.map((item) => {
      const date = new Date(item[0]);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    }),
    datasets: [
      {
        label: `${coinDetails.name} Price (${days} Days)`,
        data: chartDetails.map((item) => item[1]),
        borderColor: "rgba(66, 135, 245, 1)", // blue line
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.35, // smooth curve
      },
    ],
  };
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 text-white">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={coinDetails.image.large}
          alt={coinDetails.name}
          className="w-16 h-16"
        />
        <div>
          <h1 className="text-3xl font-bold">
            {coinDetails.name} ({coinDetails.symbol.toUpperCase()})
          </h1>
          <p className="text-gray-400">Rank #{coinDetails.market_cap_rank}</p>
        </div>
      </div>

      {/* Price Section */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-semibold">
          Current Price ➡️ $
          {coinDetails.market_data.current_price.usd.toLocaleString()}
        </h2>

        <p
          className={`mt-1 font-medium ${
            coinDetails.market_data.price_change_percentage_24h > 0
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {coinDetails.market_data.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>

      {/* Market Info Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400">Market Cap</p>
          <p className="font-semibold">
            ${coinDetails.market_data.market_cap.usd.toLocaleString()}
          </p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400">Circulating Supply</p>
          <p className="font-semibold">
            {coinDetails.market_data.circulating_supply.toLocaleString()}{" "}
            {coinDetails.symbol.toUpperCase()}
          </p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400">Total Supply</p>
          <p className="font-semibold">
            {coinDetails.market_data.total_supply?.toLocaleString() || "—"}
          </p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400">All Time High</p>
          <p className="font-semibold">
            ${coinDetails.market_data.ath.usd.toLocaleString()}
          </p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400">All Time Low</p>
          <p className="font-semibold">
            ${coinDetails.market_data.atl.usd.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="mt-10 bg-gray-800 rounded-xl p-6 border border-gray-700 text-center ">
        <Line
          data={chartData}
          options={{
            plugins: {
              legend: {
                labels: {
                  color: "white", // ← legend text
                },
              },
            },
            scales: {
              x: {
                ticks: {
                  color: "white", // ← x-axis labels
                },
                grid: {
                  color: "rgba(255,255,255,0.2)", // optional soft grid lines
                },
              },
              y: {
                ticks: {
                  color: "white", // ← y-axis labels
                },
                grid: {
                  color: "rgba(255,255,255,0.2)",
                },
              },
            },
          }}
        />
      </div>
      <select
        value={days}
        onChange={(e) => setDays(parseInt(e.target.value))}
        className="mt-8 bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="1">24 Hours</option>
        <option value="7">1 Week</option>
        <option value="30">1 Month</option>
        <option value="180">6 Months</option>
      </select>
    </div>
  );
}

export default CoinPage;
