//jshint esversion:6
const mongoose = require("mongoose");

const importSchema = new mongoose.Schema({
    jobno: {
        type: String,
        required: true
    },
    mblno: {
        type: String
    },
    carrier: {
        type: String
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
        type: Date,
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
    destination : {
        type: String
    },    
    igmsubmission: {
        type: Date
    },
    eta: {
        type: Date,
        required: true
    },
    dodate: {
        type: Date
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "People"
    }
}, {
    timestamps: true
});

module.exports = new mongoose.model("Import", importSchema);