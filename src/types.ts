/**
 * An object representing an RGB color
 */
export interface RGB {
  /**
   * Red channel as an integer from 0 to 255
   */
  r: number

  /**
   * Green channel as an integer from 0 to 255
   */
  g: number

  /**
   * Blue channel as an integer from 0 to 255
   */
  b: number
}

/**
 * An object representing an RGB color with an additional alpha channel
 */
export interface RGBA extends RGB {
  /**
   * Alpha channel as a fraction from 0 to 1
   */
  a: number
}

/**
 * Blends a single color channel of two colors
 */
export type ChannelBlender = (
  backdropChannel: number,
  sourceChannel: number
) => number

/**
 * Blends two RGBA colors into RGBA
 */
export type AlphaBlender = (backdrop: RGBA, source: RGBA) => RGBA

/**
 * Blends two RGB(A) colors into RGB
 */
export type NoAlphaBlender = (backdrop: RGB, source: RGB) => RGB
