import { RGB, RGBA, ChannelBlender } from './types'

/**
 * Blend two colors in a separable way
 *
 * @param {object} backdrop    The RGBA backdrop color
 * @param {object} source      The RGBA source color
 * @param {function} callback  The blend mode callback to apply
 */
export default function separableBlend (backdrop: RGBA, source: RGBA, callback: ChannelBlender): RGB {
  return {
    r: callback(backdrop.r / 255, source.r / 255) * 255,
    g: callback(backdrop.g / 255, source.g / 255) * 255,
    b: callback(backdrop.b / 255, source.b / 255) * 255
  }
}
