import { Badge } from "./ui/badge";

export function StockMarketCard() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Stock Market</h3>
        <Badge variant="outline">LIVE</Badge>
      </div>
      <div>
        <div className="flex justify-between">
          <span>NIFTY 50</span>
          <span className="font-bold text-green-600">22,500.35 ▲</span>
        </div>
        <div className="flex justify-between">
          <span>SENSEX</span>
          <span className="font-bold text-red-600">75,100.20 ▼</span>
        </div>
        <div className="flex justify-between">
          <span>NASDAQ</span>
          <span className="font-bold text-green-600">15,800.10 ▲</span>
        </div>
      </div>
    </div>
  );
}
