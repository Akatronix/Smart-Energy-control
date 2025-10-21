const mongoose = require("mongoose");

const hotspotSchema = new mongoose.Schema(
  {
    ssid: String,
    password: String,
  },
  { timestamps: true }
);

const HotshotspotData = mongoose.model("hotspot", hotspotSchema);

module.exports = HotshotspotData;
