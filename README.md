## Current state

<img width="2538" height="1283" alt="blog_preview" src="https://github.com/user-attachments/assets/b3d5332c-5926-4d39-a948-f59499b7e6c6" />

## Installation

### Configure env files

Edit `backend.env` and `frontend.env` in the repo root with your values.

### Start the docker compose

```sh
docker compose build
docker compose up -d
```

## Deploy on server

>[!WARNING]
> Vite bakes `VITE_*` variables at **build time**. Set them inside `Frontend/Dockerfile` before building the production image.

Create a context to execute **Docker** commands against your VPS.
```sh
docker context create blog --host=ssh://<username>@<ip>
```

Use that context.
```sh
docker context use blog
```

```sh
docker swarm init
```

Add secrets
```sh
echo "PUT_STRING_HERE" | docker secret create db_connection_string -
echo "PUT_STRING_HERE" | docker secret create jwt_key -
echo "PUT_STRING_HERE" | docker secret create jwt_issuer -
echo "PUT_STRING_HERE" | docker secret create jwt_audience -
```

Deploy to the VPS

```sh
docker stack deploy blog -c docker-swarm.yaml --with-registry-auth
```
