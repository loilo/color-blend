var helpers = require('./helpers')

/**
 * Applies the appropriate alpha blending to a blend process.
 * @see https://www.w3.org/TR/compositing-1/#blending
 * @param {number} backdropAlpha    The alpha channel of the backdrop color (0..1)
 * @param {number} sourceAlpha      The alpha channel of the source color (0..1)
 * @param {number} compositeAlpha   The alpha channel of the composite color (0..1)
 * @param {number} backdropColor    A color channel (R, G or B) of the backdrop color (0..255)
 * @param {number} sourceColor      A color channel (R, G or B) of the source color (0..255)
 * @param {number} compositeColor   A color channel (R, G or B) of the composite color (0..255)
 * @return {number}                 The resulting color channel
 */
function alphaCompose (backdropAlpha, sourceAlpha, compositeAlpha, backdropColor, sourceColor, compositeColor) {
  return (1 - (sourceAlpha / compositeAlpha)) * backdropColor +
    (sourceAlpha / compositeAlpha) * Math.round((1 - backdropAlpha) * sourceColor +
    backdropAlpha * compositeColor)
}

// The default options used for blending
var options = {
  unitInput: false,
  unitOutput: false,
  roundOutput: true
}

/**
 * Blend two colors
 * All RGBA objects are { r,g,b,a } with 0..255 for RGB and 0..1 for alpha
 * @param {object} source           The { r,g,b,a } color to be put on top
 * @param {object} backdrop         The { r,g,b,a } color to be put below the source
 * @param {string} mode             The blend mode mode as a (camelCase) string
 * @param {function} blendCallback  The callback to use as blend function, basically differentiates separable and non-separable blend modes
 * @return {object}                 The { r,g,b,a } result object, channel values are not rounded
 */
function blend (backdrop, source, mode, blendCallback) {
  // Handle unit input if needed
  if (options.unitInput) {
    backdrop = helpers.convertFromUnit(backdrop)
    source = helpers.convertFromUnit(source)
  }

  // Remove out-of-bounds values
  backdrop = helpers.restrictColor(backdrop)
  source = helpers.restrictColor(source)

  // Calculate result alpha
  var a = source.a + backdrop.a - source.a * backdrop.a

  // Calculate result RGB
  var result = blendCallback(backdrop, source, mode)

  // Calculate actual RGBs from backdrop, source and result + alpha values
  // Since blending may result in out-of-bounds color channels, cut those
  result = helpers.restrictColor({
    r: alphaCompose(backdrop.a, source.a, a, backdrop.r, source.r, result.r),
    g: alphaCompose(backdrop.a, source.a, a, backdrop.g, source.g, result.g),
    b: alphaCompose(backdrop.a, source.a, a, backdrop.b, source.b, result.b),
    a: a
  })

  // Convert to color channels to unit values if needed
  if (options.unitOutput) {
    result = helpers.convertToUnit(result)

  // Round 8-bit color channels if needed
  } else if (options.roundOutput) {
    result = helpers.roundChannels(result)

  // Round anyways to get rid of JavaScript floating point issues
  } else {
    result = helpers.roundChannelsForSanity(result)
  }

  return result
}

// Separable blend function
var separableBlend = require('./separable')

// Non-separable blend function
var nonSeparableBlend = require('./non-separable')

// All the blend mode functions as properties on one object
module.exports = {
  options: options,

  normal: function (backdrop, source) {
    return blend(backdrop, source, 'normal', separableBlend)
  },
  multiply: function (backdrop, source) {
    return blend(backdrop, source, 'multiply', separableBlend)
  },
  screen: function (backdrop, source) {
    return blend(backdrop, source, 'screen', separableBlend)
  },
  overlay: function (backdrop, source) {
    return blend(backdrop, source, 'overlay', separableBlend)
  },
  darken: function (backdrop, source) {
    return blend(backdrop, source, 'darken', separableBlend)
  },
  lighten: function (backdrop, source) {
    return blend(backdrop, source, 'lighten', separableBlend)
  },
  colorDodge: function (backdrop, source) {
    return blend(backdrop, source, 'colorDodge', separableBlend)
  },
  colorBurn: function (backdrop, source) {
    return blend(backdrop, source, 'colorBurn', separableBlend)
  },
  hardLight: function (backdrop, source) {
    return blend(backdrop, source, 'hardLight', separableBlend)
  },
  softLight: function (backdrop, source) {
    return blend(backdrop, source, 'softLight', separableBlend)
  },
  difference: function (backdrop, source) {
    return blend(backdrop, source, 'difference', separableBlend)
  },
  exclusion: function (backdrop, source) {
    return blend(backdrop, source, 'exclusion', separableBlend)
  },
  hue: function (backdrop, source) {
    return blend(backdrop, source, 'hue', nonSeparableBlend)
  },
  saturation: function (backdrop, source) {
    return blend(backdrop, source, 'saturation', nonSeparableBlend)
  },
  color: function (backdrop, source) {
    return blend(backdrop, source, 'color', nonSeparableBlend)
  },
  luminosity: function (backdrop, source) {
    return blend(backdrop, source, 'luminosity', nonSeparableBlend)
  }
}
