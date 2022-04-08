/**
 * Get the distance beween two [x, y] points.
 *
 * @param {array} p1 - Point 1.
 * @param {array} p2 - Point 2.
 *
 * @returns {number} Distance beween Point 1 & Point 2.
 */
function distBetweenPoints(p1, p2) {
  var a = p1[0] - p2[0];
  var b = p1[1] - p2[1];

  return Math.sqrt(a * a + b * b);
}

/**
 * Get the angle beween two [x, y] points.
 *
 * @param {array} p1 - Point 1.
 * @param {array} p2 - Point 2.
 *
 * @returns {number} Angle beween Point 1 & Point 2.
 */
function angleBetweenPoints(p1, p2) {
  return (Math.atan2(p2[1] - p1[1], p2[0] - p1[0]) * 180) / Math.PI;
}

function filterClosePoints(arr, d) {
  const result = [arr[0]];

  for (let i = 1; i < arr.length; i++) {
    const currentPoint = arr[i];

    if (!result.some((p) => distBetweenPoints(p, currentPoint) <= d)) {
      result.push(currentPoint);
    }
  }

  return result;
}

function lerp(position, target, amt) {
  return [
    (position[0] += (target[0] - position[0]) * amt),
    (position[1] += (target[1] - position[1]) * amt),
  ];
}

export { distBetweenPoints, angleBetweenPoints, filterClosePoints, lerp };
