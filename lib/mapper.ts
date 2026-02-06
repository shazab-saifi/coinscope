import { Coin, SearchResult, TrendingCoin } from "./types";

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

export function mapTrendingCoins(res: any): TrendingCoin[] {
  return (res.coins ?? []).map((entry: any) => {
    const coin = entry.item;

    return {
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.thumb,
      rank: coin.market_cap_rank,
      priceUsd: coin.data?.price ?? 0,
      change24h: coin.data?.price_change_percentage_24h?.usd ?? 0,
    };
  });
}

export function mapSearchResult(res: any): SearchResult[] {
  return res.coins.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      symbol: item.symbol,
      slug: item.api_symbol,
      image: item.thumb,
    };
  });
}
