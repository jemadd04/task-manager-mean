const express = require('express');
const app = express();

const mongoose = require('./db/mongoose');

const bodyParser = require('body-parser');

// Load in Mongoose models
const { List, Task } = require('./db/models');

// Load middleware
app.use(bodyParser.json());

// Route Handlers

// List Routes

/**
 * GET /lists
 * Purpose: Get all lists
 */
app.get('/lists', (req, res) => {
  // Return array of lists in database
  List.find({}).then(lists => {
    res.send(lists);
  });
});

/**
 * POST /lists
 * Purpose: Create a list
 */
app.post('/lists', (req, res) => {
  // Create new list and return new list doc back to user (which includes ID)
  // List information (fields) will be passed in via JSON request body
  let title = req.body.title;

  let newList = new List({
    title
  });
  newList.save().then(listDoc => {
    // the full list document is returned (incl. id)
    res.send(listDoc);
  });
});

/**
 * PATH /lists/:id
 * Purpose: Update a specified list
 */
app.patch('/lists/:id', (req, res) => {
  // Update specified list with new values specified in JSON body of the request
  List.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body
    }
  ).then(() => {
    res.sendStatus(200);
  });
});

/**
 * PATH /lists/:id
 * Purpose: Delete a list
 */
app.delete('/lists/:id', (req, res) => {
  // Delete specified list
  List.findOneAndRemove({
    _id: req.params.id
  }).then(removedListDoc => {
    res.send(removedListDoc);
  });
});

/**
 * GET /lists/:listId/tasks
 * Purpose: Get all tasks in a specific list
 */
app.get('/lists/:listId/tasks', (req, res) => {
  // Return all tasks that belong to a specific list
  Task.find({
    _listId: req.params.listId
  }).then(tasks => {
    res.send(tasks);
  });
});

/** Test */

/**
 * POST /lists/:listId/tasks
 * Purpose: Create a new task in a specific list
 */
app.post('/lists/:listId/tasks', (req, res) => {
  // Create a new task in a list specified by listid
  let newTask = new Task({
    title: req.body.title,
    _listId: req.params.listId
  });
  newTask.save().then(newTaskDoc => {
    res.send(newTaskDoc);
  });
});

/**
 * PATCH /lists/:listId/tasks/:taskId
 * Purpose: Update an existing task
 */
app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
  // Update an existing task (specified by taskID)
  Task.findOneAndUpdate(
    {
      _id: req.params.taskId,
      _listId: req.params.listId
    },
    {
      $set: req.body
    }
  ).then(() => {
    res.sendStatus(200);
  });
});

/**
 * DELETE /lists/:listId/tasks/:taskId
 * Purpose: Delete a task
 */
app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
  Task.findOneAndRemove({
    _id: req.params.taskId,
    _listId: req.params.listId
  }).then(removedTaskDoc => {
    res.send(removedTaskDoc);
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
