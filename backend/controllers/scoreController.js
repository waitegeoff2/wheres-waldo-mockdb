const db = require('../db/queries')

async function getTopScores(req, res) {
    try {
        let photoId = req.params.photoId;
        const scores = await db.getTopScores(photoId);
        res.json(scores)
    } catch (error) {
        next(error)
    }
}

async function getAllScores(req, res) {
    try {
        let photoId = req.params.photoId;
        console.trace(photoId)
        const scores = await db.getAllScores(photoId);
        res.json(scores)
    } catch (error) {
        next(error)
    }
}

async function addScore(req, res) {
    try {
        const photoId = req.body.photoId;
        const name = req.body.name;
        const username = req.body.username;
        const score = req.body.score;
        await db.addScore(name, score, photoId);
        res.json({message: "high score added"})
    } catch (error) {
        next(error)
    }
}

module.exports = {
   getTopScores, 
   getAllScores,
   addScore
}