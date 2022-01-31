import React from "react";
import { Link } from "react-router-dom";
import SetTitle from "../../hooks/setTitle";
import Loader from "../../components/Loader/Loader";
import { observer } from "mobx-react";
import { Typography, Button } from "@mui/material";
import category from "../../store/category";

const News = observer(() => {
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

    SetTitle("News");

    return (
        <div className="news">
            <Typography variant="h3" align="center">
                Актуальные новости
            </Typography>
            {loading ? (
                <Loader />
            ) : (
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                    gap: "0 10%"
                }}>
                    {news.map((item) => (
                        <div key={item.id} style={{ marginTop: "30px", position: 'relative' }}>
                            <img
                                src={item.preview_image}
                                alt={item.name}
                                style={{
                                    height: "472px",
                                    width: "315px",
                                    borderRadius: '30px'
                                }}
                            />
                            <Typography style={{position: 'relative', bottom: '100px', textAlign: 'center'}} color="#FFFFFF" variant="h4" gutterBottom>
                                {item.name}
                            </Typography>
                            <Button
                                variant="contained"
                                LinkComponent={Link}
                                to={`/news/${item.id}`}
                                style={{ marginTop: "5px", position: 'absolute', bottom: '50px', left: '100px' }}
                            >
                                Подробнее
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
});

export default News;
