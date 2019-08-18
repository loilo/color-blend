/**
 * Algorithms for non-separable blend modes (based on HSV/HSL color space)
 * @see https://www.w3.org/TR/compositing-1/#blendingnonseparable
 */

import { RGB } from './types'

/**
 * Get the luminosity of a color
 *
 * @param rgb The color as an { r,g,b } object with each channel as a fraction
 */
function getLuminosity(rgb: RGB) {
  return 0.3 * rgb.r + 0.59 * rgb.g + 0.11 * rgb.b
}

/**
 * Clip the channels of a color
 *
 * @param rgb The color as an { r,g,b } object with each channel as a fraction
 */
function clipColor(rgb: RGB): RGB {
  const luminosity = getLuminosity(rgb)
  let { r, g, b } = rgb

  const lowestChannel = Math.min(r, g, b)
  const highestChannel = Math.max(r, g, b)

  function clipLowest(channel: number) {
    return (
      luminosity +
      ((channel - luminosity) * luminosity) / (luminosity - lowestChannel)
    )
  }

  function clipHighest(channel: number) {
    return (
      luminosity +
      ((channel - luminosity) * (1 - luminosity)) /
        (highestChannel - luminosity)
    )
  }

  if (lowestChannel < 0) {
    r = clipLowest(r)
    g = clipLowest(g)
    b = clipLowest(b)
  }

  if (highestChannel > 1) {
    r = clipHighest(r)
    g = clipHighest(g)
    b = clipHighest(b)
  }

  return { r, g, b }
}

/**
 * Set luminosity on a color
 *
 * @param rgb        The color as an { r,g,b } object with each channel as a fraction
 * @param luminosity The luminosity to apply
 */
function setLuminosity(rgb: RGB, luminosity: number) {
  const delta = luminosity - getLuminosity(rgb)

  return clipColor({
    r: rgb.r + delta,
    g: rgb.g + delta,
    b: rgb.b + delta
  })
}

/**
 * Get the saturation of a color
 *
 * @param rgb The color as an { r,g,b } object with each channel as a fraction
 */
function getSaturation(rgb: RGB) {
  return Math.max(rgb.r, rgb.g, rgb.b) - Math.min(rgb.r, rgb.g, rgb.b)
}

/**
 * Set saturation on a color
 *
 * @param rgb        The color as an { r,g,b } object with each channel as a fraction
 * @param saturation The saturation to apply
 */
function setSaturation(rgb: RGB, saturation: number) {
  const sortedChannels = ['r', 'g', 'b'].sort(
    (a, b) => rgb[a as keyof RGB] - rgb[b as keyof RGB]
  ) as [keyof RGB, keyof RGB, keyof RGB]
  const channelMin = sortedChannels[0]
  const channelMid = sortedChannels[1]
  const channelMax = sortedChannels[2]

  const result = {
    r: rgb.r,
    g: rgb.g,
    b: rgb.b
  }

  if (result[channelMax] > result[channelMin]) {
    result[channelMid] =
      ((result[channelMid] - result[channelMin]) * saturation) /
      (result[channelMax] - result[channelMin])
    result[channelMax] = saturation
  } else {
    result[channelMid] = result[channelMax] = 0
  }

  result[channelMin] = 0

  return result
}

/**
 * Blend two colors with the "hue" blend mode
 *
 * @param backdrop The background color channel as an { r,g,b } object with each channel represented as a fraction
 * @param source   The foreground color channel as an { r,g,b } object with each channel represented as a fraction
 * @return The blended color
 */
export function hue(backdrop: RGB, source: RGB) {
  return setLuminosity(
    setSaturation(source, getSaturation(backdrop)),
    getLuminosity(backdrop)
  )
}

/**
 * Blend two colors with the "saturation" blend mode
 *
 * @param backdrop The background color channel as an { r,g,b } object with each channel represented as a fraction
 * @param source   The foreground color channel as an { r,g,b } object with each channel represented as a fraction
 * @return The blended color
 */
export function saturation(backdrop: RGB, source: RGB) {
  return setLuminosity(
    setSaturation(backdrop, getSaturation(source)),
    getLuminosity(backdrop)
  )
}

/**
 * Blend two colors with the "color" blend mode
 *
 * @param backdrop The background color channel as an { r,g,b } object with each channel represented as a fraction
 * @param source   The foreground color channel as an { r,g,b } object with each channel represented as a fraction
 * @return The blended color
 */
export function color(backdrop: RGB, source: RGB) {
  return setLuminosity(source, getLuminosity(backdrop))
}

/**
 * Blend two colors with the "luminosity" blend mode
 *
 * @param backdrop The background color channel as an { r,g,b } object with each channel represented as a fraction
 * @param source   The foreground color channel as an { r,g,b } object with each channel represented as a fraction
 * @return The blended color
 */
export function luminosity(backdrop: RGB, source: RGB) {
  return setLuminosity(backdrop, getLuminosity(source))
}
