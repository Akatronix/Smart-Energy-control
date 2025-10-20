const mongoose = require("mongoose");
const SocketData = require("../models/sockets.model");

// async function createSocket(req, res) {
//   const { voltage, current, power, energy, switchStatus } = req.body;
//   try {
//     if (!current || !voltage || !power || !energy || !switchStatus) {
//       return res.status(400).send({ message: "all field are required! " });
//     }
//     const newData = await SocketData.create(req.body);
//     if (!newData)
//       return res.status(500).send({ message: "error something went wrong!" });

//     await newData.save();
//     res.status(201).send({ message: "created successfully!" });
//   } catch (error) {
//     console.log("Error:", error);
//   }
// }

// async function updateSocket(req, res) {
//   const { id, voltage, current, power, energy } = req.body;
//   try {
//     if (!id || !current || !voltage || !power || !energy) {
//       return res.status(400).send({ message: "all field are required! " });
//     }
//     const updatedData = await SocketData.findByIdAndUpdate(id, { ...req.body });
//     if (!updatedData)
//       return res.status(500).send({ message: "error something went wrong!" });

//     await updatedData.save();
//     res.status(200).send({
//       message: "updated successfully!",
//       updatedData: updatedData,
//     });
//   } catch (error) {
//     console.log("Error:", error);
//   }
// }

// async function getPowerHistory(req, res) {
//   try {
//     // Get all socket data
//     const sockets = await SocketData.find({});

//     if (!sockets || sockets.length === 0) {
//       return res.status(404).send({ message: "No socket data found" });
//     }

//     // Generate time labels for the last 24 hours
//     const labels = [];
//     const now = new Date();
//     for (let i = 23; i >= 0; i--) {
//       const hour = new Date(now);
//       hour.setHours(now.getHours() - i);
//       labels.push(hour.getHours() + ":00");
//     }

//     // Prepare datasets for each appliance
//     const datasets = sockets.map((socket) => {
//       // Initialize data array with zeros
//       const data = Array(24).fill(0);

//       // Fill in actual data from historicalData
//       if (socket.historicalData && socket.historicalData.length > 0) {
//         socket.historicalData.forEach((point) => {
//           const hourIndex = labels.indexOf(point.hour);
//           if (hourIndex !== -1) {
//             data[hourIndex] = parseFloat(point.power) || 0;
//           }
//         });
//       }

//       // Determine color based on appliance name
//       let borderColor = "rgb(0, 0, 0)";
//       let backgroundColor = "rgba(0, 0, 0, 0.5)";

//       switch (socket.name) {
//         case "Bulb":
//           borderColor = "rgb(234, 179, 8)";
//           backgroundColor = "rgba(234, 179, 8, 0.5)";
//           break;
//         case "Fan":
//           borderColor = "rgb(59, 130, 246)";
//           backgroundColor = "rgba(59, 130, 246, 0.5)";
//           break;
//         case "AC":
//           borderColor = "rgb(6, 182, 212)";
//           backgroundColor = "rgba(6, 182, 212, 0.5)";
//           break;
//         case "TV":
//           borderColor = "rgb(139, 92, 246)";
//           backgroundColor = "rgba(139, 92, 246, 0.5)";
//           break;
//         case "Fridge":
//           borderColor = "rgb(34, 197, 94)";
//           backgroundColor = "rgba(34, 197, 94, 0.5)";
//           break;
//         default:
//           borderColor = "rgb(0, 0, 0)";
//           backgroundColor = "rgba(0, 0, 0, 0.5)";
//       }

//       return {
//         label: socket.name,
//         data: data,
//         borderColor: borderColor,
//         backgroundColor: backgroundColor,
//       };
//     });

//     res.status(200).send({
//       labels: labels,
//       datasets: datasets,
//     });
//   } catch (error) {
//     console.log("Error:", error);
//     res.status(500).send({ message: "Error fetching power history" });
//   }
// }

// async function createSocket(req, res) {
//   const { name, voltage, current, power, energy, switchStatus } = req.body;
//   try {
//     if (!name || !current || !voltage || !power || !energy || !switchStatus) {
//       return res.status(400).send({ message: "all field are required! " });
//     }

//     const now = new Date();
//     const hour = now.getHours() + ":00";

//     const newData = await SocketData.create({
//       name,
//       voltage,
//       current,
//       power,
//       energy,
//       switchStatus,
//       historicalData: [
//         {
//           timestamp: now,
//           power: power,
//           hour: hour,
//         },
//       ],
//     });

//     if (!newData)
//       return res.status(500).send({ message: "error something went wrong!" });

//     res.status(201).send({ message: "created successfully!" });
//   } catch (error) {
//     console.log("Error:", error);
//   }
// }

// async function updateSocket(req, res) {
//   const { id, voltage, current, power, energy } = req.body;
//   try {
//     if (!id || !current || !voltage || !power || !energy) {
//       return res.status(400).send({ message: "all field are required! " });
//     }

//     const now = new Date();
//     const hour = now.getHours() + ":00";

//     const updatedData = await SocketData.findByIdAndUpdate(
//       id,
//       {
//         voltage,
//         current,
//         power,
//         energy,

//         $push: {
//           historicalData: {
//             timestamp: now,
//             power: power,
//             hour: hour,
//           },
//         },
//       },
//       { new: true }
//     );

//     if (!updatedData)
//       return res.status(500).send({ message: "error something went wrong!" });

//     // Keep only the last 24 hours of data
//     if (updatedData.historicalData.length > 24) {
//       updatedData.historicalData = updatedData.historicalData.slice(-24);
//       await updatedData.save();
//     }

//     res.status(200).send({
//       message: "updated successfully!",
//       updatedData: updatedData,
//     });
//   } catch (error) {
//     console.log("Error:", error);
//   }
// }

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

    // Update the socket data and add to historical data
    const updatedData = await SocketData.findByIdAndUpdate(
      id,
      {
        voltage,
        current,
        power,
        energy,
        $push: {
          historicalData: {
            timestamp: now,
            power: parseFloat(power),
            voltage: parseFloat(voltage),
            current: parseFloat(current),
            energy: parseFloat(energy),
          },
        },
      },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).send({
        message: "Socket not found!",
      });
    }

    // Keep only the last 24 hours of data
    if (updatedData.historicalData.length > 24) {
      updatedData.historicalData = updatedData.historicalData.slice(-24);
      await updatedData.save();
    }

    res.status(200).send({
      message: "Updated successfully!",
      updatedData: updatedData,
    });
  } catch (error) {
    console.error("Error updating socket:", error);
    res.status(500).send({
      message: "Server error while updating socket data",
      error: error.message,
    });
  }
}

module.exports = { createSocket, updateSocket };
