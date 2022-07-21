# Trim.io

## Installation

```
npm run install-all
```
Install both client and server dependencies.

## Development

```
npm run dev
```
Runs client and server in development mode; use `http://localhost:3000/` during development

## Connecting to MongoDB
Place X509 certificate in the poject parent directory `./`

Create `.env` file and set the following variables

```
MONGO_DB={db_Name}
MONGO_URI={MongoDB_Connection_URI}
X509_FILE_NAME={X509-cert-name.pem}
```


## Build and Deploy
Set default port for the server by setting the following `.env` variable, default is `8000`
```
PORT={port_number}
```

### Build
```
npm run build
```
May take a while to install and build both the client and server

```
npm start
```
Run the production application and use `http://localhost:8000/` or user specified port for production
