import { Coin } from "./types";

export function coinMapper(res: any): Coin[] {
  const data = res.map((coin: Coin) => {
    return {
      id: coin.id,
      name: coin.name,
      image: coin.image,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      market_cap_rank: coin.market_cap_rank,
      total_volume: coin.total_volume,
      sparkline_in_7d: coin.sparkline_in_7d,
      symbol: coin.symbol,
      price_change_percentage_24h: coin.price_change_percentage_24h,
    };
  });

  return data;
}
