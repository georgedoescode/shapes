import { lineToPolygon } from '../../utils';
import quadratic from 'adaptive-quadratic-curve';

function createRectPolygonVertices(width, height) {
  const vertices = [
    [0, 0],
    [width, 0],
    [width, height],
    [0, height],
    [0, 0],
  ];

  return [vertices];
}

function createEllipsePolygonVertices(width, height, numPoints = 64) {
  const vertices = [];
  const angleStep = (Math.PI * 2) / numPoints;

  for (let i = 1; i <= numPoints; i++) {
    vertices.push([
      (Math.cos(i * angleStep) * width) / 2 + width / 2,
      (Math.sin(i * angleStep) * height) / 2 + height / 2,
    ]);
  }

  vertices.push(vertices[0]);

  return [vertices];
}

function createLinePolygonVertices(points, width = 1) {
  return [lineToPolygon(points, width)];
}

function createQuadraticCurvePolygonVertices(
  start,
  c1,
  end,
  width = 1,
  scale = 8
) {
  return [lineToPolygon(quadratic(start, c1, end, scale), width)];
}

export {
  createRectPolygonVertices,
  createEllipsePolygonVertices,
  createLinePolygonVertices,
  createQuadraticCurvePolygonVertices,
};
