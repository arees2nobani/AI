class NeuralNetwork {
  constructor(hiddenNeurons, activationFunction, learningRate) {
    this.hiddenNeurons = hiddenNeurons;
    this.activationFunction = activationFunction;
    this.learningRate = learningRate;

    this.inputNeurons = 2; // Assuming two features: sweetness and color
    this.outputNeurons = 3; // Three classes: Apple, Banana, Orange

    this.weightsInputHidden = this.initializeWeights(this.inputNeurons, this.hiddenNeurons);
    this.biasHidden = this.initializeWeights(1, this.hiddenNeurons)[0];

    this.weightsHiddenOutput = this.initializeWeights(this.hiddenNeurons, this.outputNeurons);
    this.biasOutput = this.initializeWeights(1, this.outputNeurons)[0];
  }

  initializeWeights(inputSize, outputSize) {
    return Array.from({ length: inputSize * outputSize }, () => Math.random() - 0.5);
  }

  train(data, maxEpochs, goal) {
    for (let epoch = 0; epoch < maxEpochs; epoch++) {
      let totalError = 0;

      for (const example of data) {
        const { input, target } = this.prepareExample(example);

        const output = this.forwardPropagation(input);
        totalError += this.calculateError(output, target);

        this.backwardPropagation(input, output, target);
        this.updateWeights();
      }

      const meanError = totalError / data.length;
      console.log(`Epoch ${epoch + 1}/${maxEpochs}, Mean Error: ${meanError}`);

      if (meanError < goal) {
        console.log('Training goal achieved. Stopping training.');
        break;
      }
    }
  }

  predict(input) {
    const output = this.forwardPropagation(input);
    return this.getClassWithHighestProbability(output);
  }

  evaluate(data) {
    let correctPredictions = 0;

    for (const example of data) {
      const { input, target } = this.prepareExample(example);
      const predictedClass = this.predict(input);

      if (predictedClass === target) {
        correctPredictions++;
      }
    }

    const accuracy = (correctPredictions / data.length) * 100;
    return accuracy;
  }

  sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }

  sigmoidDerivative(x) {
    const sigmoidX = this.sigmoid(x);
    return sigmoidX * (1 - sigmoidX);
  }

  prepareExample(example) {
    // Convert example data to the format expected by the neural network
    const input = [example.sweetness, example.color];
    const target = example.fruit;
    return { input, target };
  }

  forwardPropagation(input) {
    const hiddenInput = this.calculateWeightedSum(input, this.weightsInputHidden, this.biasHidden);
    const hiddenOutput = hiddenInput.map(value => this.applyActivationFunction(value));

    const finalInput = this.calculateWeightedSum(hiddenOutput, this.weightsHiddenOutput, this.biasOutput);
    const finalOutput = finalInput.map(value => this.applyActivationFunction(value));

    return finalOutput;
  }

  backwardPropagation(input, output, target) {
    const outputError = output.map((outputValue, i) => target === i ? outputValue - 1 : outputValue);
    const outputDelta = outputError.map((error, i) => error * this.sigmoidDerivative(output[i]));

    const hiddenError = this.calculateWeightedSum(outputDelta, this.weightsHiddenOutput.transpose());
    const hiddenDelta = hiddenError.map((error, i) => error * this.sigmoidDerivative(input[i]));

    // Update weights and biases
    this.updateWeightsAndBiases(this.weightsHiddenOutput, outputDelta, output);
    this.updateWeightsAndBiases(this.weightsInputHidden, hiddenDelta, input);
  }

  calculateWeightedSum(input, weights, bias) {
    const result = Array.from({ length: weights[0].length }, () =>
      input.reduce((sum, value, i) => sum + value * weights[i], 0) + bias
    );
    return result;
  }

  applyActivationFunction(value) {
    switch (this.activationFunction) {
      case 'sigmoid':
        return this.sigmoid(value);
      // Add other activation functions as needed
      default:
        throw new Error('Unsupported activation function');
    }
  }

  updateWeightsAndBiases(weights, delta, input) {
    for (let i = 0; i < weights.length; i++) {
      for (let j = 0; j < weights[0].length; j++) {
        weights[i][j] -= this.learningRate * delta[j] * input[i];
      }
    }
  }

  updateWeights() {
    const updateWeight = (weight, delta, input) => weight - this.learningRate * delta * input;

    // Update weights for the hidden layer
    for (let i = 0; i < this.weightsInputHidden.length; i++) {
        for (let j = 0; j < this.weightsInputHidden[0].length; j++) {
            this.weightsInputHidden[i][j] = updateWeight(
                this.weightsInputHidden[i][j],
                this.hiddenDelta[j],
                this.hiddenOutput[i]
            );
        }
    }

    // Update weights for the output layer
    for (let i = 0; i < this.weightsHiddenOutput.length; i++) {
        for (let j = 0; j < this.weightsHiddenOutput[0].length; j++) {
            this.weightsHiddenOutput[i][j] = updateWeight(
                this.weightsHiddenOutput[i][j],
                this.outputDelta[j],
                this.finalOutput[i]
            );
        }
    }

    // Update biases
    this.biasHidden = updateWeight(this.biasHidden, this.hiddenDelta.reduce((sum, value) => sum + value, 0), 1);
    this.biasOutput = updateWeight(this.biasOutput, this.outputDelta.reduce((sum, value) => sum + value, 0), 1);
}


  calculateError(output, target) {
    return output.reduce((sum, value, i) => sum + 0.5 * Math.pow(value - target[i], 2), 0);
  }

  getClassWithHighestProbability(output) {
    return output.indexOf(Math.max(...output));
  }
}

// Export the NeuralNetwork class for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NeuralNetwork;
}
