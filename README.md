## TODO

- [] Add compose file for both frontend and backend

## Starting

### Copy env files and **put values in them**

```sh
cp backend.env Backend/.env
cp frontend.env Frontend/.env
```

### Start the backend

```sh
cd Backend
docker-compose build
docker-compose up -d
```

### Start the frontend

```sh
cd Frontend
npm install
npm run dev
```
