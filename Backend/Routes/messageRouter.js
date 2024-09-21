const express = require("express");
const { getMessage, sendMessage } = require("../Controllers/messageController.js");
const isAuthenticated = require("../middleware/isAuthencated.js");

const router = express.Router();

router.route("/send/:id").post(isAuthenticated, sendMessage);
router.route("/:id").get(isAuthenticated, getMessage);

module.exports = router;
