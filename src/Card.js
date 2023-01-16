import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiArrowDown } from "react-icons/fi";

const Card = () => {
  const [meme, setMeme] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(3);
  const [type, setType] = useState("today");
 

  const fetchMeme = async () => {
    const response = await axios.get(
      `https://www.reddit.com/r/dankmemes/top/.json?limit=${limit}&t=${type}`
    );
    setMeme(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMeme();
  }, [limit]);

  if (loading) {
    return (
      <main>
        <h2>Loading...</h2>
      </main>
    );
  }

  const loadMore = () => {
    setLimit(limit + 6);
  };

  return (
    <>
      <h1>Dark Humor Memes</h1>
      <div className="container">
        <div className="row">
          {meme.data.children.map((currElem, index) => {
            return (
              <div className="col-md-4 brighten" key={index}>
                <img
                  className="img-rounded img-responsive"
                  src={currElem.data.url_overridden_by_dest}
                  alt={index}
                />
              </div>
            );
          })}
        </div>
        <div className="col-md-8 offset-md-6">
          <button
            type="button"
            class="btn btn-outline-danger btn-lg"
            onClick={loadMore}
          >
            Load More
            <FiArrowDown className="arrow-icon"></FiArrowDown>
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
