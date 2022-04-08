import { extractNestedPolygons } from '../utils';

function buildPath(polygon) {
  const verticeSets = extractNestedPolygons(polygon.vertices);

  let basePathData = '';

  for (const polygon of verticeSets) {
    let pathData = '';

    pathData += `M ${polygon[0][0].toFixed(2)} ${polygon[0][1].toFixed(2)}`;

    for (let i = 1; i < polygon.length; i++) {
      pathData += `L ${polygon[i][0].toFixed(2)} ${polygon[i][1].toFixed(2)}`;
    }

    pathData += `Z`;

    basePathData += pathData;
  }

  return basePathData;
}

export { buildPath };
