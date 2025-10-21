const express = require("express");
const {
  getAllData,
  createDataSensor,
  updateDataSensor,
} = require("../controllers/data.controller");

const { Login } = require("../controllers/auth.controller");
const {
  createSocket,
  updateSocket,
  clearHistory,
} = require("../controllers/socket.controller");
const { updateSwitch } = require("../controllers/control.controller");
const {
  createHospot,
  updateHospot,
} = require("../controllers/hotspot.controller");

const router = express.Router();

router.get("/data", getAllData);

router.post("/total/create", createDataSensor);
router.post("/total/update", updateDataSensor);
router.post("/socket/create", createSocket);
router.post("/socket/update", updateSocket);
router.post("/switch/update", updateSwitch);
router.delete("/history/clear", clearHistory);
router.post("/hotspot/create", createHospot);
router.post("/hotspot/update", updateHospot);
router.post("/auth/login", Login);

module.exports = router;
