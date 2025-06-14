import { Card } from "./Card";
import { DogType } from "../../types/types"; 

interface ListComponentProps {
  dogs: DogType[];
}

export const ListComponent = ({ dogs }: ListComponentProps) => {
  return (
    <div className="list-component">
      {dogs.map((dog) => (
        <Card dog={dog} />
      ))}
    </div>
  );
};
