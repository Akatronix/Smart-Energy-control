const mongoose = require("mongoose");

// const socketSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     voltage: String,
//     current: String,
//     power: String,
//     energy: String,
//     switchStatus: String,
//     historicalData: [],
//   },
//   { timestamps: true }
// );

// const SocketData = mongoose.model("socket", socketSchema);

// module.exports = SocketData;

const socketSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    voltage: String,
    current: String,
    power: String,
    energy: String,
    switchStatus: String,
    historicalData: [
      {
        timestamp: { type: Date, default: Date.now },
        power: Number,
        voltage: Number,
        current: Number,
        energy: Number,
      },
    ],
  },
  { timestamps: true }
);

const SocketData = mongoose.model("socket", socketSchema);

module.exports = SocketData;
