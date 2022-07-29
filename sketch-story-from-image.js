
let img;
let detector;
let request;
let requestseed = '';

const model = ml5.charRNN('models/bolano/', modelLoaded);

function preload() {
  img = loadImage('images/friends.jpg');
  detector = ml5.objectDetector('cocossd');
}

function modelLoaded() {
  console.log('Model Loaded!');
}

function setup() {
  createCanvas(720, 480);
  let btnGen = createButton('Re-Generate');
  btnGen.mousePressed(clickedGenerate);
  // console.log(detector);
  image(img, 0, 0);
  detector.detect(img, gotDetections);
}

function gotDetections(err, res) {
  if (err) {
    console.error(err);
  }
  console.log(res);
  requestseed = '';  
  for (let i = 0; i < res.length; i++) {
    let object = res[i];
    stroke(0,255,0);
    strokeWeight(3);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(255);
    textSize(24);
    text(object.label, object.x + 10, object.y+24);
    requestseed += object.label + ', ';
  }
  request = {
    seed: requestseed,
    length: 1000,
    temperature: 0.9,
  };
  model.generate(request, gotResult);
}

function gotResult(err, res) {
  if (err) {
    console.error(err);
  }
  console.log(res.sample);
  createDiv(requestseed);
  createDiv(res.sample);
  createDiv('-----');
}

function clickedGenerate() {
  model.generate(request, gotResult);
}