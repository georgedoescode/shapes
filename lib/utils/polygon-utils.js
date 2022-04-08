import { polygonBounds, polygonCentroid, polygonArea } from 'geometric';
import offsetPolygonFn from 'offset-polygon';

/**
 * Polygons can be made up of lots of nested polygon arrays (often after boolean operations).
 * This function is useful for performing operations on every nested polygon within a polygon.
 *
 * @param {array} polygon - Base polygon to extract nested polygons from.
 * @param {function} callback - Runs for each unique polygon. Useful for modifying in-place.
 *
 * @returns {array} A flat array of polygons [[p1], [[p1]] ...].
 */
function extractNestedPolygons(polygon, callback) {
  if (polygon.length === 0) return [];

  const polygons = [];

  // Is this just a standalone polygon? [[x, y], [x, y]...]
  if (!isNaN(polygon[0][0][0]) && !isNaN(polygon[0][0][1])) {
    if (!!callback) {
      callback(polygon[0]);
    } else {
      polygons.push(polygon[0]);
    }
  } else {
    // This is a nested polygon!
    for (let i = 0; i < polygon.length; i++) {
      const current = polygon[i];

      // There is only one nested polygon in this array
      if (current.length === 1) {
        if (!!callback) {
          callback(current[0]);
        } else {
          polygons.push(current[0]);
        }
      } else {
        // There is more than one nested polygon in this array
        for (let j = 0; j < current.length; j++) {
          if (!!callback) {
            callback(current[j]);
          } else {
            polygons.push(current[j]);
          }
        }
      }
    }
  }

  return polygons;
}

/**
 * Create deep clone of a polygon.
 *
 * @param {array} polygon - Polygon to clone.
 *
 * @returns {array} Deep clone of the polygon input.
 */
function clonePolygon(polygon) {
  return JSON.parse(JSON.stringify(polygon));
}

/**
 * Get a polygon's bounds.
 *
 * @param {array} polygon
 *
 * @returns {object} Polygon's bounding rect ({ x, y, width, height }).
 */
function getPolygonBounds(polygon) {
  const vertices = extractNestedPolygons(polygon).flat();

  const [topLeft, bottomRight] = polygonBounds(vertices);

  return {
    x: topLeft[0],
    y: topLeft[1],
    width: bottomRight[0] - topLeft[0],
    height: bottomRight[1] - topLeft[1],
  };
}

function getPolygonArea(polygon) {
  const vertices = extractNestedPolygons(polygon).flat();

  return polygonArea(vertices);
}

function getPolygonCentroid(polygon) {
  const vertices = extractNestedPolygons(polygon).flat();

  return polygonCentroid(vertices);
}

function offsetPolygon(polygon, size) {
  let formattedPolygon = polygon.map((v) => ({ x: v[0], y: v[1] }));
  let hasPerformedFixup = false;

  if (
    JSON.stringify(formattedPolygon[0]) ===
    JSON.stringify(formattedPolygon[formattedPolygon.length - 1])
  ) {
    formattedPolygon = formattedPolygon.slice(0, formattedPolygon.length - 1);

    hasPerformedFixup = true;
  }

  const offset = offsetPolygonFn(formattedPolygon, size, 0);

  if (hasPerformedFixup) {
    offset.push(offset[0]);
  }

  return offset.map((v) => [v.x, v.y]);
}

export {
  extractNestedPolygons,
  clonePolygon,
  getPolygonBounds,
  offsetPolygon,
  getPolygonCentroid,
  getPolygonArea,
};
