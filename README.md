# Internet Movie Graph Database
![Border](static/readme/separator.png)
<div id="top"></div>
<span>
<img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" />
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" />
<img src="https://img.shields.io/badge/Neo4j-018bff?style=for-the-badge&logo=neo4j&logoColor=white" />
</span>


## Table of Contents
![Border](static/readme/separator.png)

- [Description](#description)
- [Frameworks and Tools](#frameworks-and-tools)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Tests](#tests)
- [Roadmap](#roadmap)


## Description
![Border](static/readme/separator.png)

IMGDb is a scalable and dynamic web application that primarily was built to propose an alternative architecture to host a functional and viable movie database. The main features of this application are:
- **Microservices**: Use of microservices has been done so as to facilitate the segregation of services into individual components that can be scaled and operated individually running as separate containers. The orchestration is done using Docker Compose. This ensures lightweight service deployments without resorting to a bulky monolith.
- **Graph Database**: Use of Neo4j is done to represent data of movies in a graphical format. Data points are represented as nodes and relations are represented by edges. This is helpful in this case since designing a recommendation system becomes possible when the data is relationship-forward rather than entity-forward (focus is more on the relationships rather than data itself). 
- **Recommendation Engine**: Personalized movie recommendations are possible by gathering data of favourite movies of users with accounts. Instead of using ML features, we use Collaborative Filtering in graph databases. This is done using structuring a Cypher Query in a particular format so that it can give data that map to respective relations.
- **Scheduled Data Population**: TMDb is a free API service that can be used to fetch movie data. We use a scheduler that runs periodically to fire a GET request to the API. The harnessed data is pushed to the database along the pipeline after restructuring it to fit an object node. This is how the native database is populated without user intervention. The scheduler runs by itself as a Python script in a container.
The future scope of the project would be to extend the functionality using Redis caches, incorporate tighter security measures, make the application more extensive and user-friendly by having more utilities such as user comments, interactions, etc.
- **Dependencies**: There is only one dependency for running the application: Docker. We do not have to think about the environment versions and requirements. All of that is take care when we run Compose.

<p align="right">(<a href="#top">Top</a>)</p>


## Frameworks and Tools
![Border](static/readme/separator.png)

The major frameworks, tools, services and APIs used for the making of this project is hereby listed:
- **Flask**: API server and website backend.
- **React**: UI and website frontend.
- **Neo4j**: Graph database.
- **Docker Compose**: Microservices and container orchestration.

<p align="right">(<a href="#top">Top</a>)</p>


## Prerequisites
![Border](static/readme/separator.png)

Install Docker and configure Compose. That is the only requirement.

<p align="right">(<a href="#top">Top</a>)</p>


## Installation
![Border](static/readme/separator.png)

1. Clone the repository:
    ```sh
    git clone https://github.com/Diptonil/imgdb.git
    ```
2. Run Compose:
    ```sh
    docker compose up
    ```
    
The time to spin up the containers would vary for different systems. However, at least ten minutes would be needed for the architecture to get built. It is recommended to not run the application on a system not tolerant to heavier loads.

<p align="right">(<a href="#top">Top</a>)</p>


## Roadmap
![Border](static/readme/separator.png)

There are subsequent upgrades to be made to the project to reach the final stage. Here are a list of all immediate objectives:

- [x] Configure initial particulars and services.
- [x] Develop authentication and authorization scheme.
- [x] Develop recommendation Engine.
- [x] Design microservices.
- [x] Develop scheduler service to fetch and push data down the pipeline.
- [ ] Place in standard deployment practices.
- [ ] Bring in CI/CD features.
- [ ] Deploy caching.
- [ ] Tighten security.
- [ ] UI and UX improvements.
