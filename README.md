# clinic-api

## Setup

### To run in a docker container
Install docker and run the following commands
  - `docker build -t {username}/clinic-api . `
  - `docker run -d -p 3000:3000 {username}/clinic-api `
  - `docker ps -a` 


### Running the api locally
  - `npm install`
  - `npm run start`
  
### Run Tests
  - `npm run test`
  
## Examples
  1. State can either be a state name or a state code (state=CA , state=California)
  - e.g `curl http://localhost:3000/api/clinic?state=FL`
  
  2. name = Mayo Clinic and state = Florida
  - e.g `curl http://localhost:3000/api/clinic?state=Florida&name=Mayo%20Clinic `
  
  3. from = 10:00 and to = 22:00
  - e.g `curl http://localhost:3000/api/clinic?from=10:00&to=22:00`
  

