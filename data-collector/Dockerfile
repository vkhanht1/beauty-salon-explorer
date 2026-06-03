FROM python:3.10-alpine
WORKDIR /app

RUN apk add --no-cache sqlite build-base

COPY requirements.txt* ./
RUN if [ -f requirements.txt ]; then pip install --no-cache-dir -r requirements.txt; fi

COPY . .

CMD ["python", "generate_data.py"]