import { Badge } from "./ui/badge";

export function MutualFundCard() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Mutual Funds</h3>
        <Badge variant="outline">UPDATE</Badge>
      </div>
      <div>
        <div className="flex justify-between">
          <span>Axis Bluechip</span>
          <span className="font-bold text-green-600">+1.25%</span>
        </div>
        <div className="flex justify-between">
          <span>SBI Small Cap</span>
          <span className="font-bold text-red-600">-0.45%</span>
        </div>
        <div className="flex justify-between">
          <span>HDFC Midcap</span>
          <span className="font-bold text-green-600">+0.78%</span>
        </div>
      </div>
    </div>
  );
}
