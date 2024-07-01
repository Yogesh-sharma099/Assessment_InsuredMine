const express = require('express');
const app = express();
const uploadRoute = require('./routes/upload');
const searchRoute = require('./routes/search');
const aggregateRoute = require('./routes/aggregate');
const postServiceRoute = require('./routes/post-service');

app.use(express.json());
app.use('/upload', uploadRoute);
app.use('/search', searchRoute);
app.use('/aggregate', aggregateRoute);
app.use('/post-service', postServiceRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});