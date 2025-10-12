const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema(
  {
    title: String,
    email: String,
    attempted: Boolean,
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Activity = mongoose.model("activitie", ActivitySchema);

module.exports = Activity;
