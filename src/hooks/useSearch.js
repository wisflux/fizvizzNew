import { useState, useCallback, useMemo } from 'react';

export const useSearch = (items = [], searchKeys = ['name', 'description']) => {
  const [searchQuery, setSearchQuery] = useState('');

  const getFilteredResults = useCallback(() => {
    if (!searchQuery) return [];
    const query = searchQuery.toLowerCase();

    return items.filter(item => 
      searchKeys.some(key => 
        item?.[key]?.toLowerCase().includes(query) || false
      )
    );
  }, [searchQuery, items, searchKeys]);

  const results = useMemo(() => getFilteredResults(), [getFilteredResults]);

  return {
    searchQuery,
    setSearchQuery,
    results,
    hasResults: results.length > 0,
  };
}; 