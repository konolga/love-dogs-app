import { DogType } from "@/types/types";

type CardProps = {
  dog: DogType;
};

export const Card = ( { dog }: CardProps) => {
  return (
    <div className="card">
      <img src={dog.img} alt={dog.name} />
      <h2>{dog.name}</h2>
      <p>{dog.breed}</p>
      <div>{dog.zip_code}</div>
    </div>
  );
};
