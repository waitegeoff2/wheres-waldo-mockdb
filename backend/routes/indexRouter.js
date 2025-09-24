const { Router } = require("express");
const indexRouter = Router();

indexRouter.get('/', (req, res) => res.send('hi there'))

module.exports = indexRouter;