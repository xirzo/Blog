## Current state

<img width="2538" height="1283" alt="blog_preview" src="https://github.com/user-attachments/assets/b3d5332c-5926-4d39-a948-f59499b7e6c6" />

## Installation (for development)
### Copy env files and **put values in them**

```sh
cp backend.env Backend/.env
cp frontend.env Frontend/.env
```

### Start the docker compose

```sh
docker-compose build
docker-compose up -d
```


## Deploy on server

> ![WARNING]
> When building frontend image for production, set ENVs inside of the Dockerfile.

Create context to execute **Docker** commands as if you were on VPS.
```sh
docker context create blog --host=ssh;://<username>@<ip>
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
echo "PUT_STRING_HERE" | docker secret create DB_CONNECTION_STRING -
```

Deploy to the VPS

```sh
docker stack deploy blog -c docker-stack.yaml --with-registry-auth
```
