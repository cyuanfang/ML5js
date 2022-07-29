const model = ml5.charRNN('models/bolano/', modelLoaded);

function modelLoaded() {
  console.log('Model Loaded!');
}

let request = {
  seed: 'dog, person, bed, plant',
  length: 300,
  temperature: 0.9,
};

model.generate(request, gotResult);

function gotResult(err, res) {
  if (err) {
    console.error(err);
  }
  console.log(res.sample);
}
