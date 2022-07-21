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
### Using X.509 Certificate
Place X509 certificate in the poject parent directory `./`

Set the following in `.env`:

```
MONGO_DB={your_db_Name}
MONGO_URI={your_MongoDB_Connection_URI}
X509_FILE_NAME={your_X509-cert-name.pem}
AUTH__METHOD=X509
```
### Using SCRAM

Set the following in `.env`:

```
MONGO_DB={your_db_Name}
MONGO_SCRAM_PREFIX={mongodb+srv://} -or- {mongodb://}
MONGO_USER={your_username}
MONGO_USER_PASSWORD={your_password}:!
MONGO_URI_SCRAM={your_uri_without_prefix}
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
