import React from 'react';

const Card = (props) => {
  const {
    id,
    title,
    rating,
    image,
    favorite
  } = props;

  return(
    <div className='card'>
      <img src={image} />
      <h2>{title}</h2>
      <h3>Rating: {rating}</h3>
      <button>Favorite</button>
    </div>
  )
}

export default Card
