const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    dishes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Dish',
        required: true
    }]
},
{
    timestamps: true
});

var Favorites = mongoose.model('Favorite', FavoriteSchema);

module.exports = Favorites;