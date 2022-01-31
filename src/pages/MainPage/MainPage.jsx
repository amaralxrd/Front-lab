import React from "react";
import SetTitle from "../../hooks/setTitle";
import { Link } from "react-router-dom";
import { Link as MUILink, Typography, Container, Button } from "@mui/material";
import { useStyles } from "./mainPageStyles";
import { observer } from "mobx-react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
import Loader from "../../components/Loader/Loader";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

SwiperCore.use([Autoplay, Pagination, Navigation]);

const MainPage = observer(() => {
    const classes = useStyles();
    SetTitle("Main page");

    const [news, setNews] = React.useState();
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        setLoading(true);
        fetch("https://demo-api.vsdev.space/api/articles")
            .then((res) => res.json())
            .then((data) => {
                setTimeout(() => {
                    setNews(data);
                    setLoading(false);
                }, 1000);
            });
    }, []);

    return (
        <div style={{ marginTop: "50px" }}>
            <Typography variant="h3" align="center" gutterBottom>
                Здравствуйте!<br />
                Добро пожаловать на наш новостной сайт
            </Typography>
            {!loading ? (
                <Container style={{ marginTop: "50px" }}>
                    <Swiper
                        spaceBetween={100}
                        slidesPerView={1}
                        navigation={true}
                        autoplay={{ delay: 3000 }}
                        pagination={{ clickable: true }}
                        allowTouchMove
                        loop
                    >
                        {news
                            .map((news) => (
                                <SwiperSlide
                                    className={classes.slide}
                                    key={news.id}
                                >
                                    <img
                                        src={news.preview_image}
                                        alt={news.name}
                                        style={{
                                            height: "530px",
                                            objectFit: "cover",
                                            borderRadius: '30px',
                                        }}
                                    />
                                    <Typography className={classes.heading} variant="h4">{news.name}</Typography>
                                    <Button
                                        variant="contained"
                                        LinkComponent={Link}
                                        to={`/news/${news.id}`}
                                        style={{ marginTop: "5px", position: 'absolute', left: '230px', top: '450px' }}
                                    >
                                        Подробнее
                                    </Button>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </Container>
            ) : (
                <Loader />
            )}
        </div>
    );
});

export default MainPage;
