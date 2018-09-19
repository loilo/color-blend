/**
 * Algorithms for separable blend modes (i.e. where the same algorithms is applied to each color channel)
 * @see https://www.w3.org/TR/compositing-1/#blendingseparable
 */

// @ts-ignore the unused first parameter to comply with the interface
export function normal (backdrop: number, source: number) {
  return source
}

export function multiply (backdrop: number, source: number) {
  return backdrop * source
}

export function screen (backdrop: number, source: number) {
  return backdrop + source - (backdrop * source)
}

export function overlay (backdrop: number, source: number) {
  return hardLight(source, backdrop)
}

export function darken (backdrop: number, source: number) {
  return Math.min(backdrop, source)
}

export function lighten (backdrop: number, source: number) {
  return Math.min(Math.max(backdrop, source), 1)
}

export function colorDodge (backdrop: number, source: number) {
  return (backdrop === 0)
    ? 0
    : ((source === 1)
      ? 1
      : Math.min(1, backdrop / (1 - source))
    )
}

export function colorBurn (backdrop: number, source: number) {
  return (backdrop === 1)
    ? 1
    : ((source === 0)
      ? 0
      : (1 - Math.min(1, (1 - backdrop) / source))
    )
}

export function hardLight (backdrop: number, source: number) {
  return (source <= 0.5)
    ? multiply(backdrop, 2 * source)
    : screen(backdrop, 2 * source - 1)
}

export function softLight (backdrop: number, source: number) {
  return (source <= 0.5)
    ? backdrop - (1 - 2 * source) * backdrop * (1 - backdrop)
    : backdrop + (2 * source - 1) * (((backdrop <= 0.25)
      ? ((16 * backdrop - 12) * backdrop + 4) * backdrop
      : Math.sqrt(backdrop)
    ) - backdrop)
}

export function difference (backdrop: number, source: number) {
  return Math.abs(backdrop - source)
}

export function exclusion (backdrop: number, source: number) {
  return backdrop + source - 2 * backdrop * source
}
