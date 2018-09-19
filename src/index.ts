import separableBlend from './separable-blend'
import * as separableBlendModes from './separable-modes'

import nonSeparableBlend from './non-separable-blend'
import * as nonSeparableBlendModes from './non-separable-modes'

import { performBlend } from './helpers'
import { RGBA } from './types'

export function normal (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, separableBlend, separableBlendModes.normal)
}

export function multiply (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, separableBlend, separableBlendModes.multiply)
}

export function screen (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, separableBlend, separableBlendModes.screen)
}

export function overlay (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, separableBlend, separableBlendModes.overlay)
}

export function darken (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, separableBlend, separableBlendModes.darken)
}

export function lighten (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, separableBlend, separableBlendModes.lighten)
}

export function colorDodge (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, separableBlend, separableBlendModes.colorDodge)
}

export function colorBurn (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, separableBlend, separableBlendModes.colorBurn)
}

export function hardLight (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, separableBlend, separableBlendModes.hardLight)
}

export function softLight (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, separableBlend, separableBlendModes.softLight)
}

export function difference (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, separableBlend, separableBlendModes.difference)
}

export function exclusion (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, separableBlend, separableBlendModes.exclusion)
}

export function hue (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, nonSeparableBlend, nonSeparableBlendModes.hue)
}

export function saturation (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, nonSeparableBlend, nonSeparableBlendModes.saturation)
}

export function color (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, nonSeparableBlend, nonSeparableBlendModes.color)
}

export function luminosity (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, nonSeparableBlend, nonSeparableBlendModes.luminosity)
}
