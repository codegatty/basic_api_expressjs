const mongoose =require('mongoose');

const ImageSchema=mongoose.Schema({
image:{
    type:String,
    required:[true,"please enter the image"]
}
})

module.exports = mongoose.model('Image',ImageSchema);