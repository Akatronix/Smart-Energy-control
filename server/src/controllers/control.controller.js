const SocketData = require("../models/sockets.model");

async function updateSwitch(req, res) {
  const { id, switchValue } = req.body;
  try {
    if (!id || switchValue === undefined) {
      return res
        .status(400)
        .send({ message: "ID and switchValue are required!" });
    }
    const updatedData = await SocketData.findByIdAndUpdate(
      id,
      { switchStatus: switchValue },
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
  updateSwitch,
};
