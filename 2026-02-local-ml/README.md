# 🤖 February 2026: AI/ML Local Experiments

## 📌 Theme Overview

**Focus**: Local Models, Datasets, Prediction - Building ML projects that run entirely in the browser

**Philosophy**: No black-box APIs, only transparent math and reproducible experiments. Every model runs locally, every dataset is included, and every prediction is explainable.

## 🎯 Learning Goals

- Understand ML fundamentals: features, labels, loss functions, optimization
- Implement regression and classification from scratch
- Work with datasets: preprocessing, normalization, train/test splits
- Build inference pipelines that run in the browser
- Create explainable AI demos with visual feedback

## 📂 Projects

### Project 1: Local ML Playground
**Type**: Exploration
**Tech**: Pure JavaScript, Chart.js
**Description**: Interactive regression sandbox that trains models in the browser. Users can adjust features, see training progress, and understand how gradient descent works.

**Features**:
- Live regression training with visualized loss curves
- Interactive parameter controls (learning rate, iterations)
- Real-time prediction updates
- "Show Math" mode explaining coefficients and calculations

### Project 2: On-Device Classifier
**Type**: Showcase
**Tech**: TensorFlow.js / Custom JS implementation
**Description**: Lightweight classification demo using local model files. No external APIs, no server-side processing.

**Features**:
- Pre-trained model stored in repo (quantized for speed)
- Text or image classification
- Instant on-device inference
- Model architecture visualization

## 🚀 What Makes This Month Different

- **Zero External Dependencies**: All ML logic runs locally
- **Educational First**: Focus on understanding over performance
- **Reproducible**: Datasets and models included in repo
- **Browser-Native**: No Python, no backends, pure web tech

## 📚 Key Concepts Covered

- **Supervised Learning**: Training with labeled data
- **Loss Functions**: MSE, Cross-Entropy
- **Optimization**: Gradient Descent variants
- **Preprocessing**: Feature scaling, normalization
- **Evaluation**: Train/test splits, metrics (MAE, accuracy)
- **Inference**: Forward pass, prediction pipeline

## 🔗 Resources & Inspiration

- Linear regression math: [Khan Academy](https://www.khanacademy.org/math/statistics-probability/describing-relationships-quantitative-data/introduction-to-trend-lines/a/linear-regression-review)
- TensorFlow.js docs: [tensorflow.org/js](https://www.tensorflow.org/js)
- Interactive ML visualizations: [Distill.pub](https://distill.pub/)

## 📊 Project Status

- [x] February folder structure created
- [ ] Project 1: Local ML Playground
  - [ ] Dataset selection and preprocessing
  - [ ] Regression implementation
  - [ ] UI with interactive controls
  - [ ] Loss curve visualization
- [ ] Project 2: On-Device Classifier
  - [ ] Model selection and preparation
  - [ ] Inference pipeline
  - [ ] Demo UI
  - [ ] Documentation

---

**Month**: February 2026
**Status**: In Progress
**Next**: Build both projects and update root README
