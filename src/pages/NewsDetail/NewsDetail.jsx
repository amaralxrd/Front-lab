import React from "react";
import SetTitle from "../../hooks/setTitle";
import Loader from "../../components/Loader/Loader";
import { observer } from "mobx-react";
import { Typography } from "@mui/material";
import Comments from "../../components/Comments/Comments";
import category from "../../store/category";

const NewsDetail = observer((props) => {
    const [news, setNews] = React.useState();
    const [loading, setLoading] = React.useState(true);

    let article_id = props.match.params.id;

    React.useEffect(() => {
        setLoading(true);
        fetch(`https://demo-api.vsdev.space/api/articles/${article_id}`)
            .then((res) => res.json())
            .then((data) => {
                setTimeout(() => {
                    setNews(data);
                    setLoading(false);
                }, 1000);
            });
    }, [article_id]);

    SetTitle(`Article #${article_id}`);

    return (
        <div className="news-detail">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Typography style={{ marginTop: '50px' }} variant="h5" align="center" gutterBottom>
                        {news.name}
                    </Typography>
                    <div style={{ display: 'flex' }}>
                        <img
                            src={"/" + news.full_image}
                            alt={news.name}
                            height="400px"
                            loading="lazy"
                            style={{paddingRight: '50px'}}
                        />
                        <div>
                            <Typography style={{fontWeight: '700'}} variant="body1">{news.shortDesc}</Typography>
                            <Typography variant="body1" gutterBottom>
                                {news.desc}
                            </Typography>
                            <br />
                            <div>
                                {category?.categories[news.category]?.name ? (
                                    <Typography variant="body1" gutterBottom>
                                        Category:{" "}
                                        {category?.categories[news.category]?.name}
                                    </Typography>
                                ) : (
                                    ""
                                )}
                                <Typography variant="body1" gutterBottom>
                                    Published on {news.date}
                                </Typography>
                            </div>
                        </div>

                    </div>
                    <Comments article_id={article_id} />
                </>
            )}
        </div>
    );
});

export default NewsDetail;
