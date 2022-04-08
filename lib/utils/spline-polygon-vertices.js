import { distBetweenPoints, filterClosePoints } from './index';

import bezier from 'adaptive-bezier-curve';

function formatPoints(points, close) {
  points = [...points];

  if (!Array.isArray(points[0])) {
    points = points.map(({ x, y }) => [x, y]);
  }

  if (close) {
    const lastPoint = points[points.length - 1];
    const secondToLastPoint = points[points.length - 2];

    const firstPoint = points[0];
    const secondPoint = points[1];

    points.unshift(lastPoint);
    points.unshift(secondToLastPoint);

    points.push(firstPoint);
    points.push(secondPoint);
  }

  return points.flat();
}

function splinePolygonVertices(points = [], tension = 1, close = true) {
  if (
    points[0][0] === points[points.length - 1][0] &&
    points[0][1] === points[points.length - 1][1]
  ) {
    points = points.slice(0, points.length - 1);
  }

  points = formatPoints(points, close);

  const result = [];

  const size = points.length;
  const last = size - 4;

  const startPointX = close ? points[2] : points[0];
  const startPointY = close ? points[3] : points[1];

  result.push([startPointX, startPointY]);

  const startIteration = close ? 2 : 0;
  const maxIteration = close ? size - 4 : size - 2;
  const inc = 2;

  const baseTension = tension;

  for (let i = startIteration; i < maxIteration; i += inc) {
    const x0 = i ? points[i - 2] : points[0];
    const y0 = i ? points[i - 1] : points[1];

    const x1 = points[i + 0];
    const y1 = points[i + 1];

    const x2 = points[i + 2];
    const y2 = points[i + 3];

    if (distBetweenPoints([x1, y1], [x2, y2]) < 8) {
      tension = 0.0001;
    } else {
      tension = baseTension;
    }

    const x3 = i !== last ? points[i + 4] : x2;
    const y3 = i !== last ? points[i + 5] : y2;

    const cp1x = x1 + ((x2 - x0) / 6) * tension;
    const cp1y = y1 + ((y2 - y0) / 6) * tension;

    const cp2x = x2 - ((x3 - x1) / 6) * tension;
    const cp2y = y2 - ((y3 - y1) / 6) * tension;

    result.push(...bezier([x1, y1], [cp1x, cp1y], [cp2x, cp2y], [x2, y2], 8));
  }

  return filterClosePoints(result, 0);
}

export { splinePolygonVertices };
