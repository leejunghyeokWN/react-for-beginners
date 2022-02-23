import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
function Detail() {
  const [ detail, setDetail ] = useState([]);
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setDetail(json.data.movie);
  };
  useEffect(() => {
    getMovie();
  });
  return (
    <div>
    <img src={detail.medium_cover_image} alt={detail.title}/>
      <h1>{detail.title}</h1>
      <p>RATING : {detail.rating}</p>
      <ul>
        Genres
        {
          detail.genres ?
          detail.genres.map((x)=><li key = {x}>{x}</li>) : null
        }
      </ul>
    </div>
    );
}
export default Detail;