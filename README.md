# But it works on my machine?! ONNX 101

Repository containing the code for the ONNX 101 tutorial at the [PyData Skopje - November 2023 Meetup](https://www.meetup.com/pydata-skopje/events/297539830/)

# Content

- Example for training a simple classifier using PyTorch for digit recognition on the MNIST dataset and exporting the model to ONNX.
- Using the ONNX model with ONNX runtime for inference with a simple Express.js server. [ort-web-api](./ort-web-api/README.md)

# Demo 1:

Pre-requisites:
- [python 3.11+](https://www.python.org/downloads/release/python-3110/)
- [poetry](https://python-poetry.org/)

Prepare the environment

```bash
poetry shell
poetry install
```

Obtain the dataset and train the model

```bash
python -m onnx_workshop.mnist
```

Inference with ONNX runtime

```bash
python -m onnx_workshop.inference
```

## Demo 2

Pre-requisites:
- [node.js 17+](https://nodejs.org/en/download/)

Start the server
    
```bash
cd ort-web-api
npm install
node index.js
```

Make a request

```bash
curl --request POST \
  --url http://localhost:3000/classify-digit \
  --header 'Content-Type: multipart/form-data' \
  --form digit=examples/3.png
```