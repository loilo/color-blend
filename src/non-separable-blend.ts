import { convertFromUnit, convertToUnit } from './helpers'
import { NoAlphaBlender, RGBA } from './types'

/**
 * Blend two colors in a non-separable way
 *
 * @param backdrop The background color as an { r,g,b,a } object
 * @param source   The foreground color as an { r,g,b,a } object
 * @param callback The blend mode callback to apply
 */
export default function nonSeparableBlend(
  backdrop: RGBA,
  source: RGBA,
  callback: NoAlphaBlender
) {
  return convertFromUnit(
    callback(convertToUnit(backdrop), convertToUnit(source))
  )
}
