export interface RGB {
  r: number
  g: number
  b: number
}

export interface RGBA extends RGB {
  a: number
}

/**
 * Blends a single color channel of two colors
 */
export type ChannelBlender = (backdrop: number, source: number) => number

/**
 * Blends two RGBA colors into RGBA
 */
export type AlphaBlender = (backdrop: RGBA, source: RGBA) => RGBA

/**
 * Blends two RGB(A) colors into RGB
 */
export type NoAlphaBlender = (backdrop: RGB, source: RGB) => RGB
