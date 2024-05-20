const fruitData = [];
let neuralNetwork;

function addData() {
  const sweetness = document.getElementById('sweetness').value;
  const color = document.getElementById('color').value;
  const fruit = document.getElementById('fruit').value;

  fruitData.push({ sweetness: parseInt(sweetness), color, fruit });

  document.getElementById('fruitForm').reset();
}

function trainModel() {
  const hiddenNeurons = document.getElementById('hiddenNeurons').value;
  const activationFunction = document.getElementById('activationFunction').value;
  const learningRate = document.getElementById('learningRate').value;
  const maxEpochs = document.getElementById('maxEpochs').value;
  const goal = document.getElementById('goal').value;

  neuralNetwork = new NeuralNetwork(hiddenNeurons, activationFunction, learningRate);
  neuralNetwork.train(fruitData, maxEpochs, goal);

  const accuracy = neuralNetwork.evaluate(fruitData);
  document.getElementById('accuracy').textContent = `Accuracy: ${accuracy.toFixed(2)}%`;
}

function testModel() {
  const testSweetness = document.getElementById('testSweetness').value;
  const testColor = document.getElementById('testColor').value;

  const result = neuralNetwork.predict({ sweetness: parseInt(testSweetness), color: testColor });
  document.getElementById('testResult').textContent = `Predicted Fruit: ${result}`;
}
