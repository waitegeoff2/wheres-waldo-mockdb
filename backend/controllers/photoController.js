const db = require('../db/queries')

async function getUrls(req, res) {
    try {
        const photoUrls = await db.getUrls();
        res.json(photoUrls)
    } catch (error) {
        next(error)
    }
}

async function getPhotoDetails(req, res) {
    try {
        let photoId = req.params.photoId;
        console.trace(photoId)
        const photoDetails = await db.getPhotoDetails(photoId);
        res.json(photoDetails)
    } catch (error) {
        next(error)
    }
    //get details from the db for that photo,
    //useeffect calls it at top of page
}

async function getStartTime(req, res) {
    try {
        const gameStart = new Date()
        console.log(gameStart)
        res.json(gameStart)
    } catch (error) {
        next(error)
    }
}

async function getEndTime(req, res) {
    try {
        const gameEnd = new Date()
        console.log(gameEnd)
        res.json(gameEnd)
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getUrls,
    getPhotoDetails,
    getStartTime,
    getEndTime
}