import { Card } from "./Card";
import { DogType } from "../../types/types"; 

interface ListComponentProps {
  dogs: DogType[];
}

export const ListComponent = ({ dogs }: ListComponentProps) => {
  return (
    <div className="list-component">
      {dogs.map((dog) => (
        <div key={dog.id} className="dog-card">
        <Card dog={dog} />
        </div>
      ))}
    </div>
  );
};
