FROM python:3.7-slim-stretch

# RUN apt-get update && apt-get install -y git python3-dev gcc \
#     && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install -y git python3-dev gcc

#needed for ffmpeg, ffprobe
ADD ffmpeg-git-20191121-amd64-static/ /usr/local/bin

COPY requirements.txt .

RUN pip install --upgrade -r requirements.txt

COPY app app/

RUN python app/server.py

EXPOSE 5000

RUN apt-get install -y cron
ADD crontab /etc/cron.d/
# RUN cp /root/the-creator-scripting/install/crontab-${dev_environment} /etc/cron.d/
# RUN mv /etc/cron.d/crontab-${dev_environment} /etc/cron.d/crontab
RUN chmod 777 /etc/cron.d/crontab
RUN crontab /etc/cron.d/crontab

CMD ["python", "app/server.py", "serve"]
