import {
  translatePolygonTopLeft,
  translatePolygonCenter,
  rotatePolygon,
  scalePolygon,
  strokePolygon,
  radiusPolygon,
  splinePolygon,
  simplifyPolygon,
} from './core';

import { buildPath } from '../rendering';

import { clonePolygon, getPolygonBounds, getPolygonArea } from '../utils';
import { intersection } from '../boolean-operations';

class BasePolygon {
  constructor(vertices) {
    this.vertices = vertices;
  }

  x(x) {
    this.vertices = translatePolygonTopLeft(
      clonePolygon(this.vertices),
      x,
      null
    );

    return this;
  }

  y(y) {
    this.vertices = translatePolygonTopLeft(
      clonePolygon(this.vertices),
      null,
      y
    );

    return this;
  }

  cx(x) {
    this.vertices = translatePolygonCenter(
      clonePolygon(this.vertices),
      x,
      null
    );

    return this;
  }

  cy(y) {
    this.vertices = translatePolygonCenter(
      clonePolygon(this.vertices),
      null,
      y
    );

    return this;
  }

  rotate(degrees = 0) {
    this.vertices = rotatePolygon(clonePolygon(this.vertices), degrees);

    return this;
  }

  scale(amountX = 1, amountY = null) {
    if (amountY === null) {
      amountY = amountX;
    }

    this.vertices = scalePolygon(clonePolygon(this.vertices), amountX, amountY);

    return this;
  }

  offset(size) {
    if (size >= 1) {
      this.vertices = strokePolygon(clonePolygon(this.vertices), size);
    }

    return this;
  }

  radius(amount) {
    if (amount >= 0) {
      this.vertices = radiusPolygon(clonePolygon(this.vertices), amount);
    }

    return this;
  }

  spline(amount) {
    if (amount > 0) {
      this.vertices = splinePolygon(clonePolygon(this.vertices), amount);
    }

    return this;
  }

  simplify(tolerance = 16) {
    this.vertices = simplifyPolygon(clonePolygon(this.vertices), tolerance);

    return this;
  }

  checkIntersection(targets, amount = 1, simplify = 0) {
    // Wrap in a try/catch to account for occasional polygonClipping weirdness
    try {
      if (
        targets.some(
          (s) =>
            !!intersection(
              s.clone().simplify(simplify),
              this.clone().simplify(simplify)
            ).vertices[0]
        ) ||
        targets.some(
          (s) =>
            !!intersection(
              s.clone().simplify(simplify),
              this.clone()
                .scale(1 * amount)
                .simplify(simplify)
            ).vertices[0]
        ) ||
        targets.some(
          (s) =>
            !!intersection(
              s.clone().simplify(simplify),
              this.clone()
                .scale(1 / amount)
                .simplify(simplify)
            ).vertices[0]
        )
      ) {
        return true;
      } else {
        return false;
      }
    } catch {
      return true;
    }
  }

  getBounds() {
    return getPolygonBounds(this.vertices);
  }

  getArea() {
    return getPolygonArea(this.vertices);
  }

  clone() {
    return new BasePolygon(clonePolygon(this.vertices));
  }

  buildPath() {
    return buildPath(this.clone());
  }
}

export { BasePolygon };
