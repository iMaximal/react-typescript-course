export const getCssVar = (variable: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(`--${variable}`)
}
