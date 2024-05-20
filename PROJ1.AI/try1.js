class Classifier {
    constructor() {
      this.weights = [];
    }
  
    train(features, labels, learningRate, iterations) {
      // Initialize weights with zeros
      this.weights = new Array(features[0].length).fill(0);
  
      // Perform gradient descent
      for (let i = 0; i < iterations; i++) {
        const scores = this.predictProbabilities(features);
        const errors = this.calculateErrors(labels, scores);
        const gradients = this.calculateGradients(features, errors);
  
        // Update weights based on gradients and learning rate
        for (let j = 0; j < this.weights.length; j++) {
          this.weights[j] -= learningRate * gradients[j];
        }
      }
    }
  
    predict(features) {
      const scores = this.predictProbabilities(features);
  
      // Predict the class with the highest probability
      return scores.map((score) => (score >= 0.5 ? 1 : 0));
    }
  
    predictProbabilities(features) {
      const scores = [];
  
      for (let i = 0; i < features.length; i++) {
        let score = 0;
        for (let j = 0; j < features[i].length; j++) {
          score += this.weights[j] * features[i][j];
        }
        scores.push(this.sigmoid(score));
      }
  
      return scores;
    }
  
    calculateErrors(labels, scores) {
      const errors = [];
  
      for (let i = 0; i < labels.length; i++) {
        errors[i] = labels[i] - scores[i];
      }
  
      return errors;
    }
  
    calculateGradients(features, errors) {
      const gradients = [];
  
      for (let j = 0; j < this.weights.length; j++) {
        let gradient = 0;
        for (let i = 0; i < features.length; i++) {
          gradient += errors[i] * features[i][j];
        }
        gradients.push(gradient);
      }
  
      return gradients;
    }
  
    sigmoid(x) {
      return 1 / (1 + Math.exp(-x));
    }
  }
  
  // Example 
  const classifier = new Classifier();
  const features = [[0.1, 0.2], [0.3, 0.4], [0.5, 0.6]];
  const labels = [0, 1, 0];
  const learningRate = 0.1;
  const iterations = 100;
  
  classifier.train(features, labels, learningRate, iterations);
  const predictions = classifier.predict(features);
  console.log(predictions); 
  



// Define your training data
const trainingData = [  
  { features: [1, 2], label: 'Apple' },
  { features: [2, 1], label: 'Banana' },
  { features: [3, 3], label: 'Orange' },
  
];

// Binary 
const classifiers = {};

// Apple vs. not Apple
classifiers.Apple = new Classifier();
classifiers.Apple.train(trainingData, 'Apple');

// Banana vs. not Banana
classifiers.Banana = new Classifier();
classifiers.Banana.train(trainingData, 'Banana');

// Orange vs. not Orange
classifiers.Orange = new Classifier();
classifiers.Orange.train(trainingData, 'Orange');

//test data
const testData = [  [6, 3],  // Apple vs. not Apple
  [2, 1],  // Banana vs. not Banana
  [4, 2],  // Orange vs. not Orange
];

// predict the classes of test data
for (const data of testData) {
  const predictions = {};
  predictions.Apple = classifiers.Apple.predict(data) ? 1 : 0;
  predictions.Banana = classifiers.Banana.predict(data) ? 1 : 0;
  predictions.Orange = classifiers.Orange.predict(data) ? 1 : 0;
  console.log(predictions);
}
