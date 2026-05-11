export const STORAGE_KEYS = {
  USER: 'hw_user',
  ONBOARDING: 'hw_onboarding',
  BOARD: 'hw_board',
  SAVED_PINS: 'hw_saved_pins',
} as const

export function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage full or unavailable — silently ignore
  }
}

export function clearStorage(): void {
  if (typeof window === 'undefined') return
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key))
}
