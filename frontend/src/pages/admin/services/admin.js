import axiosInstance from "../../../environment/axiosInstance";

export const postBook = async (bookData) => {
    try {
        const response = await axiosInstance.post('/api/admin/books', bookData);
        return response;
    } catch (error) {
        console.error('Error posting book:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export const deleteBook = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/admin/books/${id}`);
        return response;
    } catch (error) {
        console.error('Error deleting book:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export const getAllBooks = async () => {
    try {
        const response = await axiosInstance.get('/api/admin/books');
        return response;
    } catch (error) {
        console.error('Error fetching books:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

