import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";


export default function Header() {
    return (
        <>
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{flexGrow: 1}} component = "div">
                        eBook
                    </Typography>
                    <Button component={Link} to="/login" color="inherit">Login</Button>
                    <Button component={Link} to="/register" color="inherit">Register</Button>
                </Toolbar>
            </AppBar>
        </Box>
        </>
    )
}
