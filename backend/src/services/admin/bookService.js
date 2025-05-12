const Book = require('../../models/Book');

const postBook = async (bookData) => {
    const newBook = new Book(bookData);
    await newBook.save();
    return newBook;
};
const fetchAllBooks = async () => {
    return await Book.find();
};
const fetchBookById = async (bookId) => {
    return await Book.findById(bookId);
};
const removeBook = async (bookId) => {
    return await Book.findByIdAndDelete(bookId);
};

const modifyBook = async (bookId, bookData) => {
    return await Book.findByIdAndUpdate(bookId, bookData, { new: true });
};

const searchBookByGenre = async (genre) => {
    return await Book.find({ genre: genre });
};


module.exports = {
    postBook,
    fetchAllBooks,
    fetchBookById,
    removeBook,
    modifyBook, 
    searchBookByGenre,
}; 