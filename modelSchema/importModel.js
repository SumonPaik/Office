//jshint esversion:6
const mongoose = require("mongoose");

const importSchema = new mongoose.Schema({
    jobno: {
        type: String,
        required: true
    },
    mblno: {
        type: String,
        required: true
    },
    shipper: {
        type: String,
        required: true
    },
    agent: {
        type: String,
        required: true
    },
    dateonboard: {
        type: String,
        required: true
    },
    containertype: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    portofloading: {
        type: String,
        required: true
    },
    eta: {
        type: Date,
        required: true
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "People"
    }
}, {
    timestamps: true
});

module.exports = new mongoose.model("Import", importSchema);