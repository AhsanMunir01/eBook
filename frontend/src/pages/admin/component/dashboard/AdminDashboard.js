import {useState, useEffect} from "react";
import {useSnackbar} from "notistack";
import { useNavigate } from "react-router-dom";
import { getAllBooks, deleteBook, searchBooks } from "../../services/admin";
import { Backdrop, CircularProgress, Grid, Box, Typography, Button, Paper, FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    height: '250px',
    objectFit: 'cover'
});

const Item = styled(Paper)(({theme}) => ({
   backgroundColor: '#fff',
   ...theme.typography.body2,
   padding: theme.spacing(1),
   textAlign: 'left',
   color: theme.palette.text.primary,
   margin: theme.spacing(1),
   boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
   '&:hover': {
     boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
   },
   ...theme.applyStyles('dark',{
    backgroundColor: '#1A2027',
   }),
}));


export default function AdminDashboard(){
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBook, setSelectedBook] = useState('');
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();

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

    const handleDeleteBook = async (id) => {
        setLoading(true);
        try {
            const response = await deleteBook(id);
            if (response.status === 200 || response.status === 204) {
                enqueueSnackbar("Book deleted successfully", {variant: "success", autoHideDuration: 5000});
                fetchBooks(); // Refresh the books list after deletion
            }
        } catch (error) {
            //console.error('Error details: ', error);
            enqueueSnackbar(`Error deleting book: ${error.message}`, {variant: "error", autoHideDuration: 5000});
        } finally {
            setLoading(false);
        }
    };

    const fetchBooks = async () => {
        setLoading(true);
        
        try {
            console.log('Fetching books...');
            const response = await getAllBooks();
           
            console.log('Response received:', response);
            if (response && response.data) {
                console.log('Books data:', response.data);
                const booksData = response.data.books || response.data.book || [];
                setBooks(Array.isArray(booksData) ? booksData : []);
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

    useEffect(() => {
        console.log(books);
    }, [books]);

   
    const handleGenreChange = async (e) => {
        setLoading(true);
        const selectedGenre = e.target.value;
        setSelectedBook(selectedGenre);
        try {
            console.log('Fetching books...');
            const response = await searchBooks(selectedGenre);
           
            console.log('Response received:', response);
            if (response && response.data) {
                console.log('Books data:', response.data);
                const booksData = response.data.books || response.data.book || [];
                setBooks(Array.isArray(booksData) ? booksData : []);
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
   
    
    const handleUpdateBookClick = (id) => {
        navigate(`/admin/update-book/${id}/edit`);
    };

    return(
        <>
         <Grid 
         sx= {{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
         }}
         >
          <FormControl sx={{mt: 2 , width: 400}} margin="normal">
            <InputLabel id="genre-label">Select Genre to filter</InputLabel>
            <Select
            labelId="genre-label"
            id="genre"
            value={selectedBook}
            onChange ={handleGenreChange}
            label="Genre"
            >
                <MenuItem value="">All Genres</MenuItem>
                {genre.map((genre) => (
                    <MenuItem key={genre} value={genre}>
                        {genre}
                        
                    </MenuItem>
                ))}
            </Select>
          </FormControl>
         </Grid>
        <Box sx={{flexGrow: 1, p: 5}}>
            {books.length === 0 ? (
                <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
                    No books available
                </Typography>
            ) : (
                <Grid container spacing={2}>
                    {books.map((book) => (
                        <Grid item xs={12} md={6}  key={book._id}>
                            <Item>
                                <Box sx={{display: 'flex', p:3, alignItems: 'center'}}>
                                    <Box sx={{width:'40%',display: 'flex',justifyContent:'center', p:2}}>
                                        <Img alt="complex" src={book.imageURL} sx={{with:'100%', height: 'auto', maxWidth: '150px'}} />
                                    </Box>
                                    <Box sx={{width:'60%', pl:3}}>
                                        <Typography variant="h6" component="div">
                                            <strong>{book.title}</strong>
                                        </Typography>
                                        <Box sx={{display: 'grid', gridTemplateColumns: '100px 1fr', gap: 1 ,mt:2}}>
                                            <Typography variant="body2" color="text.secondary">
                                                Author: 
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                               <strong>{book.author}</strong>
                                            </Typography>

                                            <Typography variant="body2" color="text.secondary">
                                                Description:
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>{book.description}</strong>
                                            </Typography>

                                            <Typography variant="body2" color="text.secondary">
                                                Price:
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>{book.price}</strong>
                                            </Typography>

                                            <Typography variant="body2" color="text.secondary">
                                                Genre:
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>{book.genre}</strong>
                                            </Typography>

                                            <Typography variant="body2" color="text.secondary">
                                                Condition:
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>{book.condition}</strong>
                                            </Typography>
                                            
                                            <Typography variant="body2" color="text.secondary">
                                                Edition:
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>{book.edition}</strong>
                                            </Typography>

                                            <Typography variant="body2" color="text.secondary">
                                                Status:
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>{book.status}</strong>
                                            </Typography>
                                            
                                            </Box>
                                            <Box sx={{display: 'flex', gap:2, mt:2}}>
                                                <Button
                                                 variant="contained"
                                                 color="primary"
                                                 endIcon={<EditIcon />}
                                                 onClick={() => handleUpdateBookClick(book._id)}>
                                                    Update
                                                 </Button>
                                                 <Button
                                                 variant="contained"
                                                 color="error"
                                                 endIcon={<DeleteIcon />}
                                                 onClick={() => handleDeleteBook(book._id)}>
                                                    Delete
                                                 </Button>
                                            </Box>
                                    </Box>
                                    </Box>
                            </Item>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
        <Backdrop
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={loading}
        >
            <CircularProgress color="success" />
        </Backdrop>
        </>
    );
}
