const mongoose = require('mongoose');

const url = process.env.MONGODB_URL;

mongoose.connect(url)
    .then(result => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB')
    });

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: {
        type: String,
        minlength: 8,
        validate: {
            validator: function(v) {
                for (let index = 4; index < v.length; index++) {
                    if(v[index] === "-") {
                        console.log(v[index])
                        return false;
                    }
                }
                console.log(v[1]);
                if (v[1] === "-") {
                    return false;
                }
                
                return /\d{8}/;
            },
            message: props => `${props.value} is not a valid phone number! Valid forms eg. ['12345678'] & [01-234567'] & ['010-23456']`
        },
        required: [true, 'User phone number required']
    }
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

module.exports = mongoose.model('Person', personSchema);