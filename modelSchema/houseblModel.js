//jshint esversion:6
const mongoose = require("mongoose");

const houseblSchema = new mongoose.Schema({
    hblno: {
        type: String,
        required: true
    },
    consignee: {
        type: String,
        required: true
    },
    containerno: {
        type: String
    },    
    containersize: {
        type: String
    },
    containerseal: {
        type: String
    },
    quantity: {
        type: String
    },
    mblno: {
        type: mongoose.Types.ObjectId,
        ref: "Import"
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "People"
    }
}, {
    timestamps: true
});

module.exports = new mongoose.model("Housebl", houseblSchema);