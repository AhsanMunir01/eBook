import React, { useEffect, useState, useCallback } from "react";
import { getCartByUser, placeOrder } from "../service/Customer";
import { useSnackbar } from "notistack";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Backdrop,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  TextField,
  DialogActions
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
  height: "250px",
  objectFit: "cover",
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.primary,
  margin: theme.spacing(1),
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  "&:hover": {
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },
}));

export default function Cart() {
  const [loading, setLoading] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [order, setOrder] = useState({ amount: 0 });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    orderDescription: "",
    address: ""
  });

  const [open, setOpen] = useState(false);

  const calculateTotalAmount = (items) => {
    return items.reduce((total, item) => {
      return total + (item.book ? parseFloat(item.book.price) * item.quantity : 0);
    }, 0).toFixed(2);
  };

  const fetchCartByUser = useCallback(async () => {
    const id = localStorage.getItem("userId");
    setLoading(true);
    try {
      const response = await getCartByUser(id);
      if (response && response.data) {
        const items = response.data.data || [];
        setCartItem(Array.isArray(items) ? items : []);
        
        const totalAmount = calculateTotalAmount(items);
        setOrder({ amount: totalAmount });
      } else {
        setCartItem([]);
        enqueueSnackbar("No cart data received", { variant: "warning" });
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      if (error.response && error.response.status === 404) {
        enqueueSnackbar("Cart not found. It may be empty.", { variant: "info" });
      } else {
        enqueueSnackbar(`Error fetching cart: ${error.message}`, { variant: "error" });
      }
      setCartItem([]);
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    fetchCartByUser();
  }, [fetchCartByUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Get the user ID from localStorage
      const userId = localStorage.getItem("userId");
      
      // IMPORTANT: Check if userId exists
      if (!userId) {
        enqueueSnackbar("User ID not found. Please log in again.", { variant: "error" });
        setLoading(false);
        return;
      }
      
      // Include userId in the form data - use the exact property name expected by the backend
      const orderData = {
        ...formData,
        userId: userId, // Make sure this property name matches exactly what the backend expects
        totalAmount: order.amount
      };
      
      console.log("Sending order data:", orderData); // Add debugging log
      
      const response = await placeOrder(orderData);
      if (response.status === 201) {
        navigate('/customer/dashboard');
        enqueueSnackbar("Order placed successfully", { variant: "success", autoHideDuration: 5000 });
        setOpen(false);
      }
    } catch (error) {
      console.error('Error details:', error);
      const errorMessage = error.message || 'Error while placing order';
      enqueueSnackbar(errorMessage, { variant: "error", autoHideDuration: 5000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {cartItem.length > 0 ? (
        <>
          <Box sx={{ flexGrow: 1, p: 5 }}>
            <Grid container spacing={1}>
              {cartItem.map((item) => (
                <Grid item xs={4} key={item.book._id}>
                  <Item>
                    <Img
                      src={item.book.imageURL}
                      alt="product-image"
                      style={{ width: 70, height: 70 }}
                    />
                    <Typography variant="h6">
                      Name: {item.book.title}
                    </Typography>
                    <Typography variant="body1">
                      Price: ${item.book.price}
                    </Typography>
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              p: 5,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Grid container spacing={1} direction={"column"} alignItems="flex-end">
              <Grid item>
                <Typography>Total amount: ${order.amount}</Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpen(true)} sx={{ mt: 2 }}
                >
                  Place Order
                </Button>
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            p: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4">Nothing to see here</Typography>
        </Box>
      )}
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit
        }}
      >
        <DialogTitle>Place Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Place your order by adding any special instructions in description and address
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="address"
            label="Enter Address"
            name="address"
            type="text"
            fullWidth
            variant="standard"
            multiline
            maxRows={4}
            value={formData.address}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="orderDescription"
            label="Enter Order Description"
            name="orderDescription"
            type="text"
            fullWidth
            variant="standard"
            multiline
            maxRows={4}
            value={formData.orderDescription}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit">Place Order</Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="success" />
      </Backdrop>
    </>
  );
}
