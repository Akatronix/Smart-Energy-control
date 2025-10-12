const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema(
  {
    current: String,
    voltage: String,
    motion: String,
    humans: String,
  },
  { timestamps: true }
);

const SensorData = mongoose.model("Energy_data", sensorSchema);

module.exports = SensorData;
