const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hallOfFameEntrySchema = new Schema({
    social: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    googleId: {
      type: String,
      required: true
    }
}, {
  timestamp: true,
});

const HallOfFameEntry = mongoose.model('HallOfFameEntry', hallOfFameEntrySchema);

module.exports = HallOfFameEntry;
