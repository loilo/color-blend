/**
 * Algorithms for non-separable blend modes (based on HSV/HSL color space)
 * @see https://www.w3.org/TR/compositing-1/#blendingnonseparable
 */
var helpers = require('./helpers')

// Helper functions are not commented since their mostly literally taken from the document linked above
var blendHelpers = {
  lum: function (rgb) {
    return 0.3 * rgb.r + 0.59 * rgb.g + 0.11 * rgb.b
  },

  clipColor: function (rgb) {
    var l = this.lum(rgb)
    var n = Math.min(rgb.r, rgb.g, rgb.b)
    var x = Math.max(rgb.r, rgb.g, rgb.b)

    var result = {
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
  },

  setLum: function (rgb, l) {
    var d = l - this.lum(rgb)

    return this.clipColor({
      r: rgb.r + d,
      g: rgb.g + d,
      b: rgb.b + d
    })
  },

  sat: function (rgb) {
    return Math.max(rgb.r, rgb.g, rgb.b) - Math.min(rgb.r, rgb.g, rgb.b)
  },

  setSat: function (rgb, s) {
    var sortedChannels = Object.keys(rgb).sort(function (a, b) { return rgb[a] - rgb[b] })
    var cMin = sortedChannels[0]
    var cMid = sortedChannels[1]
    var cMax = sortedChannels[2]

    var result = {
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
}

// Compose helper functions into actual blend mode methods
var methods = {
  hue: function (backdrop, source) {
    return blendHelpers.setLum(blendHelpers.setSat(source, blendHelpers.sat(backdrop)), blendHelpers.lum(backdrop))
  },

  saturation: function (backdrop, source) {
    return blendHelpers.setLum(blendHelpers.setSat(backdrop, blendHelpers.sat(source)), blendHelpers.lum(backdrop))
  },

  color: function (backdrop, source) {
    return blendHelpers.setLum(source, blendHelpers.lum(backdrop))
  },

  luminosity: function (backdrop, source) {
    return blendHelpers.setLum(backdrop, blendHelpers.lum(source))
  }
}

// The method to blend two colors in a non-separable mode
module.exports = function (backdrop, source, mode) {
  return helpers.convertFromUnit(methods[mode](helpers.convertToUnit(backdrop), helpers.convertToUnit(source)))
}
