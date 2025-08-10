export interface LocationSelection {
  provinceId: number
  provinceName: string
  cityId?: number
  cityName?: string
}

const STORAGE_KEY = "location-picker-selection"

/**
 * Retrieves the stored location selection from localStorage
 * @returns The stored location or null if not found or invalid
 */
export function getStoredLocation(): LocationSelection | null {
  if (typeof window === "undefined") return null
  
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

/**
 * Saves the location selection to localStorage
 * @param location The location selection to save
 */
export function saveLocationToStorage(location: LocationSelection): void {
  if (typeof window === "undefined") return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(location))
  } catch {
    // Silently fail if localStorage is not available
  }
}

/**
 * Clears the stored location selection from localStorage
 */
export function clearStoredLocation(): void {
  if (typeof window === "undefined") return
  
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Silently fail if localStorage is not available
  }
}