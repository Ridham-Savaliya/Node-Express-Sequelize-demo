const express = require("express");
const { NotifyUser } = require("../contollers/notificationContoller");
const router = express.Router();

router.post("/notify", NotifyUser);

module.exports = router;
