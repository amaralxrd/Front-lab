import React from "react";
import { Typography } from "@mui/material";
import { useStyles } from "./footerStyles";

const Footer = () => {
    const classes = useStyles();
    return (
        <footer className={classes.footer} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Typography variant="h6" style={{display: 'flex', flexDirection: "column", textAlign: 'center'}}>
                <a href="https://github.com/amaralxrd" rel="noreferrer" target="_blank" style={{color: '#fff'}} className={classes.navLink}>
                    Жалсанов Амара
                </a>
                <span>201-327</span>
            </Typography>
        </footer>
    );
};

export default Footer;
