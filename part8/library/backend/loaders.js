import DataLoader from 'dataloader'
import Book from './models/book.js'
import mongoose from 'mongoose'

export const bookCountLoader = async (authorIds) => {
    const authorStringIdsAsObjectId = authorIds.map((id) => new mongoose.Types.ObjectId(id))
    
    const books = await Book.aggregate([
        { $match: { author: { $in: authorStringIdsAsObjectId } } },
        { $group: { _id: '$author', count: { $sum: 1 } } },
    ])

    const bookCountsMap = {}
    books.forEach((b) => {
        bookCountsMap[b._id.toString()] = b.count
    })

    // Devuelve los conteos en el mismo orden de los `authorIds`
    return authorIds.map((id) => bookCountsMap[id.toString()] || 0)
}


