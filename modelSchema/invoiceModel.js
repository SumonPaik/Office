const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
    invoiceno: {
        type: String
    },
    invoiceto: String,
    hblno: String,
    conno: String,
    origin: String,
    description1: String,
    amount1: {
        type: Number,
        default: 0
    },
    description2: String,
    amount2: {
        type: Number,
        default: 0
    },
    description3: String,
    amount3: {
        type: Number,
        default: 0
    },
    description4: String,
    amount4: {
        type: Number,
        default: 0
    },
    totalamount: String,
    receivedamount: Number,
    moneyreceiptno: String,
    receiveddate: Date,
    hbl: {
        type: mongoose.Types.ObjectId,
        ref: "Housebl"
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "People"
    }
}, {
    timestamps: true
});

module.exports = new mongoose.model("Invoice", invoiceSchema);