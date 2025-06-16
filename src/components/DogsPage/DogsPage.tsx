import { useState, useEffect } from 'react';
import {SearchForm} from '../SearchForm/SearchForm';
import {ListComponent} from '../ListComponent/ListComponent';
import {Pagination} from '../PaginationComponent/PaginationComponent';
import { searchService } from '../../services/searchService';
import { DogType, SearchParams } from '@/types/types';

export const DogsPage = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const [dogs, setDogs] = useState<DogType[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // fetchDogs(searchParams);
  }, []);

  const fetchDogs = async (params: SearchParams) => {
    setLoading(true);
    try {
      const data = await searchService.getDogsIds(params);
      if (data && data.total > 0) {
        const dogs = await searchService.getDogsByIds(data.resultIds);
        setDogs(dogs);
        setTotal(dogs.length);
      }
    } catch (err) {
      console.error("Failed to fetch dogs:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = (newParams: SearchParams) => {
    newParams.from = 0;
    setSearchParams(newParams);
    fetchDogs(newParams);
  };

  const handlePageChange = (from: number) => {
    const params = { ...searchParams, from };
    setSearchParams(params);
    fetchDogs(params);
  };

  return (
    <div>
      <SearchForm onSearch={resetSearch} />
      <ListComponent dogs={dogs} />
      {total > 0 && (
        <Pagination
          total={total}
          size={searchParams.size}
          from={searchParams.from}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

