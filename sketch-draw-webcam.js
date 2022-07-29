
let clearButton;
let canvas;
let drawClassifier;
let resultsDiv;
let video;

function setup() {
  drawClassifier = ml5.imageClassifier('DoodleNet', modelReady);
  canvas = createCanvas(400, 400);
  background(255);
  resultsDiv = createDiv('model loading');
  video = createCapture(VIDEO);
  video.hide();
}

function draw() {
  image(video, 0, 0, width, height);
  //if (mouseIsPressed) {
    filter(BLUR, 2);
    filter(THRESHOLD, 0.3);
  //}
}

function modelReady() {
  console.log('model loaded');
  drawClassifier.classify(canvas, gotResult);
}

function gotResult(err, results) {
  if (err) {
    console.error(err);
    return;
  }
  // console.log(results);
  let content = `${results[0].label} 
                 ${nf(100 * results[0].confidence, 2, 1)}%<br/>
                 ${results[1].label} 
                 ${nf(100 * results[1].confidence, 2, 1)}%`;

  resultsDiv.html(content);
  drawClassifier.classify(canvas, gotResult);
}

