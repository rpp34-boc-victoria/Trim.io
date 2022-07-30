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

## Notification Service Set up

Fill out the following in the `./client/.env`

```
REACT_APP_PUBLIC_VAPID_KEY={/*FILL ME IN*/}
```

Fill out the followinf in the `./.env` in the parent directory
```
PUBLIC_VAPID_KEY={/*FILL ME IN*/}
PRIVATE_VAPID_KEY={/*FILL ME IN*/}
WEB_PUSH_CONTACT={/*FILL ME IN*/}
```

## Connecting to MongoDB
### Using X.509 Certificate
Place X509 certificate in the project parent directory `./`

See `.env.example` to and complete the `{/*FILL ME IN*/}`:
```
PORT=8000
MONGO_DB=trim-io
AUTH__METHOD=X509
ENVIRONMENT=DEV
MONGO_URI_X509={/*FILL ME IN*/}
X509_FILE_NAME={/*FILL ME IN*/}
```
NOTE: `ENVIRONMENT=DEV` should only be used for development environment. Deployed instance should not have this variable.

### Create Your Own DB Configuration:
Set the following in `.env`
```
MONGO_DB={your_db_Name}
MONGO_URI={your_MongoDB_Connection_URI}
X509_FILE_NAME={your_X509-cert-name.pem}
AUTH_METHOD=X509
```
### Using SCRAM (username and password)

Set the following in `.env` with the proper URI format:

```
MONGO_FULL_URI=mongodb+srv://{username}:{password}@{host}/
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

### Side notes

chrome dev tools -> application -> service workers -> click update on reload

turn on notification for your brower