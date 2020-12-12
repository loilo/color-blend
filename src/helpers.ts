import { ChannelBlender, NoAlphaBlender, RGB, RGBA } from './types'

// Some utility (no actual blend-related algorithms) for color handling

/**
 * Restricts a number to given boundaries
 * @param value The number to restrict
 * @param from  The lower boundary
 * @param to    The upper boundary
 * @return The restricted value
 */
function restrictNumber(value: number, from: number, to: number) {
  return Math.min(Math.max(value || 0, from), to)
}

/**
 * Restricts an { r,g,b,a } color to its boundaries (0..255 color channels, 0..1 alpha channel)
 * @param color The { r,g,b,a } color to restrict
 * @return The restricted color
 */
function restrictColor(color: RGBA): RGBA {
  return {
    r: restrictNumber(color.r, 0, 255),
    g: restrictNumber(color.g, 0, 255),
    b: restrictNumber(color.b, 0, 255),
    a: restrictNumber(color.a, 0, 1)
  }
}

/**
 * Converts a color from unit color channels [0..1] to 8-bit color channels [0..255]
 * @param color The { r,g,b,a } color to convert
 * @return The { r,g,b,a } with 8-bit color channels
 */
export function convertFromUnit(color: RGBA): RGBA
export function convertFromUnit(color: RGB): RGB
export function convertFromUnit(color: any): RGB | RGBA {
  return {
    r: color.r * 255,
    g: color.g * 255,
    b: color.b * 255,
    a: color.a
  }
}

/**
 * Converts a color from 8-bit color channels [0..255] to unit color channels [0..1]
 * @param color The { r,g,b,a } color to convert
 * @return The { r,g,b,a } with unit color channels
 */
export function convertToUnit(color: RGBA): RGBA
export function convertToUnit(color: RGB): RGB
export function convertToUnit(color: any): RGB | RGBA {
  return {
    r: color.r / 255,
    g: color.g / 255,
    b: color.b / 255,
    a: color.a
  }
}

/**
 * Rounds the color channels of an RGBA color
 * @param color     The { r,g,b,a } color to handle
 * @param precision How many decimals? Defaults to 0
 * @return The { r,g,b,a } with rounded color channels
 */
function roundChannels(color: RGBA, precision?: number): RGBA
function roundChannels(color: RGB, precision?: number): RGB
function roundChannels(color: any, precision: number = 0): RGB | RGBA {
  const multiplier = Math.pow(10, precision)

  return {
    r: Math.round(color.r * multiplier) / multiplier,
    g: Math.round(color.g * multiplier) / multiplier,
    b: Math.round(color.b * multiplier) / multiplier,
    a: color.a
  }
}

/**
 * Rounds the color channels of an RGBA color with high precision to aviod IEEE 754 related issues
 * @param color The { r,g,b,a } color to handle
 * @return The { r,g,b,a } with rounded color channels
 */
function roundChannelsBinaryFloat(color: RGBA): RGBA {
  return roundChannels(color, 9)
}

/**
 * Applies the appropriate alpha blending to a blend process.
 * @see https://www.w3.org/TR/compositing-1/#blending
 * @param backdropAlpha  The alpha channel of the backdrop color [0..1]
 * @param sourceAlpha    The alpha channel of the source color [0..1]
 * @param compositeAlpha The alpha channel of the composite color [0..1]
 * @param backdropColor  A color channel (R, G or B) of the backdrop color [0..255]
 * @param sourceColor    A color channel (R, G or B) of the source color [0..255]
 * @param compositeColor A color channel (R, G or B) of the composite color [0..255]
 * @return The resulting color channel
 */
function alphaCompose(
  backdropAlpha: number,
  sourceAlpha: number,
  compositeAlpha: number,
  backdropColor: number,
  sourceColor: number,
  compositeColor: number
) {
  return (
    (1 - sourceAlpha / compositeAlpha) * backdropColor +
    (sourceAlpha / compositeAlpha) *
      Math.round(
        (1 - backdropAlpha) * sourceColor + backdropAlpha * compositeColor
      )
  )
}

export interface BlendOptions {
  unitInput: boolean
  unitOutput: boolean
  roundOutput: boolean
}

/**
 * Blend two colors
 * All RGBA objects are { r,g,b,a } with [0..255] for RGB and [0..1] for alpha
 * @param source               The { r,g,b,a } color to be put on top
 * @param backdrop             The { r,g,b,a } color to be put below the source
 * @param abstractModeCallback The abstract blend mode function (separable vs. non-separable)
 * @param concreteModeCallback The concrete blend mode function (normal, multiply, ...)
 * @param options              The options to apply
 * @return The { r,g,b,a } result object, channel values are not rounded
 */
export function performBlend(
  backdrop: RGBA,
  source: RGBA,
  abstractModeCallback: (
    backdrop: RGBA,
    source: RGBA,
    concreteModeCallback: ChannelBlender
  ) => RGB,
  concreteModeCallback: ChannelBlender,
  options?: Partial<BlendOptions>
): RGBA
export function performBlend(
  backdrop: RGBA,
  source: RGBA,
  abstractModeCallback: (
    backdrop: RGBA,
    source: RGBA,
    concreteModeCallback: NoAlphaBlender
  ) => RGB,
  concreteModeCallback: NoAlphaBlender,
  options?: Partial<BlendOptions>
): RGBA
export function performBlend(
  backdrop: RGBA,
  source: RGBA,
  abstractModeCallback: (
    backdrop: RGBA,
    source: RGBA,
    concreteModeCallback: any
  ) => RGB,
  concreteModeCallback: ChannelBlender | NoAlphaBlender,
  options: Partial<BlendOptions> = {
    unitInput: false,
    unitOutput: false,
    roundOutput: true
  }
) {
  // Handle unit input if needed
  if (options.unitInput) {
    backdrop = convertFromUnit(backdrop)
    source = convertFromUnit(source)
  }

  // Remove out-of-bounds values
  backdrop = restrictColor(backdrop)
  source = restrictColor(source)

  // Calculate resulting alpha
  const a = source.a + backdrop.a - source.a * backdrop.a

  // Calculate resulting RGB
  const resultRGB = abstractModeCallback(backdrop, source, concreteModeCallback)

  // Calculate actual RGBs from backdrop, source and result + alpha values
  // Since blending may result in out-of-bounds color channels, cut those
  let resultRGBA = restrictColor({
    r: alphaCompose(backdrop.a, source.a, a, backdrop.r, source.r, resultRGB.r),
    g: alphaCompose(backdrop.a, source.a, a, backdrop.g, source.g, resultRGB.g),
    b: alphaCompose(backdrop.a, source.a, a, backdrop.b, source.b, resultRGB.b),
    a: a
  })

  // Convert color channels to unit values if needed
  if (options.unitOutput) {
    resultRGBA = convertToUnit(resultRGBA)

    // Round 8-bit color channels if needed
  } else if (options.roundOutput) {
    resultRGBA = roundChannels(resultRGBA)

    // Round anyways to get rid of JavaScript floating point issues
  } else {
    resultRGBA = roundChannelsBinaryFloat(resultRGBA)
  }

  return resultRGBA
}
