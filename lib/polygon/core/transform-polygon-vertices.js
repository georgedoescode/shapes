import {
  polygonTranslate,
  polygonRotate,
  polygonScaleX,
  polygonScaleY,
  polygonArea,
} from 'geometric';

import polygonClipping from 'polygon-clipping';
import simplepolygon from 'simplepolygon';
import simplify from 'simplify-path';

import {
  distBetweenPoints,
  angleBetweenPoints,
  getPolygonBounds,
  extractNestedPolygons,
  offsetPolygon,
  clonePolygon,
  roundedPolygonVertices,
  splinePolygonVertices,
  filterClosePoints,
  lerp,
  getPolygonCentroid,
} from '../../utils';

import { distanceToPolygon } from 'distance-to-polygon';

function translatePolygonTopLeft(polygon, targetX, targetY) {
  const bounds = getPolygonBounds(polygon);

  if (targetX === null) {
    targetX = bounds.x;
  }

  if (targetY === null) {
    targetY = bounds.y;
  }

  const currentTopLeft = [bounds.x, bounds.y];
  const targetTopLeft = [targetX, targetY];

  const dist = distBetweenPoints(currentTopLeft, targetTopLeft);
  const angle = angleBetweenPoints(currentTopLeft, targetTopLeft);

  extractNestedPolygons(polygon, (p) => {
    const t = polygonTranslate(p, angle, dist);

    // update vertices in place to preserve polygon structure
    for (let i = 0; i < t.length; i++) p[i] = t[i];
  });

  return polygon;
}

function translatePolygonCenter(polygon, targetX, targetY) {
  const bounds = getPolygonBounds(polygon);

  const targetTopLeft = [
    targetX === null ? bounds.x : targetX - bounds.width / 2,
    targetY === null ? bounds.y : targetY - bounds.height / 2,
  ];

  return translatePolygonTopLeft(polygon, targetTopLeft[0], targetTopLeft[1]);
}

function rotatePolygon(polygon, angle) {
  const bounds = getPolygonBounds(polygon);

  extractNestedPolygons(polygon, (p) => {
    const r = polygonRotate(p, angle, [
      bounds.x + bounds.width / 2,
      bounds.y + bounds.height / 2,
    ]);

    // update vertices in place to preserve polygon structure
    for (let i = 0; i < r.length; i++) p[i] = r[i];
  });

  return polygon;
}

function scalePolygon(polygon, amountX = 1, amountY = 1) {
  const bounds = getPolygonBounds(polygon);

  extractNestedPolygons(polygon, (p) => {
    const sX = polygonScaleX(p, amountX, [
      bounds.x + bounds.width / 2,
      bounds.y + bounds.height / 2,
    ]);

    const sY = polygonScaleY(sX, amountY, [
      bounds.x + bounds.width / 2,
      bounds.y + bounds.height / 2,
    ]);

    // update vertices in place to preserve polygon structure
    for (let i = 0; i < sY.length; i++) p[i] = sY[i];
  });

  return polygon;
}

function strokePolygon(polygon, size = 1) {
  let target = null;

  if (!isNaN(polygon[0][0][0]) && !isNaN(polygon[0][0][1])) {
    target = polygon[0];
  } else if (polygon.length === 1 && polygon[0].length === 1) {
    target = polygon[0][0];
  }

  if (target) {
    const offset = offsetPolygon(target, -size);

    // trim off self intersections!
    let result = simplepolygon({
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          filterClosePoints(
            offset.filter(
              (v) => typeof v[0] === 'number' && typeof v[0] === 'number'
            ),
            0
          ),
        ],
      },
    })
      .features.map((f) => f.geometry.coordinates[0])
      .sort((a, b) => polygonArea(b) - polygonArea(a))[0]
      .filter((p) => distanceToPolygon(p, target) >= size - 1);

    return polygonClipping.difference(polygon, [result]);
  } else {
    console.warn('Only simple polygons can have a stroke applied.');
  }

  return polygon;
}

function radiusPolygon(polygon, radius) {
  extractNestedPolygons(polygon, (p) => {
    const polygonWithRadius = roundedPolygonVertices(clonePolygon(p), radius);

    for (let i = 0; i < polygonWithRadius.length; i++) {
      p[i] = polygonWithRadius[i];
    }
  });

  return polygon;
}

function splinePolygon(polygon, radius) {
  extractNestedPolygons(polygon, (p) => {
    const polygonWithRadius = splinePolygonVertices(
      clonePolygon(p),
      radius,
      true
    );

    for (let i = 0; i < polygonWithRadius.length; i++) {
      p[i] = polygonWithRadius[i];
    }
  });

  return polygon;
}

function simplifyPolygon(polygon, tolerance) {
  extractNestedPolygons(polygon, (p) => {
    const simplified = simplify(clonePolygon(p), tolerance);
    const centroid = getPolygonCentroid([p]);

    p.splice(simplified.length, p.length - simplified.length);

    for (let i = 0; i < simplified.length; i++) {
      p[i] = lerp(simplified[i], centroid, 0);

      // p[i][0] += random(-4, 4);
      // p[i][1] += random(-4, 4);
    }

    p[p.length - 1] = p[0];
  });

  return polygon;
}

export {
  translatePolygonTopLeft,
  translatePolygonCenter,
  rotatePolygon,
  scalePolygon,
  strokePolygon,
  radiusPolygon,
  splinePolygon,
  simplifyPolygon,
};
