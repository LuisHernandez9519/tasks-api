<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

Desplegar un nuevo contenedor de postgre
docker run -d -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -e POSTGRES_DB=task_db -p 5432:5432 -v ./taskDB:/var/lib/postgresql/ --name container-task-db postgre    