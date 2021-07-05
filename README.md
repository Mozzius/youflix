# Youflix

YouTube in the style of Netflix

## Getting Started

First, generate some Google Oauth2 keys, and then enable the YouTube Data API.

Create a `.env` file and add the following:

```env
YT_CLIENT_ID=<youtube client id>
YT_CLIENT_SECRET=<youtube client secret>
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<a random string>
```

Then install the dependencies and run the development server:

```bash
yarn

yarn dev
```

Open [http://localhost:3000](http://localhost:3000) and log in with your google account.