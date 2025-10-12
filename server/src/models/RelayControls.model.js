const mongoose = require("mongoose");

const RelaySchema = new mongoose.Schema(
  {
    relayState: String,
  },
  { timestamps: true }
);

const RelayData = mongoose.model("relayControl", RelaySchema);

module.exports = RelayData;
