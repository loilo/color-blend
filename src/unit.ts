import separableBlend from './separable-blend'
import * as separableBlendModes from './separable-modes'

import nonSeparableBlend from './non-separable-blend'
import * as nonSeparableBlendModes from './non-separable-modes'

import { performBlend } from './helpers'
import { RGBA } from './types'

export function normal (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, separableBlend, separableBlendModes.normal, { unitInput: true, unitOutput: true })
}

export function multiply (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, separableBlend, separableBlendModes.multiply, { unitInput: true, unitOutput: true })
}

export function screen (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, separableBlend, separableBlendModes.screen, { unitInput: true, unitOutput: true })
}

export function overlay (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, separableBlend, separableBlendModes.overlay, { unitInput: true, unitOutput: true })
}

export function darken (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, separableBlend, separableBlendModes.darken, { unitInput: true, unitOutput: true })
}

export function lighten (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, separableBlend, separableBlendModes.lighten, { unitInput: true, unitOutput: true })
}

export function colorDodge (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, separableBlend, separableBlendModes.colorDodge, { unitInput: true, unitOutput: true })
}

export function colorBurn (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, separableBlend, separableBlendModes.colorBurn, { unitInput: true, unitOutput: true })
}

export function hardLight (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, separableBlend, separableBlendModes.hardLight, { unitInput: true, unitOutput: true })
}

export function softLight (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, separableBlend, separableBlendModes.softLight, { unitInput: true, unitOutput: true })
}

export function difference (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, separableBlend, separableBlendModes.difference, { unitInput: true, unitOutput: true })
}

export function exclusion (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, separableBlend, separableBlendModes.exclusion, { unitInput: true, unitOutput: true })
}

export function hue (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, nonSeparableBlend, nonSeparableBlendModes.hue, { unitInput: true, unitOutput: true })
}

export function saturation (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, nonSeparableBlend, nonSeparableBlendModes.saturation, { unitInput: true, unitOutput: true })
}

export function color (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, nonSeparableBlend, nonSeparableBlendModes.color, { unitInput: true, unitOutput: true })
}

export function luminosity (backdrop: RGBA, source: RGBA) {
  return performBlend(backdrop, source, nonSeparableBlend, nonSeparableBlendModes.luminosity, { unitInput: true, unitOutput: true })
}
