# Next Calendar

A calendar application created using Next.js

![Week View](./docs/screen-shot.png)

## Installation

First clone this repo.

```bash
git clone https://github.com/srayner/next-calendar.git
```

Then change directory into the installation folder.

```bash
cd next-calendar
```

Finally install the dependencies

```bash
yarn install
```

Create environment file

```bash
cp .env.dist .env
```

You will need to have a postgres database server, and you should edit this .env file to contain the url to your database.

## Getting Started for development

First, run the development server:

```bash
yarn dev
```

Then navigate to [http://localhost:3000](http://localhost:3000) with your browser..

## Create a production build

Buid and start your production server:

```bash
yarn build
yarn start
```

Then navigate to [http://localhost:3000](http://localhost:3000) with your browser..
