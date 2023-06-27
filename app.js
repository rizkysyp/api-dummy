var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const data = [
  { id: 1,id_pelanggan: 1111, nama: "Rizky", status: 0 ,kota: "batam"},
  { id: 2,id_pelanggan: 2222, nama: "Satria", status: 1 ,kota: "Jakarta"},
  { id: 3,id_pelanggan: 3333,nama: "Yaqin", status: 2 ,kota: "Bekasi"},
  { id: 4,id_pelanggan: 4444, nama: "Vira", status: 0 ,kota: "Yogyakarta"},
  { id: 5,id_pelanggan: 5555, nama: "Rizky S", status: 1 ,kota: "batam"},
  // tambahkan data lain di sini
];

app.get('/', (req, res) => {
  res.json(data);
});

app.get('/:id', (req, res) => {
  const id = req.params.id; // Get the value of ":id" from the request URL
  const matchedData = data.find(item => item.id_pelanggan.toString() === id);

  if (matchedData) {
    res.json(matchedData);
  } else {
    res.status(404).json({ message: 'Data not found' });
  }
});
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
