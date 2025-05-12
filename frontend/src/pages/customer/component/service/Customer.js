import axiosInstance from "../../../../environment/axiosInstance";

export const getAllBooks = async () => {
    try {
        const response = await axiosInstance.get('/api/customer/books');
        return response;
    } catch (error) {
        console.error('Error fetching books:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export const searchBooks = async (genre) => {
    try {
        const response = await axiosInstance.get(`/api/customer/books/search/${genre}`);
        return response;
    } catch (error) {
        console.error('Error searching books:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export const addBookToCart = async (bookId, userId) => {
    try {
        // Check if bookId is valid
        if (!bookId) {
            throw new Error('Book ID is required');
        }
        
        // Check if userId is valid
        if (!userId) {
            throw new Error('User ID is required');
        }
        
        // Include both bookId and userId in the request body
        const response = await axiosInstance.post(`/api/customer/cart`, {
            bookId: bookId,
            userId: userId
        });
        
        return response;
    } catch (error) {
        console.error('Error adding book to cart:',  error.message);
        throw error.response?.data || error;
    }
};

export const getCartByUser = async (userId) => {
    console.log('Fetching cart for user:', userId);
    try {

        const response = await axiosInstance.get(`/api/customer/cart/${userId}`);
        return response;
    } catch (error) {
        console.error('Error fetching cart:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export const placeOrder = async (data) => {
    console.log('Fetching cart for user:', userId);
    try {

        const response = await axiosInstance.post(`/api/customer/order`, data);
        return response;
    } catch (error) {
        console.error('Error fetching cart:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
} 


