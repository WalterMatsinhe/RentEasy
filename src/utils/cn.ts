export function cn(...classes: (string | undefined | boolean | Record<string, boolean>)[]): string {
  return classes
    .filter(Boolean)
    .map(cls => {
      if (typeof cls === 'string') return cls
      if (typeof cls === 'object') {
        return Object.entries(cls)
          .filter(([, value]) => value)
          .map(([key]) => key)
          .join(' ')
      }
      return ''
    })
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}
