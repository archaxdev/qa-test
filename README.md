# QA Test Automation Engineer

## The Task

Write tests for each of the API endpoints described in [documentation](http://localhost:8080/docs). 
Approach this as you would normally given the stories below. Use which ever tools & methods you think are
most suitable for this type of task.

Here are the stories for the work:

### As a user, I want to be able to fetch a list of countries, so that I can display them in my own application.

#### Acceptance Criteria:
* The endpoint should be publicly available
* The countries should be sorted by their population by default

### As an admin, I want to be able to update a countries population, so that I can ensure the populations are accurate when new consensus data is made available.

#### Acceptance Criteria:
* The endpoint should be password protected using `admin` and `p@55w07d`
* Only the population should be updatable

### As an admin, I want to be able to remove a country from the list, so that I can maintain only countries that make it on to my chart.

#### Acceptance Criteria:
* The endpoint should be password protected using `admin` and `p@55w07d`
* Should completely remove the country from the internal list and subsequent calls to the fetch countries endpoint

### As an admin, I want to be able to reset the database back to it's original state, so that I can quickly recover from any problems that might be introduced when editing.

#### Acceptance Criteria:
* The endpoint should be password protected using `admin` and `p@55w07d`

Feel free to use the internet including Google and Stackoverflow to help with the task.

## Running the test

### Start docker

```bash
docker-compose up
```

### Install the dependencies

```bash
yarn
```

## Running the app

Before starting, ensure that a Redis instance is setup and the connection details are provided in `config/default.js`

```bash
yarn start
```

## Documentation URL

Once you have the application running you'll be able to access the [documentation](http://localhost:8080/docs)