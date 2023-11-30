import express from 'express'
import ort from 'onnxruntime-node'
import multer from 'multer'
import sharp from 'sharp'

var app = express()
const upload = multer({ storage: multer.memoryStorage() })
const port = 3000

app.post('/classify-digit', upload.single('digit'), async function (req, res) {
    const image = Float32Array.from(await sharp(req.file.buffer).resize(28, 28).grayscale().raw().toBuffer())
    const session = await ort.InferenceSession.create('../models/mnist_cnn.onnx')
    const input = new ort.Tensor('float32', image, [1, 1, 28, 28])

    const output = await session.run({
        "input.1": input
    })
    const predictedNumber = argMax(output['18'].data)
    res.send({
        predictedNumber: predictedNumber
    })
})

app.listen(port, () => {
    console.log(`Staring inference server on ${port}`)
})

const argMax = (array) => {
    return [].reduce.call(array, (m, c, i, arr) => c > arr[m] ? i : m, 0);
}
