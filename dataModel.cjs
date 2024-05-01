const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
    content: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model("DataModel", DataSchema);

