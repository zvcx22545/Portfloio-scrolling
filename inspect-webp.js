const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public', 'image_sequence', 'd_a_f_e_c_e_e_a_mp__000.webp');
console.log('Checking file:', filePath);

if (!fs.existsSync(filePath)) {
  console.error('File does not exist!');
  process.exit(1);
}

const buffer = fs.readFileSync(filePath);
console.log('Buffer size:', buffer.length);
console.log('Header:', buffer.toString('ascii', 0, 4), buffer.toString('ascii', 8, 12));

// Parse WebP width and height
// WebP files start with 'RIFF' and have 'WEBP' at offset 8
const type = buffer.toString('ascii', 12, 16);
console.log('WebP Type:', type);

let width = 0;
let height = 0;

if (type === 'VP8 ') {
  // Lossy
  const widthLow = buffer.readUInt16LE(26);
  const heightLow = buffer.readUInt16LE(28);
  width = widthLow & 0x3fff;
  height = heightLow & 0x3fff;
} else if (type === 'VP8L') {
  // Lossless
  const b1 = buffer.readUInt8(21);
  const b2 = buffer.readUInt8(22);
  const b3 = buffer.readUInt8(23);
  const b4 = buffer.readUInt8(24);
  width = 1 + (((b2 & 0x3f) << 8) | b1);
  height = 1 + (((b4 & 0xf) << 10) | (b3 << 2) | ((b2 & 0xc0) >> 6));
} else if (type === 'VP8X') {
  // Extended
  width = 1 + buffer.readUIntLE(24, 3);
  height = 1 + buffer.readUIntLE(27, 3);
}

console.log(`Dimensions: ${width}x${height}`);
