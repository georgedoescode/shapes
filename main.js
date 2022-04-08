import * as shapes from './dist/shapes.modern';
import { random, seedPRNG } from '@georgedoescode/generative-utils';
import { SVG } from '@svgdotjs/svg.js';

const width = 1024;
const height = 1024;

const svg = SVG().viewbox(0, 0, width, height).addTo('body');

console.time('s');
const circle = shapes
  .rect(200, 200)
  .cx(width / 2)
  .cy(height / 2);
const rect = shapes
  .rect(200, 200)
  .cx(width / 2 + 100)
  .cy(height / 2 + 100);
const union = shapes
  .union(circle, rect)
  .cx(width / 2)
  .cy(height / 2)
  .scale(2.5);

svg.path(union.buildPath());

console.timeEnd('s');
