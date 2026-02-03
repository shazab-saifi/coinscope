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
