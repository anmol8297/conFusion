const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const promotionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    description: {
        type: String,
        reuired: true
    }
},{
    timestamps: true
});

var Promotions = mongoose.model('promotion', promotionSchema);

module.exports = Promotions;










