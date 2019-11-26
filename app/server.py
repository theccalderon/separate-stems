import aiohttp
import asyncio
import uvicorn
# from fastai import *
# from fastai.vision import *
from pathlib import Path
from io import BytesIO
from starlette.applications import Starlette
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import HTMLResponse, JSONResponse, FileResponse
from starlette.staticfiles import StaticFiles
from spleeter.separator import Separator
import sys
import tempfile
import os


# export_file_url = 'https://www.dropbox.com/s/6bgq8t6yextloqp/export.pkl?raw=1'
# export_file_name = 'export.pkl'

# classes = ['black', 'grizzly', 'teddys']
path = Path(__file__).parent

app = Starlette()
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_headers=['X-Requested-With', 'Content-Type'])
app.mount('/static', StaticFiles(directory='app/static'))


# async def download_file(url, dest):
#     if dest.exists(): return
#     async with aiohttp.ClientSession() as session:
#         async with session.get(url) as response:
#             data = await response.read()
#             with open(dest, 'wb') as f:
#                 f.write(data)


# async def setup_learner():
#     await download_file(export_file_url, path / export_file_name)
#     try:
#         learn = load_learner(path, export_file_name)
#         return learn
#     except RuntimeError as e:
#         if len(e.args) > 0 and 'CPU-only machine' in e.args[0]:
#             print(e)
#             message = "\n\nThis model was trained with an old version of fastai and will not work in a CPU environment.\n\nPlease update the fastai library in your training environment and export your model again.\n\nSee instructions for 'Returning to work' at https://course.fast.ai."
#             raise RuntimeError(message)
#         else:
#             raise


loop = asyncio.get_event_loop()
# tasks = [asyncio.ensure_future(setup_learner())]
# learn = loop.run_until_complete(asyncio.gather(*tasks))[0]
loop.close()


@app.route('/')
async def homepage(request):
    html_file = path / 'view' / 'index.html'
    return HTMLResponse(html_file.open().read())


@app.route('/separate_vocals', methods=['POST'])
async def separate_vocals(request):
    audio_data = await request.form()
    separator = Separator('spleeter:2stems')
    audio_bytes = await (audio_data['file'].read())
    temp, pathname = tempfile.mkstemp()
    if (os.path.exists('/tmp/salsita/'+str(pathname).split('/')[2])):
        response = FileResponse('/tmp/salsita/'+str(pathname).split('/')[2]+'/vocals.wav', media_type = 'audio/wav',filename='vocals.wav')
        return response    
    with open(pathname, mode='wb') as f:
        f.write(audio_bytes)
    separator.separate_to_file(pathname, "/tmp/salsita")
    response = FileResponse('/tmp/salsita/'+str(pathname).split('/')[2]+'/vocals.wav', media_type = 'audio/wav',filename='vocals.wav')
    # await response(response)
    return response

@app.route('/separate_accompaniment', methods=['POST'])
async def separate_accompaniament(request):
    audio_data = await request.form()
    separator = Separator('spleeter:2stems')
    audio_bytes = await (audio_data['file'].read())
    temp, pathname = tempfile.mkstemp()
    if (os.path.exists('/tmp/salsita/'+str(pathname).split('/')[2])):
        response = FileResponse('/tmp/salsita/'+str(pathname).split('/')[2]+'/accompaniment.wav', media_type = 'audio/wav',filename='accompaniment.wav')
        return response   
    with open(pathname, mode='wb') as f:
        f.write(audio_bytes)
    separator.separate_to_file(pathname, "/tmp/salsita")
    response = FileResponse('/tmp/salsita/'+str(pathname).split('/')[2]+'/accompaniment.wav', media_type = 'audio/wav',filename='accompaniment.wav')
    # await response(response)
    return response


if __name__ == '__main__':
    if 'serve' in sys.argv:
        uvicorn.run(app=app, host='0.0.0.0', port=5000, log_level="info")
