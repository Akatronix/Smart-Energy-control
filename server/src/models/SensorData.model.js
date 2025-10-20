const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema(
  {
    totalEnergy: String,
    voltage: String,
    motion: String,
  },
  { timestamps: true }
);

const SensorData = mongoose.model("power_info", sensorSchema);

module.exports = SensorData;
