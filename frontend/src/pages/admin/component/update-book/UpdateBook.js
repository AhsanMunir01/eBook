import {useState, useEffect} from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {TextField, Box, Typography, Container, Avatar, CssBaseline, FormControl, InputLabel, Select, MenuItem, Button} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { updateBook, getBookById } from '../../services/admin';



const defaultTheme = createTheme();

export default function UpdateBook() {
    const { id: bookId } = useParams();
    const [books, setBooks] = useState([]);
    const [condition] = useState(["New", "Like New", "Used" , "Good","Used-Acceptable"]);
    const[genre] = useState(["Fiction",
         "Non-Fiction", 
         "Science Fiction", 
         "Mystery",
          "Romance",
           "Horror", 
           "Thriller",
            "Biography",
             "History", 
             "Self-Help",
              "Travel", 
              "Children's",
               "Young Adult",
                "Cooking",
                 "Art", 
                 "Music",
                  "Science",
                   "Technology", 
                   "Math", 
                   "Language",
                    "Other"]);
    const [status] = useState(["Available", "Sold"]);
    const [book, setBook] = useState({
       title: '',
       author: '',
       description: '',
       price: 0,
       genre: '',
       condition: '',
       edition: '',
       imageURL: '',
       status: ''
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const fetchBooks = async () => {
        setLoading(true);
        
        try {
            console.log('Fetching books...');
            const response = await getBookById(bookId);
           
            console.log('Response received:', response);
            if (response && response.data) {
                console.log('Books data:', response.data);
                setBooks(Array.isArray(response.data.books) ? response.data.books : []);
            } else {
                console.log('No books data in response');
                setBooks([]);
                enqueueSnackbar("No books data received", {variant: "warning"});
            }
        } catch (error) {
            console.error('Error fetching books:', error);
            console.error('Error details:', {
                message: error.message,
                response: error.response,
                status: error.response?.status
            });
            setBooks([]);
            enqueueSnackbar(`Error fetching books: ${error.message}`, {variant: "error"});
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchBooks();
    }, []);


    const handleInputChange = (e) => {
        const {name, value} = e.target;
       const numericValue =  (name === "price") ? parseInt(value ,10):value;
       setBook({...book, [name]: numericValue});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();  
        setLoading(true);
        try {
            console.log("checking update book 1");
            const response = await updateBook(bookId, book);
            if (response.status === 200) {
                navigate('/admin/dashboard');
                enqueueSnackbar("Book updated successfully", {variant: "success", autoHideDuration: 5000});
            }
        } catch (error) {
            console.error('Error details:', error);
            const errorMessage = error.message || 'Failed to update book';
            enqueueSnackbar(errorMessage, {variant: "error", autoHideDuration: 5000});
        } finally {
            setLoading(false);
        }
        console.log("checking update book 2");
    };

    return (
       <>
       <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
                        <EditIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">Update Book</Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="imageURL"
                            label="Enter Image URL"
                            name="imageURL"
                            type="text"
                            autoFocus
                            autoComplete="imageURL"
                            value={book.imageURL}
                            onChange={handleInputChange}
                        />
                       <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Enter Title"
                            name="title"
                            type="text"
                            autoComplete="title"
                            value={book.title}
                            onChange={handleInputChange}
                       />
                      <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="author"
                            label="Enter Author"
                            name="author"
                            type="text"
                            autoComplete="author"
                            value={book.author}
                            onChange={handleInputChange}
                      />
                      <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="description"
                            label="Enter Description"
                            name="description"
                            type="text"
                            autoComplete="description"
                            value={book.description}
                            onChange={handleInputChange}
                      />
                      <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            label="Enter Price"
                            name="price"
                            type="number"
                            autoComplete="price"
                            value={book.price}
                            onChange={handleInputChange}
                      />
                      <FormControl fullWidth margin="normal">
                        <InputLabel id="genre-label">Select Genre</InputLabel>
                        <Select
                            labelId="genre-label"
                            id="genre"
                            value={book.genre}
                            onChange={handleInputChange}
                            name="genre"
                            label="Genre"
                        >
                            <MenuItem value="">Select Genre</MenuItem>
                            {genre.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                      <FormControl fullWidth margin="normal">
                        <InputLabel id="condition-label">Select Condition</InputLabel>
                        <Select
                            labelId="condition-label"
                            id="condition"
                            value={book.condition}
                            onChange={handleInputChange}
                            name="condition"
                            label="SelectCondition"
                        >
                            <MenuItem value="">Select Condition</MenuItem>
                            {condition.map((condition) => (
                                <MenuItem key={condition} value={condition}>
                                    {condition}
                                </MenuItem>
                            ))}
                        </Select> 
                      </FormControl>
                      <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="edition"
                            label="Enter Edition"
                            name="edition"
                            type="text"
                            autoComplete="edition"
                            value={book.edition}
                            onChange={handleInputChange}
                      />
                      <FormControl fullWidth margin="normal">
                        <InputLabel id="status-label">Select Status</InputLabel>
                        <Select
                            labelId="status-label"
                            id="status"
                            value={book.status}
                            onChange={handleInputChange}
                            name="status"
                            label="Select Status"
                        >
                            <MenuItem value="">Select Status</MenuItem>
                            {status.map((status) => (
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        disabled={
                            !book.title ||
                            !book.author ||
                            !book.description ||
                            !book.price ||
                            !book.genre ||
                            !book.condition ||
                            !book.edition ||
                            !book.imageURL ||
                            !book.status
                        }
                      >
                        {loading ? <CircularProgress color="success" size={24}/> : 'Update Book'}
                      </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        <Backdrop open={loading} sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <CircularProgress color="success" />
        </Backdrop>
       </>
    );
} 