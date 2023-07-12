var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');
var cloudinary = require('cloudinary').v2;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dtow6mgju',
  api_key: '259468891937896',
  api_secret: 'O7JrZxKF4Q13x0Y_dqnrOhKcnsE'
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const data = [
  { id: 1,id_pelanggan: 1111, nama: "Rizky", status: 0 ,kota: "batam",phoneNumber : "0938292"},
  { id: 2,id_pelanggan: 2222, nama: "Satria", status: 1 ,kota: "Jakarta" ,phoneNumber : "02182727"},
  { id: 3,id_pelanggan: 3333,nama: "Yaqin", status: 2 ,kota: "Bekasi",phoneNumber : "028229"},
  { id: 4,id_pelanggan: 4444, nama: "Vira", status: 0 ,kota: "Yogyakarta",phoneNumber : "929291"},
  { id: 5,id_pelanggan: 5555, nama: "Rizky S", status: 1 ,kota: "batam",phoneNumber : "2020228"},
  // tambahkan data lain di sini
];

// File upload middleware
const upload = multer({ dest: 'uploads/' });

app.get('/', (req, res) => {
  res.json(data);
});

app.get('/:id', (req, res) => {
  const id = req.params.id; // Get the value of ":id" from the request URL
  const matchedData = data.find(item => item.id_pelanggan.toString() === id || item.phoneNumber.toString() === id);

  if (matchedData) {
    res.json(matchedData);
  } else {
    res.status(404).json({ message: 'Data not found' });
  }
});

app.get('/phone/:id', (req, res) => {
  const id = req.params.id; // Get the value of ":id" from the request URL
  const matchedData = data.find(item => item.phoneNumber.toString() === id);

  if (matchedData) {
    res.json(matchedData);
  } else {
    res.status(404).json({ message: 'Data not found' });
  }
});

// Image upload API
app.post('/upload', upload.single(), (req, res) => {
  if (!req.file) {
    res.status(400).json({ message: 'No image file found' });
    return;
  }

  // Access the uploaded file through req.file
  const { path, originalname } = req.file;

  // Upload the file to Cloudinary
  cloudinary.uploader.upload(path, { folder: 'uploads' }, (error, result) => {
    if (error) {
      console.log('Error uploading image:', error);
      res.status(500).json({ message: 'Failed to upload image' });
    } else {
      // Log the Cloudinary response to the console
      console.log('Cloudinary response:', result);
      res.json({ message: 'Image uploaded successfully', url: result.secure_url });
    }

    // Remove the temporary file from the server
    fs.unlinkSync(path);
  });
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
