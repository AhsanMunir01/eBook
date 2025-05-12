import React, { useEffect, useState } from "react";
import { getCartByUser } from "../service/Customer";
import { useSnackbar } from "notistack";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";

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

   const [formData, setFormData] = useState({
          title: "",
          author: "",
          description: "",
          price: 0,
          genre: "",
          condition: "",
          edition: "",
          imageURL: ""
          
      });

  const fetchCartByUser = async () => {
    const id = localStorage.getItem("userId");
    setLoading(true);
    try {
      const response = await getCartByUser(id);
      if (response && response.data) {
        const items = response.data.data || []; // Adjust according to actual API structure
        const totalAmount = response.data.totalAmount || 0;
        setCartItem(Array.isArray(items) ? items : []);
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
  };

  useEffect(() => {
    fetchCartByUser();
  }, []);

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

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="success" />
      </Backdrop>
    </>
  );
}
