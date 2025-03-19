# **Run Database Guardian Using Docker**

Run the **Database Guardia CLI** tool using Docker without needing to install Go or any dependencies locally.

## **Prerequisites**

- Docker installed on your machine. [Install Docker](https://docs.docker.com/get-docker/).

## **Run Database Guardian CLI**

1.  Pull the Docker image from Docker Hub:

    ```bash
    docker pull annany/guard:latest
    ```

2.  Run the image interactively:

    ```bash
    docker run --rm -it annany/guard:latest /bin/bash
    ```

    - This will start a shell inside the container where you can run `guard` commands. Note that when you'll exit the container, it will be deleted.
    - If you want your container to **persist** even after you exit the interactive Bash session, you should run it in **detached mode** (-d) without the --rm flag.

    ```bash
    docker run -dit --name guard-container annany/guard:latest /bin/bash
    ```

3.  Reattach to the container:

    You can reattach to the running/stopped container using:

    ```bash
    docker start -ai guard-container  # Start and attach
    ```

    **or**

    ```bash
    docker exec -it guard-container /bin/bash  # Open a new Bash session inside
    ```

4.  Persist Logs:

    By default, Docker saves container logs, and you can view them with:

    ```bash
    docker logs -f guard-container  # Follow logs in real-time
    ```

    If you want to persist logs to a file on your host machine, mount a volume:

    ```bash
    docker run -dit --name guard-container -v $(pwd)/logs:/var/log annany/guard:latest /bin/bash
    ```

    - This saves logs inside logs/ on your machine.

5.  Persist Data Using Volumes

    - If guard generates files, save them outside the container using a named volume:

      ```bash
      docker run -dit --name guard-container -v guard-data:/app/data annany/guard:latest /bin/bash
      ```

The guard-data volume persists even if the container is removed.

- Later, you can find the data using:

  ```bash
  docker volume inspect guard-data
  ```

- If you want to store data in a specific host folder:

  ```bash
  docker run -dit --name guard-container -v $(pwd)/data:/app/data annany/guard:latest /bin/bash
  ```

- This ensures data is accessible at ./data on your host machine.

## Summary

| Goal                           | Command                                                                | Description                    |
| ------------------------------ | ---------------------------------------------------------------------- | ------------------------------ |
| Run container persistently     | `docker run -dit --name guard-container annany/guard:latest /bin/bash` | Run container persistently     |
| Reattach to container          | `docker exec -it guard-container /bin/bash`                            | Reattach to container          |
| Persist logs                   | `docker logs -f guard-container`                                       | Persist logs                   |
| Save logs to file              | `docker run -dit -v $(pwd)/logs:/var/log ...`                          | Save logs to file              |
| Persist data                   | `docker run -dit -v guard-data:/app/data ...`                          | Persist data                   |
| Restart container              | `docker start guard-container`                                         | Restart container              |
| Remove container but keep data | `docker rm -f guard-container`                                         | Remove container but keep data |

## Attaching an image for reference

![image](https://github.com/user-attachments/assets/b97f9e05-53de-4001-ad22-41fe22ba895f)
