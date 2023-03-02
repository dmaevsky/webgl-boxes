// boxes: [[dx, dy]]
// -> [ [[x, y]], 0.5 * totalHeight]
function calcOffsets(boxes, cWidth) {
  let offsetY = 0.;
  const result = [];
  let i = 0;

  while (i < boxes.length) {
    let j = i, lineWidth = 0., maxHeight = 0.;

    while (j < boxes.length) {
      const [dx, dy] = boxes[j++];
      if (lineWidth + dx > cWidth) break;

      lineWidth += dx;
      if (dy > maxHeight) maxHeight = dy;
    }

    let offsetX = 0.5 * (cWidth - lineWidth);

    while (i < j) {
      result.push([offsetX, offsetY]);
      offsetX += boxes[i++][0];
    }
    offsetY += maxHeight;
  }

  return [result, 0.5 * offsetY];
}

export function generateVertices(n) {
  const boxes = [...Array(n)].map(_ => [
    0.2 * (1.5 - Math.random()),
    0.4 * (1.5 - Math.random())
  ]);

  const [offsets, h] = calcOffsets(boxes, 2.);
  const vertices = [];

  for (let i = 0; i < boxes.length; i++) {
    const [dx, dy] = boxes[i];
    const [offsetX, offsetY] = offsets[i];

    const [left, top, right, bottom] = [
      -1 + offsetX,
      h - offsetY,
      -1 + offsetX + dx,
      h - offsetY - dy
    ];

    vertices.push(
      left, top, right, top, right, bottom,
      left, top, left, bottom, right, bottom
    );
  }
  console.log('ALL STUFF', { boxes, offsets, vertices });

  return vertices;
}
