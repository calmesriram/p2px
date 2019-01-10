var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var OrderSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    btc: {
        type: Number
    },
    price: {
        type: Number
    },
    reQinr: {
        type: Number
    },
    aviLinr: {
        type: Number
    }
},
    {
        timestamps: true
    });


var BuySchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    btc: {
        type: Number
    },
    // avgPrice: {
    //     type: Number
    // },
    inr: {
        type: Number
    },
    reQinr: {
        type: Number
    },
    aviLinr: {
        type: Number
    }
},
    {
        timestamps: true
    });
var AssetSchema = new mongoose.Schema({
    Name: {
        type: String,
    },
    orderId: {
        type: String,
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    userId: {
        type: String,
        required: true
    },
    status: {
        type: Number,
    },
    orderId: {
        type: String,
    },
},
    {
        timestamps: true
    })

function findOrderByID(Order, id) {
    return Order.findOrderByID(id, { name });
}
mongoose.model('Order', OrderSchema);
mongoose.model('Buy', BuySchema);
mongoose.model('Asset', AssetSchema);

module.exports = mongoose.model('Order');
module.exports = mongoose.model('Asset');
module.exports = mongoose.model('Buy');
module.exports.findOrderByID = findOrderByID;
