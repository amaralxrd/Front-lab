import React from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import {
    AppBar,
    Toolbar,
    Link as MUILink,
    Typography,
    Container,
    TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useStyles } from "./navbarStyles";
import category from "../../store/category";

const Navbar = () => {
    const [searchText, setSearchText] = React.useState("");

    const classes = useStyles();

    React.useState(() => {
        fetch("https://demo-api.vsdev.space/api/categories")
            .then((res) => res.json())
            .then((data) => {
                category.setCategories(data);
            })
    }, []);

    const search = () => {
        console.log(searchText);
        setSearchText("");
    };

    return (
        <AppBar color="primary" position="static">
            <Container
                fixed
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Toolbar disableGutters>

                    <MUILink
                        style={{ marginLeft: "10px" }}
                        component={Link}
                        to="/"
                        className={classes.navLink}
                    >

                    </MUILink>
                    <MUILink
                        style={{ marginLeft: "10px", display: 'flex' }}
                        component={Link}
                        to="/"
                        className={classes.navLink}
                    >
                        <img src={logo} alt="logo" height="64px" width="64px" />
                        <Typography style={{ margin: 'auto 0', marginLeft: '30px' }} variant="h6">Главная</Typography>
                    </MUILink>
                    <MUILink
                        component={Link}
                        to="/news"
                        className={classes.navLink}
                    >
                        <Typography variant="h6">Новости</Typography>
                    </MUILink>
                    <MUILink
                        component={Link}
                        to="/gallery"
                        className={classes.navLink}
                    >
                        <Typography variant="h6">Галерея</Typography>
                    </MUILink>
                </Toolbar>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <TextField
                        variant="standard"
                        label="Поиск"
                        color="warning"
                        className={classes.textField}
                        inputProps={{
                            className: classes.search,
                        }}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{
                            marginBottom: "17px",
                            marginLeft: "10px",
                            marginTop: "-1px",
                        }}
                    />
                    <SearchIcon onClick={search} />
                </div>
            </Container>
        </AppBar>
    );
};

export default Navbar;
