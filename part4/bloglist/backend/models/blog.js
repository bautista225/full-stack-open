const { Schema, model } = require('mongoose')

const blogSchema = new Schema({
    title: {
        type: String,
        minLength: 3,
        required: [true, 'Title required']
    },
    author: {
        type: String,
        minLength: 3,
        required: [true, 'Author required']
    },
    url: {
        type: String,
        minLength: 3,
        required: [true, 'Url required']
    },
    likes: {
        type: Number,
        required: [true, 'Likes required']
    },
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = model('Blog', blogSchema)