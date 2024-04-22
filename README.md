# CookEase
## Link to Figma design
- You can view Figma design here: https://www.figma.com/file/OADDIUCHhVfEmb6IERJnwe/Recipe-website?type=design&node-id=54%3A1928&mode=design&t=SJ5fOUlabpOqK1bs-1
## How to launch the application
- To launch the application locally you will need to have `Docker Desktop` installed and setup it to use `Linux containers`.
- Open up the repository in Visual Studio.
- At the top of it you will need to select `docker-compose` as a startup project.
- Then click on the `Docker Compose` launch button and it will create a container containing the `Client`, `Server`, `Postgres` and `pgAdmin`.
- For launching:
	- **Frontend** use `http://localhost:5001`
	- **Backend** use `http://localhost:5000/swagger/index.html`
	- **pgAdmin** use `http://localhost:5050`
## How to use pgAdmin
- After launching `Docker Compose` go to `http://localhost:5050`.
- Enter email `postgres@email.com` and password `password`.
- *(Initial local setup)* In order to access the database you will need to connect to it:
	- Click on `Add New Server`.
	- In the `General` tab enter any name for the server.
	- Click on `Connection` tab.
	- In the `Host name/address` enter `postgres-db`.
	- Port = `5432`.
	- Maintenance database = `cookease-db`.
	- Username = `postgres`.
	- Password = `password`.
	- Select `Save password`.
	- Click `Save`.
