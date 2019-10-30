import { IColorModel } from '@src/interfaces'

export const updateColors = (colors: IColorModel): void => {
  if (typeof colors !== 'object') return

  Object.entries(colors).map(([key, value]) => {
    document.documentElement.style.setProperty(`--${key}`, value)
  })
}
