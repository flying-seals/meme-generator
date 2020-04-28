# Meme generator

Hi! This NodeJS app generates a random meme with the text you provide. What's more, you can run it as a Docker container. It was made as a part of the initiative [Akademia 3.0](http://akademia.media30.pl/#section-o-programie). Read the following instructions to run it locally.

## Before you start

To run this app you need:

- Docker
- NodeJS

## Quick start guide

### Without Docker

1. Install dependencies:

    ```bash
    cd service
    npm install
    cd ../front
    npm install
    cd ..
    ```

2. Run backend:

    ```bash
    node ./service/index.js
    ```

    >**NOTE:** When you run NodeJS on a version lower than 13, add the `--experimental-modules` flag.

3. Run frontend:

    ```bash
    node ./front/server.js
    ```

4. Open Meme Generator in your browser. Go to [http://localhost:8080/](http://localhost:8080/).

### With Docker

1. Build Docker images of the components:

    **Backend**

    ```bash
    docker build -t meme-generator ./service/.
    ```

    **Frontend**

    ```bash
    docker build -t meme-frontend ./front/.
    ```

2. To allow communication between containers, run:

    ``` bash
    docker network create webinar-network
    ```

3. Run backend:

    ```bash
    docker run -v $(pwd)/service/templates:/app/templates -v $(pwd)/service/memes:/app/memes -p 3000:3000 --network webinar-network --name generator meme-generator:latest
    ```

    >**NOTE**: If you use Windows, replace the `$(pwd)` with an absolute path to the project.

4. In a new terminal, run frontend:

    ```bash
    docker run -p 8080:8080 -e BACKEND_ADDRESS=generator --network webinar-network --name frontend meme-frontend:latest
    ```

    >**NOTE**: You can run both frontend and backend in a detached mode by adding a `-d` flag. Don't forget to kill the processes later with `docker kill`!

5. Open Meme Generator in your browser. Go to [http://localhost:8080/](http://localhost:8080/).

### With Docker-compose

1. Run both backend and frontend

```bash
docker-compose up
```

## Available backend endpoints

| Endpoint | Method | Behavior |
| -------- | ------ | --------- | 
| `/memes` | POST | Send a JSON `{"text":"YOUR TEXT"}` to generate a new meme. Sends the meme ID as a response. |
| `/memes` | GET | Lists all available memes IDs. |
| `/memes/:id` | GET | Responds with a meme assigned to the provided ID. |
| `/memes/:id` | DELETE | Deletes a meme assigned to the provided ID. |