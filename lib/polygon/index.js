import { BasePolygon } from './base-polygon';

import {
  createRectPolygonVertices,
  createEllipsePolygonVertices,
  createLinePolygonVertices,
  createQuadraticCurvePolygonVertices,
} from './core';

function rect(width, height) {
  const vertices = createRectPolygonVertices(width, height);

  return new BasePolygon(vertices);
}

function ellipse(width, height, numPoints) {
  const vertices = createEllipsePolygonVertices(width, height, numPoints);

  return new BasePolygon(vertices);
}

function circle(radius, numPoints) {
  const vertices = createEllipsePolygonVertices(radius, radius, numPoints);

  return new BasePolygon(vertices);
}

function polygon(vertices) {
  return new BasePolygon(vertices);
}

function line(points, width) {
  const vertices = createLinePolygonVertices(points, width);

  return new BasePolygon(vertices);
}

function quadtratic(start, c1, end, width, scale) {
  const vertices = createQuadraticCurvePolygonVertices(
    start,
    c1,
    end,
    width,
    scale
  );

  return new BasePolygon(vertices);
}

export { rect, ellipse, circle, polygon, line, quadtratic };
