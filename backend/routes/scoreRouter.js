const { Router } = require("express");
const scoreRouter = Router();
const scoreController = require('../controllers/scoreController')

//get all scores for a certain photo
scoreRouter.get('/highscores/:photoId', scoreController.getAllScores)
//post a high score for a certain photo
scoreRouter.post('/postscore', scoreController.addScore)
//get the top scores for a certain photo
scoreRouter.get('/:photoId', scoreController.getTopScores)

module.exports = scoreRouter;