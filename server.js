const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const seedAll = require('./seeds');
const cliArgs = process.argv.slice(2);


const app = express();
const PORT = process.env.PORT || 3002;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'ac5b36c9b7e8f37135561a8c955d9fce',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

/**
 * CONDITIONAL STARTUP:
 *    command-line:    node server            (starts server with database in existing state)
 *    command-line:    node server startover  (starts server and re-syncs database...all data is lost)
 *    command-line:    node server startseed  (starts server, re-syncs database...all data replaced with seed data)
 */
 if (cliArgs[0]) {

  if (cliArgs[0].toLowerCase() === 'startover') {

    console.log(`
  *************************************************
  *** STARTING OVER...ALL EXISTING DATA IS LOST ***
  *************************************************
  `);

    sequelize.sync({ force: true }).then(() => {
      app.listen(PORT, () => console.log('Now listening'));
    });

  } else if (cliArgs[0].toLowerCase() === 'startseed') {

    console.log(`
  *************************************************
  *** STARTING OVER...ALL EXISTING DATA IS LOST ***
  ********** DATABASE WILL BE RE-SEEDED ***********
  *************************************************
  `);
    sequelize.sync({ force: true }).then(async () => {
      await seedAll();
      app.listen(PORT, () => console.log('Now listening'));
    });
  }
} else {

  console.log("*** STARTING UP ***");

  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });
}
