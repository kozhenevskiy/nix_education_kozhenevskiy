import mongoose from 'mongoose';

const productSchema = new mongoose.Schema ({
    category: String,
    imgUrl: String,
    name: String,
    display: Number,
    color: [String],
    price: Number,
    chip: {
        name: String,
        cores: Number,
    },
    ram: Number,
    storage: Number,
    touchId: Boolean,
    faceId: Boolean,
    wireless: [String],
    camera: {
        front: String,
        back: String,
    },
    audio: {
        microphone: String,
        speakers: String,
    },
    size: {
        height: String, 
        width: String, 
        depth: String, 
        weight: String, 
    },
    os: String,
    InTheBox: [String],
    orderInfo: {
        inStock: Number, 
        reviews: Number, 
    }
    
})

export const Product = mongoose.model('product', productSchema);