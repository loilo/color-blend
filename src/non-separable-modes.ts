/**
 * Algorithms for non-separable blend modes (based on HSV/HSL color space)
 * @see https://www.w3.org/TR/compositing-1/#blendingnonseparable
 */

import { RGB } from './types'

// Helper functions are not commented since their mostly literally taken from the document linked above

function lum (rgb: RGB) {
  return 0.3 * rgb.r + 0.59 * rgb.g + 0.11 * rgb.b
}

function clipColor (rgb: RGB): RGB {
  const l = lum(rgb)
  const n = Math.min(rgb.r, rgb.g, rgb.b)
  const x = Math.max(rgb.r, rgb.g, rgb.b)

  const result = {
    r: rgb.r,
    g: rgb.g,
    b: rgb.b
  }

  if (n < 0) {
    result.r = l + (((result.r - l) * l) / (l - n))
    result.g = l + (((result.g - l) * l) / (l - n))
    result.b = l + (((result.b - l) * l) / (l - n))
  }

  if (x > 1) {
    result.r = l + (((result.r - l) * (1 - l)) / (x - l))
    result.g = l + (((result.g - l) * (1 - l)) / (x - l))
    result.b = l + (((result.b - l) * (1 - l)) / (x - l))
  }

  return result
}

function setLum (rgb: RGB, l: number) {
  const d = l - lum(rgb)

  return clipColor({
    r: rgb.r + d,
    g: rgb.g + d,
    b: rgb.b + d
  })
}

function sat (rgb: RGB) {
  return Math.max(rgb.r, rgb.g, rgb.b) - Math.min(rgb.r, rgb.g, rgb.b)
}

function setSat (rgb: RGB, s: number): RGB {
  const sortedChannels = ['r', 'g', 'b'].sort((a, b) => rgb[a as keyof RGB] - rgb[b as keyof RGB]) as [keyof RGB, keyof RGB, keyof RGB]
  const cMin = sortedChannels[0]
  const cMid = sortedChannels[1]
  const cMax = sortedChannels[2]

  const result = {
    r: rgb.r,
    g: rgb.g,
    b: rgb.b
  }

  if (result[cMax] > result[cMin]) {
    result[cMid] = (((result[cMid] - result[cMin]) * s) / (result[cMax] - result[cMin]))
    result[cMax] = s
  } else {
    result[cMid] = result[cMax] = 0
  }

  result[cMin] = 0

  return result
}

// Compose helper functions into actual blend mode methods

export function hue (backdrop: RGB, source: RGB) {
  return setLum(setSat(source, sat(backdrop)), lum(backdrop))
}

export function saturation (backdrop: RGB, source: RGB) {
  return setLum(setSat(backdrop, sat(source)), lum(backdrop))
}

export function color (backdrop: RGB, source: RGB) {
  return setLum(source, lum(backdrop))
}

export function luminosity (backdrop: RGB, source: RGB) {
  return setLum(backdrop, lum(source))
}
