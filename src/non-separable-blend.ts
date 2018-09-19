import { convertFromUnit, convertToUnit } from './helpers'
import { RGBA, NoAlphaBlender } from './types'

/**
 * Blend two colors in a non-separable way
 *
 * @param {object} backdrop    The RGBA backdrop color
 * @param {object} source      The RGBA source color
 * @param {function} callback  The blend mode callback to apply
 */
export default function nonSeparableBlend (backdrop: RGBA, source: RGBA, callback: NoAlphaBlender) {
  return convertFromUnit(callback(convertToUnit(backdrop), convertToUnit(source)))
}
