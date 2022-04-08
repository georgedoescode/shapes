var t=require("geometric"),n=require("offset-polygon"),r=require("adaptive-quadratic-curve"),e=require("adaptive-bezier-curve"),i=require("polygon-clipping"),u=require("simplepolygon"),o=require("simplify-path"),a=require("distance-to-polygon");function c(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var l=/*#__PURE__*/c(n),f=/*#__PURE__*/c(r),s=/*#__PURE__*/c(e),h=/*#__PURE__*/c(i),v=/*#__PURE__*/c(u),y=/*#__PURE__*/c(o);function p(t,n){var r=t[0]-n[0],e=t[1]-n[1];return Math.sqrt(r*r+e*e)}function g(t,n){for(var r=[t[0]],e=function(e){var i=t[e];r.some(function(t){return p(t,i)<=n})||r.push(i)},i=1;i<t.length;i++)e(i);return r}function d(t,n){if(0===t.length)return[];var r=[];if(isNaN(t[0][0][0])||isNaN(t[0][0][1]))for(var e=0;e<t.length;e++){var i=t[e];if(1===i.length)n?n(i[0]):r.push(i[0]);else for(var u=0;u<i.length;u++)n?n(i[u]):r.push(i[u])}else n?n(t[0]):r.push(t[0]);return r}function x(t){return JSON.parse(JSON.stringify(t))}function m(n){var r=d(n).flat(),e=t.polygonBounds(r),i=e[0],u=e[1];return{x:i[0],y:i[1],width:u[0]-i[0],height:u[1]-i[1]}}var b=function(){function t(t,n,r){var e=n.x-t.x,i=n.y-t.y,u=r/(2*Math.sqrt(e*e+i*i));return{x:-u*i,y:u*e}}function n(t,n,r,e){var i=(n.y-t.y)/(n.x-t.x),u=(e.y-r.y)/(e.x-r.x);if(!(i===u||Math.abs(i-u)<1e-5)){var o=t.y-i*t.x,a=(o-(r.y-u*r.x))/(u-i);return{x:a,y:i*a+o}}}return function(r,e){for(var i=[],u=0;u<r.length;u++)i.push({x:(w=r[u])[0],y:w[1]});if(r=i,"[object Array]"!==Object.prototype.toString.call(e)){var o=e;for(e=[],u=0;u<r.length;u++)e.push(o)}for(var a,c,l,f,s,h,v,y,p,g,d,x,m=[],b=(u=0,r.length-1);u<b;u++)l=!u,f=u===r.length-2,a=t(r[u],r[u+1],e[u]),c=t(r[u],r[u+1],e[u+1]),p={x:r[u].x+a.x,y:r[u].y+a.y},g={x:r[u+1].x+c.x,y:r[u+1].y+c.y},d={x:r[u].x-a.x,y:r[u].y-a.y},x={x:r[u+1].x-c.x,y:r[u+1].y-c.y},l||((v=n(s[0],s[1],p,g))&&m.unshift(v),(y=n(h[0],h[1],d,x))&&m.push(y)),l&&(m.unshift(p),m.push(d)),f&&(m.unshift(g),m.push(x)),f||(s=[p,g],h=[d,x]);for(u=0;u<m.length;u++){var w;m[u]=[(w=m[u]).x,w.y]}return m.push(m[0]),m.filter(function(t){return!isNaN(t[0])&&!isNaN(t[1])})}}();function w(t,n){return b(t,n)}function N(t,n,r){void 0===r&&(r=64);for(var e=[],i=2*Math.PI/r,u=1;u<=r;u++)e.push([Math.cos(u*i)*t/2+t/2,Math.sin(u*i)*n/2+n/2]);return e.push(e[0]),[e]}function M(n,r,e){var i=m(n);null===r&&(r=i.x),null===e&&(e=i.y);var u,o,a=[i.x,i.y],c=[r,e],l=p(a,c),f=(u=a,o=c,180*Math.atan2(o[1]-u[1],o[0]-u[0])/Math.PI);return d(n,function(n){for(var r=t.polygonTranslate(n,f,l),e=0;e<r.length;e++)n[e]=r[e]}),n}function q(t,n,r){var e=m(t),i=[null===n?e.x:n-e.width/2,null===r?e.y:r-e.height/2];return M(t,i[0],i[1])}function A(t,n){(null==n||n>t.length)&&(n=t.length);for(var r=0,e=new Array(n);r<n;r++)e[r]=t[r];return e}function S(t){for(var n,r="",e=function(t,n){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(r)return(r=r.call(t)).next.bind(r);if(Array.isArray(t)||(r=function(t,n){if(t){if("string"==typeof t)return A(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?A(t,n):void 0}}(t))){r&&(t=r);var e=0;return function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(d(t.vertices));!(n=e()).done;){var i=n.value,u="";u+="M "+i[0][0].toFixed(2)+" "+i[0][1].toFixed(2);for(var o=1;o<i.length;o++)u+="L "+i[o][0].toFixed(2)+" "+i[o][1].toFixed(2);r+=u+="Z"}return r}function O(){var t=[].slice.call(arguments).map(function(t){return t.vertices});return I(h.default.intersection.apply(h.default,t))}var j=/*#__PURE__*/function(){function n(t){this.vertices=t}var r=n.prototype;return r.x=function(t){return this.vertices=M(x(this.vertices),t,null),this},r.y=function(t){return this.vertices=M(x(this.vertices),null,t),this},r.cx=function(t){return this.vertices=q(x(this.vertices),t,null),this},r.cy=function(t){return this.vertices=q(x(this.vertices),null,t),this},r.rotate=function(n){return void 0===n&&(n=0),this.vertices=function(n,r){var e=m(n);return d(n,function(n){for(var i=t.polygonRotate(n,r,[e.x+e.width/2,e.y+e.height/2]),u=0;u<i.length;u++)n[u]=i[u]}),n}(x(this.vertices),n),this},r.scale=function(n,r){return void 0===n&&(n=1),void 0===r&&(r=null),null===r&&(r=n),this.vertices=function(n,r,e){void 0===r&&(r=1),void 0===e&&(e=1);var i=m(n);return d(n,function(n){for(var u=t.polygonScaleX(n,r,[i.x+i.width/2,i.y+i.height/2]),o=t.polygonScaleY(u,e,[i.x+i.width/2,i.y+i.height/2]),a=0;a<o.length;a++)n[a]=o[a]}),n}(x(this.vertices),n,r),this},r.offset=function(n){return n>=1&&(this.vertices=function(n,r){void 0===r&&(r=1);var e=null;if(isNaN(n[0][0][0])||isNaN(n[0][0][1])?1===n.length&&1===n[0].length&&(e=n[0][0]):e=n[0],e){var i=function(t,n){var r=t.map(function(t){return{x:t[0],y:t[1]}}),e=!1;JSON.stringify(r[0])===JSON.stringify(r[r.length-1])&&(r=r.slice(0,r.length-1),e=!0);var i=l.default(r,n,0);return e&&i.push(i[0]),i.map(function(t){return[t.x,t.y]})}(e,-r),u=v.default({type:"Feature",geometry:{type:"Polygon",coordinates:[g(i.filter(function(t){return"number"==typeof t[0]&&"number"==typeof t[0]}),0)]}}).features.map(function(t){return t.geometry.coordinates[0]}).sort(function(n,r){return t.polygonArea(r)-t.polygonArea(n)})[0].filter(function(t){return a.distanceToPolygon(t,e)>=r-1});return h.default.difference(n,[u])}return console.warn("Only simple polygons can have a stroke applied."),n}(x(this.vertices),n)),this},r.radius=function(t){return t>=0&&(this.vertices=function(t,n){return d(t,function(t){for(var r=function(t,n){0===n&&(n=1e-7),(t=t.map(function(t){return{x:t[0],y:t[1]}}))[0].x===t[t.length-1].x&&t[0].y===t[t.length-1].y&&(t=t.slice(0,t.length-1));for(var r=[],e=function(t,n){return Math.sqrt(Math.pow(t.x-n.x,2)+Math.pow(t.y-n.y,2))},i=function(t,n,r){return t+(n-t)*r},u=function(t,n,r){return{x:i(t.x,n.x,r),y:i(t.y,n.y,r)}},o=t.length,a=[],c=0;c<o;c++){var l=t[c],s=t[(c+1)%o],h=t[(c+2)%o],v=e(l,s),y=u(s,l,Math.min(v/2,n)/v),p=e(h,s),g=u(s,h,Math.min(p/2,n)/p);a.push([y,s,g])}for(var d=0,x=a;d<x.length;d++){var m=x[d],b=m[0],w=m[1],N=m[2];r.push.apply(r,f.default([b.x,b.y],[w.x,w.y],[N.x,N.y],8))}return r}(x(t),n),e=0;e<r.length;e++)t[e]=r[e]}),t}(x(this.vertices),t)),this},r.spline=function(t){return t>0&&(this.vertices=function(t,n){return d(t,function(t){for(var r=function(t,n,r){void 0===t&&(t=[]),void 0===n&&(n=1),void 0===r&&(r=!0),t[0][0]===t[t.length-1][0]&&t[0][1]===t[t.length-1][1]&&(t=t.slice(0,t.length-1)),t=function(t,n){if(t=[].concat(t),Array.isArray(t[0])||(t=t.map(function(t){return[t.x,t.y]})),n){var r=t[t.length-2],e=t[0],i=t[1];t.unshift(t[t.length-1]),t.unshift(r),t.push(e),t.push(i)}return t.flat()}(t,r);var e=[],i=t.length,u=i-4;e.push([r?t[2]:t[0],r?t[3]:t[1]]);for(var o=r?i-4:i-2,a=n,c=r?2:0;c<o;c+=2){var l=c?t[c-2]:t[0],f=c?t[c-1]:t[1],h=t[c+0],v=t[c+1],y=t[c+2],d=t[c+3];n=p([h,v],[y,d])<8?1e-4:a,e.push.apply(e,s.default([h,v],[h+(y-l)/6*n,v+(d-f)/6*n],[y-((c!==u?t[c+4]:y)-h)/6*n,d-((c!==u?t[c+5]:d)-v)/6*n],[y,d],8))}return g(e,0)}(x(t),n,!0),e=0;e<r.length;e++)t[e]=r[e]}),t}(x(this.vertices),t)),this},r.simplify=function(n){return void 0===n&&(n=16),this.vertices=function(n,r){return d(n,function(n){var e,i,u=y.default(x(n),r),o=function(n){var r=d(n).flat();return t.polygonCentroid(r)}([n]);n.splice(u.length,n.length-u.length);for(var a=0;a<u.length;a++)n[a]=[(e=u[a])[0]+=0*((i=o)[0]-e[0]),e[1]+=0*(i[1]-e[1])];n[n.length-1]=n[0]}),n}(x(this.vertices),n),this},r.checkIntersection=function(t,n){var r=this;void 0===n&&(n=1);try{return!!(t.some(function(t){return!!O(t.clone(),r.clone()).vertices[0]})||t.some(function(t){return!!O(t.clone(),r.clone().scale(1*n)).vertices[0]})||t.some(function(t){return!!O(t.clone(),r.clone().scale(1/n)).vertices[0]}))}catch(t){return!0}},r.getBounds=function(){return m(this.vertices)},r.getArea=function(){return function(n){var r=d(n).flat();return t.polygonArea(r)}(this.vertices)},r.clone=function(){return new n(x(this.vertices))},r.buildPath=function(){return S(this.clone())},n}();function I(t){return new j(t)}exports.buildPath=S,exports.circle=function(t,n){var r=N(t,t,n);return new j(r)},exports.difference=function(){var t=[].slice.call(arguments).map(function(t){return t.vertices});return I(h.default.difference.apply(h.default,t))},exports.ellipse=function(t,n,r){var e=N(t,n,r);return new j(e)},exports.intersection=O,exports.line=function(t,n){var r=function(t,n){return void 0===n&&(n=1),[w(t,n)]}(t,n);return new j(r)},exports.polygon=I,exports.quadtratic=function(t,n,r,e,i){var u=function(t,n,r,e,i){return void 0===e&&(e=1),void 0===i&&(i=8),[w(f.default(t,n,r,i),e)]}(t,n,r,e,i);return new j(u)},exports.rect=function(t,n){var r=function(t,n){return[[[0,0],[t,0],[t,n],[0,n],[0,0]]]}(t,n);return new j(r)},exports.union=function(){var t=[].slice.call(arguments).map(function(t){return t.vertices});return I(h.default.union.apply(h.default,t))},exports.xor=function(){var t=[].slice.call(arguments).map(function(t){return t.vertices});return I(h.default.xor.apply(h.default,t))};
//# sourceMappingURL=shapes.cjs.map
