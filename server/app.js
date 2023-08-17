// const path = require('path')
// const express = require('express')
// const morgan = require('morgan')
// const app = express()
// module.exports = app

// // logging middleware
// app.use(morgan('dev'))

// // body parsing middleware
// app.use(express.json())

// // auth and api routes
// app.use('/auth', require('./auth'))
// app.use('/api', require('./api'))

// app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '..', 'public/index.html')));

// // static file-serving middleware
// app.use(express.static(path.join(__dirname, '..', 'public')))

// // any remaining requests with an extension (.js, .css, etc.) send 404
// app.use((req, res, next) => {
//   if (path.extname(req.path).length) {
//     const err = new Error('Not found')
//     err.status = 404
//     next(err)
//   } else {
//     next()
//   }
// })

// // sends index.html
// app.use('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'public/index.html'));
// })

// // error handling endware
// app.use((err, req, res, next) => {
//   console.error(err)
//   console.error(err.stack)
//   res.status(err.status || 500).send(err.message || 'Internal server error.')
// })

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app); // Create an HTTP server with the Express app
const io = socketIo(server); // Initialize Socket.IO with the server

// Attach Socket.IO event handlers
io.on('connection', (socket) => {
  // Handle user joining a quiz session
  socket.on('join', (sessionId) => {
    // ... your code here ...
  });

  // Handle user submitting answers
  socket.on('submit', (data) => {
    // ... your code here ...
  });
});

module.exports = app;

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(express.json());

// auth and api routes
app.use('/auth', require('./auth'));
app.use('/api', require('./api'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'public/index.html')));

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

// Start the HTTP server instead of the Express app
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
