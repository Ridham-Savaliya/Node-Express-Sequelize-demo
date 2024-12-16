const AuthrController = require('../contollers/authorBookController');
const express = require('express');
const router  = express.Router();

router.put('/authorbookUpdate',AuthrController.UpdateAuthorbook);

module.exports = router;
