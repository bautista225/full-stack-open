import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
    },
    favoriteGenre: {
        type: String,
        required: true,
    },
})

const User = mongoose.model('User', schema)

export default User
