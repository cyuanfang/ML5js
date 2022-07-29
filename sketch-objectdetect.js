
let img;
let detector;

function preload() {
  img = loadImage('images/friends.jpg');
  detector = ml5.objectDetector('cocossd');
}

function gotDetections(err, res) {
  if (err) {
    console.error(err);
  }
  console.log(res);  
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
  }
}

function setup() {
  createCanvas(720, 480);
  // console.log(detector);
  image(img, 0, 0);
  detector.detect(img, gotDetections);
}