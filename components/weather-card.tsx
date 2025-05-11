import { Badge } from "./ui/badge";

export function WeatherCard() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Weather</h3>
        <Badge variant="outline">NOW</Badge>
      </div>
      <div>
        <div className="flex justify-between">
          <span>Delhi</span>
          <span className="font-bold">32°C ☀️</span>
        </div>
        <div className="flex justify-between">
          <span>Mumbai</span>
          <span className="font-bold">29°C 🌧️</span>
        </div>
        <div className="flex justify-between">
          <span>Bangalore</span>
          <span className="font-bold">25°C ⛅</span>
        </div>
      </div>
    </div>
  );
}
