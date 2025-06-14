import React, { useState } from 'react';
import Select from 'react-select';
import { useBreeds } from '../../hooks/useBreeds';

type SearchProps = {
  onSearch: (searchTerm: string, selectedBreeds: string[]) => void;
};

export const SearchComponent = () => {
  const { breeds, loading } = useBreeds();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);

  // Convert breeds to react-select format
  const breedOptions = breeds.map(breed => ({
    value: breed,
    label: breed,
  }));

 const handleSearch = (selectedBreeds: string[]) => {
console.log('Searching for:', searchTerm, 'in breeds:', selectedBreeds);
};
const handleSubmit = (e: React.FormEvent) => {
e.preventDefault();
handleSearch(selectedBreeds);
};

  return (
    <form onSubmit={handleSubmit} className="search-component">
      <input
        type="text"
        placeholder="Search dogs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Select
        isMulti
        options={breedOptions}
        value={selectedBreeds.map(breed => ({ value: breed, label: breed }))}
        onChange={(selectedOptions) => {
          setSelectedBreeds(selectedOptions.map(option => option.value));
        }}
        isLoading={loading}
        placeholder="Select breeds..."
      />
      <button type="submit">Search</button>
    </form>
  );
};
