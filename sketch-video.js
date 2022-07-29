console.log('ml5 version:', ml5.version);

let classifier; // The classifier model
let img; // A variable to hold the image we want to classify
let label='', prob=''; // A variable to hold predicted label and probability

function setup() {
  createCanvas(640, 540);
  img = createVideo('images/song.mp4', imgReady); // Load the image
  classifier = ml5.imageClassifier('MobileNet', img, modelReady); // Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
}

function imgReady(){
  image(img, 0, 0, 640, 480);
  img.hide();
  img.loop();
}

function modelReady() {
    console.log('Model is Ready')
    classifier.predict(gotResult);
}

function gotResult(err, res) { // A function to run when we get any errors and the results
  if (err) {  // Display error in the console
    console.error(err);
  } else {    // The results are in an array ordered by confidence.
    //console.log(res);
    label = res[0].label;
    prob = res[0].confidence;
    background(0);
    image(img, 0, 0, 640, 480);
    fill(255);
    textSize(24);
    text('Label: ' + label, 10, height-36 );
    text('Probability: ' + nf(prob, 0, 3), 10, height-10);
    classifier.predict(gotResult);
  }
}