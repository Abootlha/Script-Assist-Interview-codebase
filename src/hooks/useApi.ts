import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { ApiResponse , SWAPIResource } from '../types';

const BASE_URL = 'https://swapi.dev/api';

export function useApi<T extends SWAPIResource>(
  endpoint: string | null,
  options: Omit<UseQueryOptions<ApiResponse<T>, Error>, 'queryKey' | 'queryFn'> = {}
) {
  return useQuery<ApiResponse<T>, Error>({
    queryKey: endpoint ? [endpoint] : [],
    queryFn: async () => {
      if (!endpoint) throw new Error('No endpoint provided');
      const response = await fetch(`${BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    enabled: !!endpoint,
    ...options,
  });
}

export async function fetchResourceDetails<T extends SWAPIResource>(
  resourceType: string,
  id: string
): Promise<T> {
  const response = await fetch(`${BASE_URL}/${resourceType}/${id}/`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}