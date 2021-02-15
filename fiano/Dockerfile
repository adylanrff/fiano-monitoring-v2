FROM python:3
ENV PYTHONUNBUFFERED=1
RUN apt install libpq-dev
WORKDIR /src
EXPOSE 8000
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
