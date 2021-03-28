FROM python:3.6-slim-buster

RUN apt-get update 

WORKDIR /app/api
COPY codepenclone/requirements.txt /app/api
RUN pip install -r requirements.txt
COPY . /app/api
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]