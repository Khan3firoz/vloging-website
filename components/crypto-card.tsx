import { Badge } from "./ui/badge";

export function CryptoCard() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Crypto</h3>
        <Badge variant="outline">LIVE</Badge>
      </div>
      <div>
        <div className="flex justify-between">
          <span>Bitcoin</span>
          <span className="font-bold text-green-600">$64,200.50 ▲</span>
        </div>
        <div className="flex justify-between">
          <span>Ethereum</span>
          <span className="font-bold text-red-600">$3,120.10 ▼</span>
        </div>
        <div className="flex justify-between">
          <span>Solana</span>
          <span className="font-bold text-green-600">$145.30 ▲</span>
        </div>
      </div>
    </div>
  );
}
