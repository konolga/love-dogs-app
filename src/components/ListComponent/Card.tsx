import React from "react";
import styles from "./Card.module.css";

type CardProps = {
  dog: {
    id: string;
    img: string;
    name: string;
    breed: string;
    zip_code: string;
  };
  onToggleFavorite?: (id: string) => void;
  isFavorite?: boolean;
};

export const Card = ({ dog, onToggleFavorite, isFavorite }: CardProps) => {
  const handleHeartClick = () => {
    if (onToggleFavorite) onToggleFavorite(dog.id);
  };
  return (
    <div className={styles.container}>
      <img src={dog.img} alt={dog.name} className={styles.image} />
      <button
        onClick={handleHeartClick}
        className={styles.heartButton}
        aria-label={isFavorite ? "Unfavorite" : "Favorite"}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>
      <h2>{dog.name}</h2>
      <p>{dog.breed}</p>
      <div>{dog.zip_code}</div>
    </div>
  );
};
