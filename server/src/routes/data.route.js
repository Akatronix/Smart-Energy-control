const express = require("express");
const {
  getAllData,
  createDataSensor,
  updateDataSensor,
} = require("../controllers/data.controller");
const {
  createNewSoket,
  updateControl,
} = require("../controllers/relay.controller");
const { Login } = require("../controllers/auth.controller");

const router = express.Router();

router.get("/data", getAllData);
router.post("/create", createDataSensor);
router.post("/update", updateDataSensor);
router.post("/relay/create", createNewSoket);
router.post("/relay/update", updateControl);
router.post("/auth/login", Login);

module.exports = router;
