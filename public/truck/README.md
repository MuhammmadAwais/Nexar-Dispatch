# Nexar Dispatch — Truck Animation Rig

This directory contains the `greybox.svg` placeholder rig for the hero scene animation. When producing the final polished artwork, the designer must strictly adhere to the following coordinate constraints to ensure the GSAP animations (especially wheel rotations and parallax layers) function correctly without code changes.

## Coordinate System
- **ViewBox:** `0 0 2400 700`
- **Scale:** Approximately 100 units = 1 meter.

## Baselines
- **Ground Baseline (Bottom of tires):** `Y = 600`
- **Axle Line (Center of all wheels):** `Y = 550`

## Dimensions
- **Trailer Length:** `1650` (spanning from `X = 200` to `X = 1850`)
- **Tractor Length:** `600` (spanning from `X = 1700` to `X = 2300`)
- **Total Rig Length:** `2100`

## Wheel Configurations
To prevent eccentric wobbling during CSS/GSAP rotation animations, **every wheel group must have a perfectly square bounding box where the exact center corresponds to the axle coordinate below.**

*All wheels share a radius of `50` (Diameter `100`).*

### Trailer Wheels
- **#wheel-trailer-1** (Rearmost): `cx = 300, cy = 550`
- **#wheel-trailer-2** (Rear tandem front): `cx = 420, cy = 550`

### Tractor Wheels
- **#wheel-drive-2** (Rear drive axle): `cx = 1750, cy = 550`
- **#wheel-drive-1** (Front drive axle): `cx = 1870, cy = 550`
- **#wheel-steer** (Front steer axle): `cx = 2220, cy = 550`

## Required DOM Structure
The final SVG must preserve the exact hierarchy and IDs of this placeholder so the animation hooks mount successfully:

```xml
<g id="truck-scene">
  <g id="trailer">
    <g id="wheel-trailer-1" />
    <g id="wheel-trailer-2" />
  </g>
  <g id="tractor">
    <g id="chassis" />
    <g id="wheel-drive-2" />
    <g id="wheel-drive-1" />
    <g id="wheel-steer" />
  </g>
</g>
```
