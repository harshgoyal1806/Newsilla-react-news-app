import React from "react";

const NewsItem = ({
  title,
  description,
  imageUrl,
  newsUrl,
  author,
  date,
  source,
}) => {
  const fallbackImage =
    "https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D";

  return (
    <div className="my-3 card position-relative">
      <span
        className="position-absolute top-0 end-0 badge rounded-pill bg-danger"
        style={{ zIndex: 1 }}
      >
        {source}
        <span className="visually-hidden">unread messages</span>
      </span>
      <img
        src={imageUrl || fallbackImage}
        alt="News"
        className="card-img-top img-fluid"
        style={{ height: "200px", objectFit: "cover", width: "100%" }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackImage;
        }}
      />
      <div className="card-body">
        <h5 className="card-title">{title} </h5>
        <p className="card-text">{description}</p>
        <p className="card-text">
          <small className="text-muted">
            By {author ? author : "undefined"} on{" "}
            {new Date(date).toDateString()}
          </small>
        </p>
        <a
          href={newsUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-sm btn-primary"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
