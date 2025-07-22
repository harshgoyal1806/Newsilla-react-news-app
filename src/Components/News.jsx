import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
const apiKey = import.meta.env.VITE_API_KEY;
const News = ({ pageSize, country, category ,setProgress}) => {
  const [articles, setArticles] = useState([]);
  const [val, setVal] = useState(1); // page number
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Reset articles and page when filters change
  useEffect(() => {
    setArticles([]);
    setTotalResults(0);
    setProgress(0);
    setVal(1);
  }, [category, country]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${val}&pageSize=${pageSize}`;
      setProgress((prev)=>prev+10);

      try {
        const res = await fetch(url);
        const data = await res.json();
        setProgress((prev)=>prev+10);

        if (val === 1) {
          setArticles(data.articles || []);
        } else {
          setArticles((prev) => [...prev, ...(data.articles || [])]);
        }

        setTotalResults(data.totalResults || 0);
        setProgress((prev)=>prev+10);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setProgress(100);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [val, pageSize, category, country]);

  const fetchMoreData = () => {
    setVal((prev) => prev + 1);
  };

  const isLastPage = val * pageSize >= totalResults;

  return (
    <div className="container my-3">
      <h2 className="text-center" style={{ margin: "35px 0px",marginTop:"90px" }}>
        Newsilla - Top {category==="general" ? '' : category.charAt(0).toUpperCase() + category.slice(1)} Headlines
      </h2>

      {isLoading && val === 1 && <Spinner />} {/* Only show on first load */}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={!isLastPage}
        loader={<Spinner />}
      >
        <div className="row">
          {articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={
                  element.title
                    ? element.title.split(" ").slice(0, 15).join(" ") + "..."
                    : ""
                }
                description={
                  element.description
                    ? element.description.split(" ").slice(0, 40).join(" ") +
                      "..."
                    : ""
                }
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author || "Unknown"}
                date={element.publishedAt}
                source={element.source.name}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

News.defaultProps = {
  country: "us",
  pageSize: 8,
  category: "general",
};

export default News;
