## zero-to-auth App

The zero-to-auth App is a sample app that can be useful for the "**Adding authentication flow using Descope**" workshop. This app includes:

- NodeJS server
- React App client

## Getting Started

Follow these steps to quickly get started:

1. Install dependencies (root level)- `npm install`
2. Start the zero-to-auth (root level) - `npm run dev`

Now the client is running on `http://localhost:3000` and the server is running on port `4000`.

Configure server port by setting the following environment variables:

```
server/.env
# should be the same as the client port
PORT=8082
```

```
client/.env
# should be the same as the server port
REACT_APP_SERVER_PORT=8082
```
