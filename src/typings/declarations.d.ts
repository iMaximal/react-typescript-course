declare module '*.styl' {
  const content: { [className: string]: string }
  export = content
}

declare module '*.json' {
  const content: { [key: string]: string } | any
  export = content
}
