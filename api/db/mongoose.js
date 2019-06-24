// This file will handle connection logic to MongoDB database

const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // sets to global js promise
mongoose
  .connect('mongodb://localhost:27017/TaskManager', { useNewUrlParse: true })
  .then(() => {
    console.log('Connected to MongoDB successfully :)');
  })
  .catch(e => {
    console.log('Error while attempting to connect to MongoDB');
    console.log(e);
  });

// To prevent deprecation warnings (from MongoDB native driver)
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = {
  mongoose
};
