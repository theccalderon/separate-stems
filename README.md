# Starter for deploying apps on [Render](https://render.com)

This repo follows [fast.ai](https://github.com/fastai/fastai) to deploy apps on Render. It's been modified accordingly for this application.

You can test your changes locally by installing Docker and using the following command:

```
docker build -t separate-stems . && docker run --rm -it -p 5000:5000 separate-stems
```

The guide for production deployment to Render is at https://course.fast.ai/deployment_render.html.
