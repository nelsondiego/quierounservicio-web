import { ThemeToggle } from "@/components/theme-toogle";
import { LocationPicker } from "@/components/locations/location-picker";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen w-full relative">
      <div className="absolute top-10 right-10">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-2xl px-6">
        <h1 className="text-4xl font-bold text-center mb-8">
          Quiero Un Servicio
        </h1>

        <LocationPicker />
      </div>
    </div>
  );
}
