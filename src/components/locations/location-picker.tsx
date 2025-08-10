"use client";

import { useState, useEffect, useMemo } from "react";
import { MapPin } from "lucide-react";
import { getCitiesByProvinceId } from "@/lib/locations/actions";
import { type City } from "@/lib/locations/cities";
import { provinces } from "@/lib/locations/provinces";
import {
  type LocationSelection,
  getStoredLocation,
  saveLocationToStorage,
} from "@/lib/location-storage";
import { Combobox, type ComboboxOption } from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LocationPicker() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProvinceId, setSelectedProvinceId] = useState<
    number | undefined
  >();
  const [selectedCityId, setSelectedCityId] = useState<number | undefined>();
  const [cities, setCities] = useState<City[]>([]);

  const initializeLocation = (provinceId: number, cityId?: number) => {
    setSelectedProvinceId(provinceId);
    const citiesData = getCitiesByProvinceId(provinceId);
    setCities(citiesData);

    if (cityId) {
      setSelectedCityId(cityId);
    }
  };

  // Initialize from localStorage or set default values
  useEffect(() => {
    const storedLocation = getStoredLocation();
    const defaultLocation = {
      provinceId: 22,
      provinceName: "Chaco",
      cityId: 1372,
      cityName: "Resistencia",
    };

    const locationToUse = storedLocation?.provinceId
      ? storedLocation
      : defaultLocation;
    initializeLocation(locationToUse.provinceId, locationToUse.cityId);

    // If no stored location exists, save the default location to localStorage
    if (!storedLocation?.provinceId) {
      saveLocationToStorage(defaultLocation);
    }

    setIsLoading(false);
  }, []);

  const provinceOptions: ComboboxOption[] = useMemo(
    () =>
      provinces.map((province) => ({
        value: province.id.toString(),
        label: province.name,
      })),
    []
  );

  const cityOptions: ComboboxOption[] = useMemo(
    () =>
      cities.map((city) => ({
        value: city.id.toString(),
        label: city.name,
      })),
    [cities]
  );

  const handleProvinceChange = (provinceIdStr: string) => {
    const provinceId = parseInt(provinceIdStr);
    setSelectedProvinceId(provinceId);
    setSelectedCityId(undefined);

    const citiesData = getCitiesByProvinceId(provinceId);
    setCities(citiesData);
  };

  const handleCityChange = (cityIdStr: string) => {
    const cityId = parseInt(cityIdStr);
    setSelectedCityId(cityId);
  };

  const saveSelection = () => {
    if (!selectedProvinceId) return;

    const province = provinces.find((p) => p.id === selectedProvinceId);
    const city = cities.find((c) => c.id === selectedCityId);

    const newLocation: LocationSelection = {
      provinceId: selectedProvinceId,
      provinceName: province?.name || "",
      ...(selectedCityId &&
        city && {
          cityId: selectedCityId,
          cityName: city.name,
        }),
    };

    saveLocationToStorage(newLocation);
  };

  //skeleton loading
  if (isLoading) {
    return (
      <Card className="w-full max-w-xs mx-auto">
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-3 w-36" />
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-8 w-full" />
              </div>

              <div className="space-y-1">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>

            <Skeleton className="h-8 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-xs mx-auto">
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Seleccionar ubicación</h3>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="province">Provincia</Label>
              <Combobox
                options={provinceOptions}
                value={selectedProvinceId?.toString() || ""}
                onValueChange={handleProvinceChange}
                placeholder="Selecciona una provincia"
                searchPlaceholder="Buscar provincia..."
                emptyText="No se encontró la provincia."
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="city">Ciudad</Label>
              <Combobox
                options={cityOptions}
                value={selectedCityId?.toString() || ""}
                onValueChange={handleCityChange}
                placeholder={
                  selectedProvinceId
                    ? "Selecciona una ciudad"
                    : "Primero selecciona una provincia"
                }
                searchPlaceholder="Buscar ciudad..."
                emptyText="No se encontró la ciudad."
                disabled={!selectedProvinceId}
              />
            </div>
          </div>

          <Button
            onClick={saveSelection}
            disabled={!selectedProvinceId || !selectedCityId}
            size="sm"
            className="w-full"
          >
            Guardar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
