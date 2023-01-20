# Purrfect Creations Dashboard

## Prerequisites

- Docker installed
- Airtable bearer token (with minimum read scope)

---

## Set up
In the project root type the following commands:

1. Add .env file
```sh
cp .env.example .env
```
2. Open .env file and paste *YOUR VALID* bearer token to the `AIRTABLE_BEARER_TOKEN` env var.
```
AIRTABLE_BEARER_TOKEN=patmTEnhFoXKVCt4H.9a20ee86fb7786fe54f923ajklsdlakfjasdlfjk893475897skjh34987fhkhj3
```

3. Build images & run containers
```sh
docker-compose up -d
```

Go to http://localhost:3000 and the page should load with the correct stats

---

## Running tests
1. You can enter the node container with the follow command (assuming its running).
```sh
docker-compose exec node sh
```
2. Now run the tests in the container
```sh
npm test
```
