const SensorData = require("../models/SensorData.model");
const Activity = require("../models/Activity.model");
const SocketData = require("../models/sockets.model");
const HotshotspotData = require("../models/hotspot.model");

async function getAllData(req, res) {
  try {
    const sensorDatas = await SensorData.find();
    const socketDatas = await SocketData.find();
    const lastestActivity = await Activity.find()
      .sort({ timestamp: -1 })
      .limit(10)
      .exec();

    if (!sensorDatas || !Array.isArray(lastestActivity) || !socketDatas) {
      return res.status(500).send({ message: "error something went wrong!" });
    }

    // Generate labels for the last 24 hours
    const now = new Date();
    const labels = Array.from({ length: 24 }, (_, i) => {
      const hour = new Date(now);
      hour.setHours(now.getHours() - (23 - i));
      return hour.getHours().toString().padStart(2, "0") + ":00";
    });

    const datasets = socketDatas.map((socket) => {
      const data = Array(24).fill(0);
      const sortedHistoricalData = [...socket.historicalData].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );

      const recentData = sortedHistoricalData.slice(0, 24);
      recentData.forEach((record, index) => {
        if (record.energy !== undefined) {
          const chartIndex = 23 - index;
          if (chartIndex >= 0) {
            data[chartIndex] = record.energy;
          }
        }
      });
      let color;
      switch (socket.name.toLowerCase()) {
        case "bulb":
          color = "#f59e0b";
          break;
        case "fan":
          color = "#3b82f6";
          break;
        case "ac":
          color = "#06b6d4";
          break;
        case "tv":
          color = "#8b5cf6";
          break;
        case "fridge":
          color = "#22c55e";
          break;
        default:
          color = "#000000";
      }

      return {
        name: socket.name,
        data: data,
        color: color,
      };
    });

    res.status(200).send({
      message: "success",
      sensor: sensorDatas,
      socket: socketDatas,
      activities: lastestActivity,
      chartData: {
        labels,
        datasets,
      },
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).send({
      message: "Server error while fetching data",
      error: error.message,
    });
  }
}

async function createDataSensor(req, res) {
  const { totalEnergy, voltage, motion } = req.body;
  try {
    if (!totalEnergy || !voltage || !motion) {
      return res.status(400).send({ message: "all field are required! " });
    }
    const newData = await SensorData.create(req.body);
    if (!newData)
      return res.status(500).send({ message: "error something went wrong!" });

    await newData.save();
    res.status(201).send({ message: "created successfully!" });
  } catch (error) {
    console.log("Error:", error);
  }
}

async function updateDataSensor(req, res) {
  const { id, totalEnergy, voltage, motion } = req.body;
  try {
    if (!id || !totalEnergy || !voltage || !motion) {
      return res.status(400).send({ message: "all field are required! " });
    }
    const updatedData = await SensorData.findByIdAndUpdate(id, { ...req.body });
    const allSockets = await SocketData.find();

    const switchStatusArray = allSockets.map((socket) =>
      socket.switchStatus === "ON" ? "ON" : "OFF"
    );
    const hotspot = await HotshotspotData.find();
    if (!updatedData)
      return res.status(500).send({ message: "error something went wrong!" });

    await updatedData.save();
    res.status(200).send({
      message: "updated successfully!",
      sockets: switchStatusArray,
      hotspot: hotspot,
    });
  } catch (error) {
    console.log("Error:", error);
  }
}

module.exports = { getAllData, createDataSensor, updateDataSensor };
