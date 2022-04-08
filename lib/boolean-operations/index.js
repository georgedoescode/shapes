import polygonClipping from 'polygon-clipping';

import { polygon } from '../polygon';

function union(...polygons) {
  const vertices = polygons.map((p) => p.vertices);

  return polygon(polygonClipping.union(...vertices));
}

function difference(...polygons) {
  const vertices = polygons.map((p) => p.vertices);

  return polygon(polygonClipping.difference(...vertices));
}

function xor(...polygons) {
  const vertices = polygons.map((p) => p.vertices);

  return polygon(polygonClipping.xor(...vertices));
}

function intersection(...polygons) {
  const vertices = polygons.map((p) => p.vertices);

  return polygon(polygonClipping.intersection(...vertices));
}

export { union, difference, xor, intersection };
