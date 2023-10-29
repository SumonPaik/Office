const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
    invoiceno: {
        type: String
    },
    invoiceto: String,
    hblno: String,
    conno: String,
    origin: String,
    invoiceamount: Number,
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