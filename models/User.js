import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: String,
    grid: {type: [Number], required: true},
    cutNumbers: {type: [Number], default: []}
})

export const User = mongoose.model('User', userSchema);