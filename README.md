# Starter for deploying apps on [Render](https://render.com)

This small, full stack application integrates a Deep Learning model by [Deezer](https://github.com/deezer/spleeter) and makes it a REST endpoint that can be used to separate vocals and accompaniment from an audio file. 

It follows [fast.ai's](https://github.com/fastai/fastai) to deploy apps on Render. It's been modified accordingly for this application.

You can select an audio file and separate the vocals and accompaniment. The vocals/accompaniment will be downloaded by your web browser and the original file will not be saved anywhere.

You can test your changes locally by installing Docker and using the following command:

```
docker build -t separate-stems . && docker run --rm -it -p 5000:5000 separate-stems
```

The guide for production deployment to Render is at https://course.fast.ai/deployment_render.html.
