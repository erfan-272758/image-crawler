# Image Crawler
crawl image from google photos, resize and reduce them and finally save them into PostgreSQL

## Local
### Pre Requirement
- PostgreSQL
- NodeJS
- Yarn

1) Install packages
```bash
yarn
```
2) Copy `.env` file into `.env.local`
```bash
cp .env .env.local
```
3) Fill `.env.local`

4) Run
```bash
yarn start
```

## Docker
run with docker compose:
```bash
docker compose up -d
```


