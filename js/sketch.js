let maxNColors = 7;
let nColors;
let colors = [];
let l = 255
let hOffsetList = [-20, -10, 10, 20];
let sOffsetList = [-20, -10, 10, 20];

function setup() {
  createCanvas(255, 305)
  colorMode(HSB, 255, 255, 255, 255)
  background(100)
  resetSketch()
  console.log('Press r to regenerate palette.')
}

// function draw() {
// }

function resetSketch() {
  drawGradient()
  nColors = floor(random(2, maxNColors))
  genPalette(nColors)
  drawPalette()
  console.log(colors)
}

function drawGradient() {
  for (let h = 0; h < 255; h ++) {
    for (let s = 0; s < 255; s ++) {
      noStroke();
      fill(h, s, l);
      square(h, s, 1);
    }
  }
}

function genPalette(nColors) {
  console.log('Generating palette...')
  console.log(`- Number of colors: ${nColors}`)
  let rule = floor(random(1, nColors));
  console.log(`- Rule: ${rule}`)
  // If rule is less than nColors, some colors will be split from the same hue. This will be done with a hue offset, hOffset, and a a saturation offset, sOffset 
  let hOffset, sOffset;
  if (rule < nColors) {
    hOffset = random(hOffsetList);
    console.log(`- Hue offset: ${hOffset}`)
    sOffset = random(sOffsetList);
    console.log(`- Sat. offset: ${sOffset}`)
  }
  let hSpan = floor(255 / nColors)
  let hStart = floor(random(255))
  let s = floor(random(100, 240))
  let h;
  for (let i = 0; i < nColors; i ++) {
    if (i < rule) {
      h = (hStart + i * hSpan) % 255
    } else {
      // The last hue used in the (i < rule) condition will be (hStart + (rule - 1) * hSpan) % 255, so we will offset the hue from there
      h = (h + hOffset) % 255
      s = (s + sOffset) % 255 
    }
    console.log(`HSL: ${h}, ${s}, ${l}`)
    colorStrRGBA = color(h, s, l).toString()
    let hexCode = hexFromRGBA(colorStrRGBA)
    colors.push(hexCode)
    stroke(0);
    strokeWeight(2);
    fill(hexCode);
    circle(h, s, 10)
  }
}

function hexFromRGBA(colorStrRGBA) {
  // Convert colorStrRGBA of form "rgba(red,green,blue,alpha)"
  let colorStrRGBASliced = colorStrRGBA.slice(5, -1)
  let valsIntRGBA = colorStrRGBASliced.split(',')
  let valsHexRGBA = valsIntRGBA.map(val => int(val).toString(16))
  let hexCode = '#' + valsHexRGBA.slice(0, -1).join('')
  return hexCode
}

function drawPalette() {
  let swatchWidth = floor(width / nColors)
  for (let i = 0; i < nColors; i ++) {
    noStroke();
    fill(colors[i]);
    if (i == nColors - 1) {
      rect(i * swatchWidth, 255, width - ((i - 1) * swatchWidth), 50);
    } else {
      rect(i * swatchWidth, 255, swatchWidth, 50);
    }
  }
}
