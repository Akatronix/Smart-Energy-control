const HotshotspotData = require("../models/hotspot.model");

async function createHospot(req, res) {
  const { ssid, password } = req.body;
  try {
    if (!ssid || !password) {
      return res
        .status(400)
        .send({ message: "SSID and password are required!" });
    }
    const newHotspot = await HotshotspotData.create({ ssid, password });
    if (!newHotspot) {
      return res
        .status(500)
        .send({ message: "Error creating hotspot configuration!" });
    }
    await newHotspot.save();

    res.status(201).send({ message: "Hotspot configured successfully!" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({ message: "Server error", error: error.message });
  }
}

async function updateHospot(req, res) {
  const { id, ssid, password } = req.body;
  try {
    if (!id || !ssid || !password) {
      return res
        .status(400)
        .send({ message: "ID, SSID and password are required!" });
    }
    const updatedData = await HotshotspotData.findByIdAndUpdate(
      id,
      { ssid, password },
      { new: true }
    );
    if (!updatedData) {
      return res.status(404).send({ message: "Document not found!" });
    }
    res.status(200).send({
      message: "Updated successfully!",
      data: updatedData,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({ message: "Server error", error: error.message });
  }
}

module.exports = {
  createHospot,
  updateHospot,
};
