import React, { useState } from "react";
import Select from "react-select";
import { useBreeds } from "../../hooks/useBreeds";
import CreatableSelect from "react-select/creatable";
import { SearchParams } from "@/types/types";
import styles from "./SearchForm.module.css";
type SearchFormProps = {
  onSearch: (params: SearchParams) => void;
};

export const SearchForm = ({ onSearch }: SearchFormProps) => {
  const { breeds, loading } = useBreeds();
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [ageMin, setAgeMin] = useState<number | null>(null);
  const [ageMax, setAgeMax] = useState<number | null>(null);

  const breedOptions = breeds.map((breed) => ({
    value: breed,
    label: breed,
  }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params: SearchParams = { breeds: [], zipCodes: [] };
    selectedBreeds.forEach((breed) => params.breeds?.push(breed));
    zipCodes.forEach((zip) => params.zipCodes?.push(zip));
    if (ageMin !== null) params.ageMin = ageMin;
    if (ageMax !== null) params.ageMax = ageMax;
    onSearch(params);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <div className={styles.group}>
        <label className={styles.label}>Breeds</label>
        <Select
          isMulti
          options={breedOptions}
          value={selectedBreeds.map((breed) => ({
            value: breed,
            label: breed,
          }))}
          onChange={(selectedOptions) => {
            setSelectedBreeds(selectedOptions.map((option) => option.value));
          }}
          isLoading={loading}
          placeholder="Select breeds..."
          className={styles.reactSelect}
        />
      </div>
      <div className={styles.group}>
        <label className={styles.label}>Zip Codes</label>
        <CreatableSelect
          isMulti
          options={zipCodes.map((zip) => ({ value: zip, label: zip }))}
          value={zipCodes.map((zip) => ({ value: zip, label: zip }))}
          onChange={(selectedOptions) => {
            setZipCodes(selectedOptions.map((option) => option.value));
          }}
          isLoading={loading}
          placeholder="Type zip codes..."
          className={styles.reactSelect}
        />
      </div>
      <div className={(styles.group, styles.ageGroup)}>
        <label className={styles.label}>Minimum Age</label>
        <input
          type="number"
          value={ageMin || ""}
          onChange={(e) =>
            setAgeMin(e.target.value ? parseInt(e.target.value) : null)
          }
          className={styles.input}
          min="0"
        />
      </div>
      <div className={(styles.group, styles.ageGroup)}>
        <label className={styles.label}>Maximum Age</label>
        <input
          type="number"
          value={ageMax || ""}
          onChange={(e) =>
            setAgeMax(e.target.value ? parseInt(e.target.value) : null)
          }
          className={styles.input}
          min="0"
        />
      </div>

      <button type="submit" className={styles.button}>
        Search Dogs
      </button>
    </form>
  );
};
