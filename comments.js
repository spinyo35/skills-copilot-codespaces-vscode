// Create web server
// 1. Create web server
// 2. Create route to handle GET request
// 3. Create route to handle POST request
// 4. Create route to handle PUT request
// 5. Create route to handle DELETE request

// 1. Create web server
const express = require("express");
const app = express();

// 2. Create route to handle GET request
app.get("/api/comments", (req, res) => {
  res.send(comments);
});

// 3. Create route to handle POST request
app.post("/api/comments", (req, res) => {
  // Create new comment object
  const comment = {
    id: comments.length + 1,
    name: req.body.name,
    comment: req.body.comment,
  };
  // Add new comment to array
  comments.push(comment);
  // Return new comment to client
  res.send(comment);
});

// 4. Create route to handle PUT request
app.put("/api/comments/:id", (req, res) => {
  // Find comment with given id
  const comment = comments.find((c) => c.id === parseInt(req.params.id));
  // If comment not found, return 404
  if (!comment) res.status(404).send("Comment not found");

  // Validate
  // If invalid, return 400 - Bad request
  const { error } = validateComment(req.body);
  if (error) res.status(400).send(error.details[0].message);

  // Update comment
  comment.name = req.body.name;
  comment.comment = req.body.comment;

  // Return updated comment
  res.send(comment);
});

// 5. Create route to handle DELETE request
app.delete("/api/comments/:id", (req, res) => {
  // Find comment with given id
  const comment = comments.find((c) => c.id === parseInt(req.params.id));
  // If comment not found, return 404
  if (!comment) res.status(404).send("Comment not found");

  // Delete comment
  const index = comments.indexOf(comment);
  comments.splice(index, 1);

  // Return deleted comment
  res.send(comment);
});

// Create server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

