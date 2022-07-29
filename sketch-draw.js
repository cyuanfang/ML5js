let drawClassifier;
let canvas;
let label;
let confidence;

function setup() {
  drawClassifier = ml5.imageClassifier('DoodleNet');
  canvas = createCanvas(400, 400);
  background(255);
  canvas.mouseReleased(classifyCanvas);
  let button = createButton('Clear Canvas');
  button.position(width-button.width, height);
  button.mousePressed(clearCanvas);
  label = createDiv('Label:');
  confidence = createDiv('Confidence:');
}

function draw() {
  strokeWeight(14);
  stroke(0);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function clearCanvas() {
  background(255);
}

function classifyCanvas() {
  drawClassifier.classify(canvas, gotResult);
}

function gotResult(err, res) {
  if (err) {
    console.error(err);
  }
  console.log(res);
  label.html('Label: ' + res[0].label);
  confidence.html('Confidence: ' + nf(res[0].confidence, 0, 2));
}