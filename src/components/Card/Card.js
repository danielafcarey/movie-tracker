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
      <h1>{title}</h1>
      <img src={image} />
      <h3>Rating: {rating}</h3>
      <button>Favorite</button>
    </div>
  )
}

export default Card
