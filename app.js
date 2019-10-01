const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const patientRoutes = require('./routes/patients');
const opdRoutes = require('./routes/opd');
const xrayRoutes = require('./routes/xray');
const ecgRoutes = require('./routes/ecg');
const injectionRoutes = require('./routes/injection');
const dressingRoutes = require('./routes/dressing');
const othersRoutes = require('./routes/others');
const proceduresRoutes = require('./routes/procedures');
const dailySummaryRoutes = require('./routes/dailysummary');
const updateRoutes = require('./routes/update');
const mainStockRoutes = require('./routes/stock/MainStock');
const db = require('./db');

const app = express();
var date = new Date();
var newDate = date.getDate().toLocaleString();
var newMonth = (1+date.getMonth());
var newYear = date.getFullYear().toString();
var newYearSmall = date.getYear()-100;
var opdDate = ''+newDate+newMonth+newYearSmall;
app.use(bodyParser.json());


app.use((req, res, next) => {
  // Set CORS headers so that the React SPA is able to communicate with this server
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,PATCH,DELETE,OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/OPD'+opdDate, patientRoutes);
app.use('/xray'+opdDate, xrayRoutes);
app.use('/ecg'+opdDate, ecgRoutes);
app.use('/injection'+opdDate, injectionRoutes);
app.use('/dressing'+opdDate, dressingRoutes);
app.use('/others'+opdDate, othersRoutes);
app.use('/procedures'+opdDate, proceduresRoutes);
app.use('/dailysummary'+opdDate, dailySummaryRoutes);
app.use('/update', updateRoutes);
app.use('/mainstock', mainStockRoutes);

app.use('/',patientRoutes);




db.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(3100);
  }
});
