const mongoose = require("mongoose");
const SocketData = require("../models/sockets.model");

async function createSocket(req, res) {
  const { name, voltage, current, power, energy, switchStatus } = req.body;

  try {
    // Validate all required fields
    if (
      !name ||
      !current ||
      !voltage ||
      !power ||
      !energy ||
      switchStatus === undefined
    ) {
      return res.status(400).send({
        message: "All fields are required!",
      });
    }

    // Validate numerical values
    const numVoltage = parseFloat(voltage);
    const numCurrent = parseFloat(current);
    const numPower = parseFloat(power);
    const numEnergy = parseFloat(energy);

    if (
      isNaN(numVoltage) ||
      isNaN(numCurrent) ||
      isNaN(numPower) ||
      isNaN(numEnergy)
    ) {
      return res.status(400).send({
        message: "Voltage, current, power, and energy must be valid numbers!",
      });
    }

    const now = new Date();

    // Create new socket with initial historical data
    const newData = await SocketData.create({
      name,
      voltage: numVoltage.toString(),
      current: numCurrent.toString(),
      power: numPower.toString(),
      energy: numEnergy.toString(),
      switchStatus,
      historicalData: [
        {
          timestamp: now,
          power: numPower,
          voltage: numVoltage,
          current: numCurrent,
          energy: numEnergy,
        },
      ],
    });

    // Return success response with created data
    res.status(201).send({
      message: "Socket created successfully!",
      data: newData,
    });
  } catch (error) {
    console.error("Error creating socket:", error);

    // Handle duplicate name error
    if (error.code === 11000) {
      return res.status(400).send({
        message: "A socket with this name already exists!",
      });
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).send({
        message: "Validation Error",
        errors: messages,
      });
    }

    res.status(500).send({
      message: "Server error while creating socket",
      error: error.message,
    });
  }
}
async function updateSocket(req, res) {
  const { id, voltage, current, power, energy } = req.body;

  try {
    // Validate required fields
    if (!id || !current || !voltage || !power || !energy) {
      return res.status(400).send({
        message: "All fields are required!",
      });
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "Invalid ID format!",
      });
    }

    const now = new Date();

    // Get the start of the current hour (minutes and seconds set to 0)
    const currentHourStart = new Date();
    currentHourStart.setMinutes(0, 0, 0);

    // Find the socket document
    const socket = await SocketData.findById(id);
    if (!socket) {
      return res.status(404).send({
        message: "Socket not found!",
      });
    }

    // Check if there's already a historical entry for the current hour
    const existingEntryIndex = socket.historicalData.findIndex((entry) => {
      const entryTime = new Date(entry.timestamp);
      return entryTime >= currentHourStart;
    });

    // Update the main fields
    socket.voltage = voltage;
    socket.current = current;
    socket.power = power;
    socket.energy = energy;

    // Only update historical data if there's no entry for the current hour
    if (existingEntryIndex === -1) {
      // Add new historical entry
      socket.historicalData.push({
        timestamp: now,
        power: parseFloat(power),
        voltage: parseFloat(voltage),
        current: parseFloat(current),
        energy: parseFloat(energy),
      });

      // Keep only the last 24 hours of data
      if (socket.historicalData.length > 24) {
        socket.historicalData = socket.historicalData.slice(-24);
      }
    } else {
      // Update existing entry for the current hour
      socket.historicalData[existingEntryIndex] = {
        ...socket.historicalData[existingEntryIndex],
        power: parseFloat(power),
        voltage: parseFloat(voltage),
        current: parseFloat(current),
        energy: parseFloat(energy),
      };
    }

    // Save the document
    await socket.save();

    res.status(200).send({
      message: "Updated successfully!",
      updatedData: socket,
    });
  } catch (error) {
    console.error("Error updating socket:", error);
    res.status(500).send({
      message: "Server error while updating socket data",
      error: error.message,
    });
  }
}

async function clearHistory(req, res) {
  try {
    const result = await SocketData.updateMany(
      {},
      { $set: { historicalData: [] } }
    );

    res.status(200).json({
      message: "Historical data cleared successfully",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error clearing historical data:", error);
    res.status(500).json({
      message: "Failed to clear historical data",
      error: error.message,
    });
  }
}
module.exports = { createSocket, updateSocket, clearHistory };
