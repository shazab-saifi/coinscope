export type Coin = {
  id: string;
  name: string;
  image: string;
  current_price: string;
  market_cap: string;
  market_cap_rank: string;
  total_volume: string;
  sparkline_in_7d: {
    price: number[];
  };
  symbol: string;
  price_change_percentage_24h: string;
};

export type TrendingCoin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  rank: number;
  priceUsd: number;
  change24h: number;
};

export type SearchResult = Omit<TrendingCoin, "priceUsd" | "change24h"> & {
  slug: string;
};
