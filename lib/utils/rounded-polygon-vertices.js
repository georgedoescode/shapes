import quadratic from 'adaptive-quadratic-curve';

function roundedPolygonVertices(points, radius) {
  points = points.map((p) => ({ x: p[0], y: p[1] }));

  if (radius === 0) {
    radius = 0.0000001;
  }

  if (
    points[0].x === points[points.length - 1].x &&
    points[0].y === points[points.length - 1].y
  ) {
    points = points.slice(0, points.length - 1);
  }

  const result = [];

  const distance = (p1, p2) =>
    Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

  const lerp = (a, b, x) => a + (b - a) * x;

  const lerp2D = (p1, p2, t) => ({
    x: lerp(p1.x, p2.x, t),
    y: lerp(p1.y, p2.y, t),
  });

  const numPoints = points.length;

  let corners = [];

  for (let i = 0; i < numPoints; i++) {
    let lastPoint = points[i];
    let thisPoint = points[(i + 1) % numPoints];
    let nextPoint = points[(i + 2) % numPoints];

    let lastEdgeLength = distance(lastPoint, thisPoint);
    let lastOffsetDistance = Math.min(lastEdgeLength / 2, radius);
    let start = lerp2D(
      thisPoint,
      lastPoint,
      lastOffsetDistance / lastEdgeLength
    );

    let nextEdgeLength = distance(nextPoint, thisPoint);
    let nextOffsetDistance = Math.min(nextEdgeLength / 2, radius);
    let end = lerp2D(thisPoint, nextPoint, nextOffsetDistance / nextEdgeLength);

    corners.push([start, thisPoint, end]);
  }

  for (let [start, ctrl, end] of corners) {
    result.push(
      ...quadratic([start.x, start.y], [ctrl.x, ctrl.y], [end.x, end.y], 8)
    );
  }

  return result;
}

export { roundedPolygonVertices };
