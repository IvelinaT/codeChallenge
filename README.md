# codeChallenge
HTTP job processing service.
A job is a collection of tasks, where each task has a name and a shell command. Tasks may depend on other tasks and require that those are executed beforehand. The service takes care of sorting the tasks to create a proper execution order.
 - The service should be able to return an array of ordered tasks.
 - Additionally, the service should be able to return a bash script representation
## Getting Started

Installing dependencies:

```
nvm use && npm i
```

Starting the service:
frontend:
```
npm start
```

The service should be up and running on the port 4000. 
_Note: you can change the port application is running. For example if you want it running on port 8080, start the app 
```PORT=8080 npm start```
### Run all unit and system tests

```
npm test
```

### Run all unit tests

```
npm run test:coverage
```

### Run the Postman API test suite only

```
npm run test:integration
```
# For bash script representation directly
curl -H "Content-Type: application/json" -d @tasks.json http://localhost:4000 | bash


# For array response 
Can be tested via [Postman](https://www.postman.com/)
Example request:
![postman screenshot](https://github.com/IvelinaT/codeChallenge/blob/master/assets/postman.png?raw=true)

_Note: tasks listed in the response will be executed