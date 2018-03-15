/**
 * Algorithms for separable blend modes (i.e. where the same algorithms is applied to each color channel)
 * @see https://www.w3.org/TR/compositing-1/#blendingseparable
 **/

var channelMethods = {
  normal: function (backdrop, source) {
    return source
  },

  multiply: function (backdrop, source) {
    return backdrop * source
  },

  screen: function (backdrop, source) {
    return backdrop + source - (backdrop * source)
  },

  overlay: function (backdrop, source) {
    return this.hardLight(source, backdrop)
  },

  darken: function (backdrop, source) {
    return Math.min(backdrop, source)
  },

  lighten: function (backdrop, source) {
    return Math.min(Math.max(backdrop, source), 1)
  },

  colorDodge: function (backdrop, source) {
    return (backdrop === 0)
      ? 0
      : ((source === 1)
        ? 1
        : Math.min(1, backdrop / (1 - source))
      )
  },

  colorBurn: function (backdrop, source) {
    return (backdrop === 1)
      ? 1
      : ((source === 0)
        ? 0
        : (1 - Math.min(1, (1 - backdrop) / source))
      )
  },

  hardLight: function (backdrop, source) {
    return (source <= 0.5)
      ? this.multiply(backdrop, 2 * source)
      : this.screen(backdrop, 2 * source - 1)
  },

  softLight: function (backdrop, source) {
    return (source <= 0.5)
      ? backdrop - (1 - 2 * source) * backdrop * (1 - backdrop)
      : backdrop + (2 * source - 1) * (((backdrop <= 0.25)
        ? ((16 * backdrop - 12) * backdrop + 4) * backdrop
        : Math.sqrt(backdrop)
      ) - backdrop)
  },

  difference: function (backdrop, source) {
    return Math.abs(backdrop - source)
  },

  exclusion: function (backdrop, source) {
    return backdrop + source - 2 * backdrop * source
  }
}

// The method to blend two colors in a separable mode
module.exports = function (backdrop, source, mode) {
  return {
    r: channelMethods[mode](backdrop.r / 255, source.r / 255) * 255,
    g: channelMethods[mode](backdrop.g / 255, source.g / 255) * 255,
    b: channelMethods[mode](backdrop.b / 255, source.b / 255) * 255
  }
}
