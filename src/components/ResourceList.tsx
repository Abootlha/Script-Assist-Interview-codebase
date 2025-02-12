import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TextInput, Select, Group, Title, Container, LoadingOverlay } from '@mantine/core';
import { useApi } from '../hooks/useApi';
import { ResourceType, SWAPIResource } from '../types';

interface Endpoints {
  films: string;
  people: string;
  planets: string;
  species: string;
  starships: string;
  vehicles: string;
}

const ResourceList: FC = () => {
  const navigate = useNavigate();
  const [resourceType, setResourceType] = useState<ResourceType>('people');
  const [searchQuery, setSearchQuery] = useState('');
  const [endpoints, setEndpoints] = useState<Endpoints | null>(null);
  const [isLoadingEndpoints, setIsLoadingEndpoints] = useState(true);

  useEffect(() => {
    const fetchEndpoints = async () => {
      setIsLoadingEndpoints(true);
      try {
        const response = await fetch('https://swapi.dev/api/');
        const data = await response.json();
        setEndpoints(data as Endpoints);
      } catch (error) {
        console.error('Error fetching endpoints:', error);
      } finally {
        setIsLoadingEndpoints(false);
      }
    };

    fetchEndpoints();
  }, []);

  const { data, isLoading } = useApi<SWAPIResource>(`/${resourceType}`);

  const filteredData = data?.results?.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleRowClick = (index: number) => {
    navigate(`/resources/${resourceType}/${index + 1}`);
  };

  const resourceOptions = [
    { value: 'people', label: 'People' },
    { value: 'planets', label: 'Planets' },
    { value: 'starships', label: 'Starships' },
    { value: 'films', label: 'Films' },
    { value: 'species', label: 'Species' },
    { value: 'vehicles', label: 'Vehicles' },
  ];

  return (
    <Container size="xl">
      <Title order={1} mb="xl">Star Wars Resources</Title>

      <Group mb="md">
        <Select
          label="Resource Type"
          value={resourceType}
          onChange={(value: ResourceType) => setResourceType(value)}
          data={resourceOptions}
        />
        <TextInput
          label="Search"
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Group>

      <div style={{ position: 'relative' }}>
        <LoadingOverlay visible={isLoading || isLoadingEndpoints} />
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Created</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((item, index) => (
              <tr
                key={item.url}
                onClick={() => handleRowClick(index)}
                style={{ cursor: 'pointer' }}
              >
                <td>{item.name || 'N/A'}</td>
                <td>{item.created ? new Date(item.created).toLocaleDateString() : 'N/A'}</td>
                <td>{item.edited ? new Date(item.edited).toLocaleDateString() : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default ResourceList;