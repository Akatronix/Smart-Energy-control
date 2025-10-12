const RelayData = require("../models/RelayControls.model");

async function createNewSoket(req, res) {
  const { relayState } = req.body;

  try {
    if (!relayState) {
      return res.status(400).send({ message: "all field are required!" });
    }
    const newData = await RelayData.create({
      relayState,
    });
    if (!newData)
      return res.status(500).send({ message: "error something went wrong!" });

    await newData.save();
    res.status(201).send({ message: "created successfully!", data: newData });
  } catch (error) {
    console.log("Error:", error);
  }
}

async function updateControl(req, res) {
  const { id, relayState } = req.body;

  try {
    // Validate input
    if (!id || !relayState) {
      return res.status(400).send({ message: "All fields are required!" });
    }

    const updatedData = await RelayData.findByIdAndUpdate(
      id,
      { relayState },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedData) {
      return res.status(404).send({ message: "Document not found!" });
    }

    return res.status(200).send({
      message: "Updated successfully!",
      data: updatedData,
      status: 200,
    });
  } catch (error) {
    console.error("Error updating control:", error);
    return res.status(500).send({
      message: "An error occurred while updating the data",
      error: error.message,
    });
  }
}

module.exports = { createNewSoket, updateControl };
