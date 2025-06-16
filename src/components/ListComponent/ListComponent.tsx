import { useState } from "react";
import styles from "./ListComponent.module.css";
import { Card } from "./Card";
import { searchService } from "../../services/searchService";

type ListComponentProps = {
  dogs: {
    id: string;
    img: string;
    name: string;
    breed: string;
    zip_code: string;
  }[];
};

export const ListComponent = ({ dogs }: ListComponentProps) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showBanner, setShowBanner] = useState(false);

  const onToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.indexOf(id) !== -1
        ? prev.filter((dogId) => dogId !== id)
        : [...prev, id]
    );
  };

  const handleMatch = async () => {
    try {
      searchService.matchDogsByIds(favorites);
      const match = await setShowBanner(true);
      setTimeout(() => setShowBanner(false), 5000);
    } catch (e) {
      //TODO: handle re-try 
    }
  };

  return (
    <div>
      <div className={styles.bannerWrapper}>
        {showBanner && (
          <div className={`${styles.banner} ${styles.show}`}>
            Success! Your matches have been submitted.
          </div>
        )}
      </div>
      <button
        onClick={handleMatch}
        className={styles.matchButton}
        disabled={favorites.length === 0}>
        Match Selected Dogs
      </button>
      <div className={styles.container}>
        {dogs.map((dog) => (
          <div key={dog.id} className={styles.card}>
            <Card
              dog={dog}
              onToggleFavorite={onToggleFavorite}
              isFavorite={favorites.includes(dog.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
