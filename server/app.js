const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

/**** Configuration ****/
const port = process.env.PORT || 8085;
const app = express();

app.use(cors());
app.use(bodyParser.json()); // Parse JSON from the request body

app.use(morgan('combined')); // Log all requests to the console
app.use(express.static('../client/build')); // Needed for serving production build of React

/**** Database ****/
const KMS_DB = require('./db')(mongoose);

/**** Routes ****/

/*Get the questions in the database*/
app.get('/api/questions', async (request, response) => {
    const questions = await KMS_DB.getQuestions();
    response.json(questions);
});

app.get('/api/questions/:id', async (request, response) => {
    let id = request.params.id;
    const question = await KMS_DB.getQuestion(id);
    response.json(question);
});

/*Post a new question*/
app.post('/api/questions', async (request, response) => {
    let question = {
        title : request.body.title,
        desc : request.body.desc
    };
    const newQuestion = await KMS_DB.createQuestion(question);
    response.json(newQuestion);
});

/*Post a answer on a question*/
app.post('/api/questions/:id', async (request, response) => {
    let questionID = request.params.id;
    const newAnswer = await KMS_DB.createAnswer(questionID, request.body.text);
    response.json(newAnswer);
});

/*Post a vote on an answer either upvote or downvote*/
app.put('api/answer/:id', async (request, response) => {
    let answerID = request.params.id;
});


// "Redirect" all get requests (except for the routes specified above) to React's entry point (index.html) to be handled by Reach router
// It's important to specify this route as the very last one to prevent overriding all of the other routes
app.get('*', (request, response) =>
    response.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
);

/**** Start ****/
const url = process.env.MONGO_URL || 'mongodb://localhost/kms_db';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(async () => {
        await KMS_DB.fillIfEmpty(); // Fill in test data if needed.
        await app.listen(port); // Start the API
        console.log(`KMS API running on port ${port}!`);
    })
    .catch(error => console.error(error));
