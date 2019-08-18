import separableBlend from './separable-blend'
import * as separableBlendModes from './separable-modes'

import nonSeparableBlend from './non-separable-blend'
import * as nonSeparableBlendModes from './non-separable-modes'

import { performBlend } from './helpers'
import { RGBA } from './types'

/**
 * Blend two colors with the "normal" blend mode
 *
 * @param backdrop The background color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @param source   The foreground color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @return The blended color
 */
export function normal(backdrop: RGBA, source: RGBA) {
  return performBlend(
    backdrop,
    source,
    separableBlend,
    separableBlendModes.normal
  )
}

/**
 * Blend two colors with the "multiply" blend mode
 *
 * @param backdrop The background color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @param source   The foreground color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @return The blended color
 */
export function multiply(backdrop: RGBA, source: RGBA) {
  return performBlend(
    backdrop,
    source,
    separableBlend,
    separableBlendModes.multiply
  )
}

/**
 * Blend two colors with the "screen" blend mode
 *
 * @param backdrop The background color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @param source   The foreground color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @return The blended color
 */
export function screen(backdrop: RGBA, source: RGBA) {
  return performBlend(
    backdrop,
    source,
    separableBlend,
    separableBlendModes.screen
  )
}

/**
 * Blend two colors with the "overlay" blend mode
 *
 * @param backdrop The background color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @param source   The foreground color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @return The blended color
 */
export function overlay(backdrop: RGBA, source: RGBA) {
  return performBlend(
    backdrop,
    source,
    separableBlend,
    separableBlendModes.overlay
  )
}

/**
 * Blend two colors with the "darken" blend mode
 *
 * @param backdrop The background color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @param source   The foreground color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @return The blended color
 */
export function darken(backdrop: RGBA, source: RGBA) {
  return performBlend(
    backdrop,
    source,
    separableBlend,
    separableBlendModes.darken
  )
}

/**
 * Blend two colors with the "lighten" blend mode
 *
 * @param backdrop The background color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @param source   The foreground color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @return The blended color
 */
export function lighten(backdrop: RGBA, source: RGBA) {
  return performBlend(
    backdrop,
    source,
    separableBlend,
    separableBlendModes.lighten
  )
}

/**
 * Blend two colors with the "color dodge" blend mode
 *
 * @param backdrop The background color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @param source   The foreground color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @return The blended color
 */
export function colorDodge(backdrop: RGBA, source: RGBA) {
  return performBlend(
    backdrop,
    source,
    separableBlend,
    separableBlendModes.colorDodge
  )
}

/**
 * Blend two colors with the "color burn" blend mode
 *
 * @param backdrop The background color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @param source   The foreground color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @return The blended color
 */
export function colorBurn(backdrop: RGBA, source: RGBA) {
  return performBlend(
    backdrop,
    source,
    separableBlend,
    separableBlendModes.colorBurn
  )
}

/**
 * Blend two colors with the "hard light" blend mode
 *
 * @param backdrop The background color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @param source   The foreground color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @return The blended color
 */
export function hardLight(backdrop: RGBA, source: RGBA) {
  return performBlend(
    backdrop,
    source,
    separableBlend,
    separableBlendModes.hardLight
  )
}

/**
 * Blend two colors with the "soft light" blend mode
 *
 * @param backdrop The background color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @param source   The foreground color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @return The blended color
 */
export function softLight(backdrop: RGBA, source: RGBA) {
  return performBlend(
    backdrop,
    source,
    separableBlend,
    separableBlendModes.softLight
  )
}

/**
 * Blend two colors with the "difference" blend mode
 *
 * @param backdrop The background color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @param source   The foreground color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @return The blended color
 */
export function difference(backdrop: RGBA, source: RGBA) {
  return performBlend(
    backdrop,
    source,
    separableBlend,
    separableBlendModes.difference
  )
}

/**
 * Blend two colors with the "exclusion" blend mode
 *
 * @param backdrop The background color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @param source   The foreground color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @return The blended color
 */
export function exclusion(backdrop: RGBA, source: RGBA) {
  return performBlend(
    backdrop,
    source,
    separableBlend,
    separableBlendModes.exclusion
  )
}

/**
 * Blend two colors with the "hue" blend mode
 *
 * @param backdrop The background color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @param source   The foreground color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @return The blended color
 */
export function hue(backdrop: RGBA, source: RGBA) {
  return performBlend(
    backdrop,
    source,
    nonSeparableBlend,
    nonSeparableBlendModes.hue
  )
}

/**
 * Blend two colors with the "saturation" blend mode
 *
 * @param backdrop The background color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @param source   The foreground color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @return The blended color
 */
export function saturation(backdrop: RGBA, source: RGBA) {
  return performBlend(
    backdrop,
    source,
    nonSeparableBlend,
    nonSeparableBlendModes.saturation
  )
}

/**
 * Blend two colors with the "color" blend mode
 *
 * @param backdrop The background color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @param source   The foreground color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @return The blended color
 */
export function color(backdrop: RGBA, source: RGBA) {
  return performBlend(
    backdrop,
    source,
    nonSeparableBlend,
    nonSeparableBlendModes.color
  )
}

/**
 * Blend two colors with the "luminosity" blend mode
 *
 * @param backdrop The background color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @param source   The foreground color object { r,g,b,a } with the color channels being integers in the [0..255] range and the alpha channel being a fraction in [0..1]
 * @return The blended color
 */
export function luminosity(backdrop: RGBA, source: RGBA) {
  return performBlend(
    backdrop,
    source,
    nonSeparableBlend,
    nonSeparableBlendModes.luminosity
  )
}
