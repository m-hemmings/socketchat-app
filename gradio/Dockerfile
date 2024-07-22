FROM python:3.12

WORKDIR /app

COPY ./server/package.json .
RUN pip install --no-cache-dir -r package.json

COPY ./server .

EXPOSE 5000

CMD ["python", "server.py"]
