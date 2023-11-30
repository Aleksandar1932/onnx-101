import argparse
from pathlib import Path

import numpy as np
import onnxruntime as ort
from PIL import Image

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="ONNX Runtime Example",
    )
    parser.add_argument(
        "--image", type=str, default=Path("examples/3.png"), help="image path"
    )
    parser.add_argument(
        "--model", type=str, default=Path("models/mnist_cnn.onnx"), help="model path"
    )
    args = parser.parse_args()

    image = np.array(Image.open(args.image).convert("L").resize((28, 28)))
    x = np.reshape(image, (1, 1, *image.shape)).astype(np.float32)

    ort_sess = ort.InferenceSession(args.model)
    input_name = ort_sess.get_inputs()[0].name
    outputs = ort_sess.run(None, {input_name: x})
    print(np.argmax(outputs[0]))
