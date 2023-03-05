import { generateBoxes } from './model.js';

export function initBuffers(gl, n) {
  const positionBuffer = initPositionBuffer(gl, n);
  const colorBuffer = initColorBuffer(gl, n);

  return {
    boxes: generateBoxes(n),
    position: positionBuffer,
    color: colorBuffer,
  };
}

function initPositionBuffer(gl, n) {
  const positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, n * 12 * 4, gl.DYNAMIC_DRAW);

  return positionBuffer;
}

function initColorBuffer(gl, n) {
  const colors = [];
  const palette = [
    [1, 0, 0, 1], // red
    [0, 1, 0, 1], // green
    [0, 0, 1, 1], // blue
  ]

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < 6; j++) {
      colors.push(...palette[i % palette.length]);
    }
  }

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  return colorBuffer;
}
