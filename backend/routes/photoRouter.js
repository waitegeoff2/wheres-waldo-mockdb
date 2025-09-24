const { Router } = require("express");
const photoRouter = Router();
const photoController = require('../controllers/photoController')

//get all waldo photos in Db and their IDs to display on start screen
photoRouter.get('/ImgUrls', photoController.getUrls)
//for highscores
photoRouter.get('/gameStart', photoController.getStartTime)
photoRouter.get('/gameEnd', photoController.getEndTime)
//get characters and coords for individual photo
photoRouter.get('/:photoId', photoController.getPhotoDetails)


module.exports = photoRouter;