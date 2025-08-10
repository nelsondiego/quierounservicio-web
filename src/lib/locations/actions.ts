import { cities } from "./cities";
import { provinces } from "./provinces";

export function getCityInformation(cityId: number): {
  city: string;
  cityId: number;
  province: string;
  provinceId: number;
} | null {
  const city = cities.find((c) => c.id === cityId);
  if (!city) return null;
  const province = provinces.find((p) => p.id === city.province_id);
  if (!province) return null;

  return {
    city: city.name,
    cityId: city.id,
    province: province.name,
    provinceId: province.id,
  };
}

export function getCitiesByProvinceId(provinceId: number) {
  return cities
    .filter((city) => city.province_id === provinceId)
    .sort((a, b) => a.name.localeCompare(b.name));
}
