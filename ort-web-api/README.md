Usage:

```shell
curl --request POST \
  --url http://localhost:3000/classify-digit \
  --header 'Content-Type: multipart/form-data' \
  --form digit=examples/3.png
```