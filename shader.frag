precision highp float;
uniform sampler2D texture;
uniform sampler2D lookup;
uniform float uMix;
varying vec2 texCoord;

#pragma glslify: lut = require(glsl-lut)


void main() {
	vec4 color = texture2D(texture, texCoord);
	vec4 filter = lut(color, lookup);
  gl_FragColor = mix(color, filter, uMix);
  // gl_FragColor = color;
}