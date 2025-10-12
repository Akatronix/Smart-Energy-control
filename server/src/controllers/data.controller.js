const SensorData = require("../models/SensorData.model");
const RelayData = require("../models/RelayControls.model");
const Activity = require("../models/Activity.model");

async function getAllData(req, res) {
  try {
    const sensorDatas = await SensorData.find();
    const relayState = await RelayData.find();

    const lastestActivity = await Activity.find()
      .sort({ timestamp: -1 })
      .limit(10)
      .exec();

    if (!sensorDatas || !Array.isArray(lastestActivity) || !relayState)
      return res.status(500).send({ message: "error something went wrong!" });

    res.status(200).send({
      message: "success",
      sensor: sensorDatas,
      relay: relayState,
      activities: lastestActivity,
    });
  } catch (error) {
    console.log("Error", error);
  }
}

async function createDataSensor(req, res) {
  const { voltage, current, motion, humans } = req.body;
  try {
    if (!voltage || !current || !motion || !humans) {
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
  const { id, voltage, current, motion, humans } = req.body;
  try {
    if (!id || !voltage || !current || !motion || !humans) {
      return res.status(400).send({ message: "all field are required! " });
    }
    const updatedData = await SensorData.findByIdAndUpdate(id, { ...req.body });
    const controlsDatas = await RelayData.find();
    if (!updatedData || !controlsDatas)
      return res.status(500).send({ message: "error something went wrong!" });

    await updatedData.save();
    res
      .status(200)
      .send({ message: "updated successfully!", control: controlsDatas });
  } catch (error) {
    console.log("Error:", error);
  }
}

module.exports = { getAllData, createDataSensor, updateDataSensor };
