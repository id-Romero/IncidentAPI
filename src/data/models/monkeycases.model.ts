import mongoose from 'mongoose';

const monkeycasessquema = new mongoose.Schema({
    genre: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    lat:{
        type: Number,
        required: true
    },
    lng:{
        type: Number,
        required: true
    },
    isSent: {
        type: Boolean,
        required: false,
        default: false
    },
    creationDate: {
        type: Date,
        required: false,
        default: Date.now
    }
});

export const MonkeyCasesModel = mongoose.model('case', monkeycasessquema);