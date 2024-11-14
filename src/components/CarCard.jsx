import React from "react";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => (
  <div>
    <h3>{car.title}</h3>
    <img src={car.images[0]} alt={car.title} />
    <p>{car.description}</p>
    <Link to={`/car/${car.id}`}>View Details</Link>
  </div>
);

export default CarCard;
