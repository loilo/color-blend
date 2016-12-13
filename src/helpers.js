// Some utility (no actual blend-related algorithms) for color handling

/**
 * Restricts a number to given boundaries
 * @param {number} value  The number to restrict
 * @param {number} from   The lower boundary
 * @param {number} to     The upper boundary
 * @return {number}       The restricted value
 */
function restrictNumber (value, from, to) {
  return Math.min(Math.max(value, from), to)
}

module.exports = {
  /**
   * Restricts an { r,g,b,a } color to its boundaries (0..255 color channels, 0..1 alpha channel)
   * @param {object} color  The { r,g,b,a } color to restrict
   * @return {object}       The restricted color
   */
  restrictColor: function (color) {
    return {
      r: restrictNumber(color.r, 0, 255),
      g: restrictNumber(color.g, 0, 255),
      b: restrictNumber(color.b, 0, 255),
      a: restrictNumber(color.a, 0, 1)
    }
  },

  /**
   * Converts a color from unit color channels (0..1) to 8-bit color channels (0..255)
   * @param {object} color  The { r,g,b,a } color to convert
   * @return {object}       The { r,g,b,a } with 8-bit color channels
   */
  convertFromUnit: function (color) {
    return {
      r: color.r * 255,
      g: color.g * 255,
      b: color.b * 255,
      a: color.a
    }
  },

  /**
   * Converts a color from 8-bit color channels (0..255) to unit color channels (0..1)
   * @param {object} color  The { r,g,b,a } color to convert
   * @return {object}       The { r,g,b,a } with unit color channels
   */
  convertToUnit: function (color) {
    return {
      r: color.r / 255,
      g: color.g / 255,
      b: color.b / 255,
      a: color.a
    }
  },

  /**
   * Rounds the color channels of an RGBA color
   * @param {object} color      The { r,g,b,a } color to handle
   * @param {number} precision  How many decimals? Defaults to 0
   * @return {object}           The { r,g,b,a } with rounded color channels
  */
  roundChannels: function (color, precision) {
    if (precision == null) precision = 0

    var multiplier = Math.pow(10, precision)

    return {
      r: Math.round(color.r * multiplier) / multiplier,
      g: Math.round(color.g * multiplier) / multiplier,
      b: Math.round(color.b * multiplier) / multiplier,
      a: color.a
    }
  },

  /**
   * Rounds the color channels of an RGBA color to many decimals to preserve precision but avoiding weird JavaScript floating point issues
   * @param {object} color  The { r,g,b,a } color to handle
   * @return {object}       The { r,g,b,a } with rounded color channels
  */
  roundChannelsForSanity: function (color) {
    return this.roundChannels(color, 9)
  }
}
