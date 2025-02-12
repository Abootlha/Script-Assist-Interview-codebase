// src/components/ResourceDetail.tsx
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Group, Text, Badge, Title, Container, Grid, LoadingOverlay } from '@mantine/core';
import { useApi } from '../hooks/useApi';
import { Character, Planet, ResourceType, ApiResponse } from '../types';

const ResourceDetail: FC = () => {
  const { type, id } = useParams<{ type: ResourceType; id: string }>();

  
  const { data: resource, isLoading } = useApi<Character | Planet>(
    type && id ? `/${type}/${id}` : null
  );

  const { data: homeworld } = useApi<Planet>(
    resource && 'homeworld' in resource
      ? `/planets/${(resource as unknown as Character).homeworld.split('/').slice(-2)[0]}`
      : null
  );

  const renderDetails = () => {
    if (!resource) return null;

    const details = Object.entries(resource).filter(([key]) => 
      !['created', 'edited', 'url'].includes(key) && !Array.isArray((resource as Record<string, any>)[key])
    );

    return (
      <Grid>
        {details.map(([key, value]) => (
          <Grid.Col span={6} key={key}>
            <Card shadow="sm" p="lg">
              <Group position="apart">
                <Text weight={500} transform="capitalize">
                  {key.replace('_', ' ')}
                </Text>
                <Badge>{String(value)}</Badge>
              </Group>
            </Card>
          </Grid.Col>
        ))}
        
        {homeworld && (
          <Grid.Col span={12}>
            <Card shadow="sm" p="lg" mt="md">
              <Title order={3} mb="md">Homeworld Details</Title>
              <Grid>
                <Grid.Col span={4}>
                  <Text weight={500}>Name: {homeworld.name}</Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text weight={500}>Climate: {homeworld.climate}</Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text weight={500}>Population: {homeworld.population}</Text>
                </Grid.Col>
              </Grid>
            </Card>
          </Grid.Col>
        )}
      </Grid>
    );
  };

  return (
    <Container size="xl">
      <div style={{ position: 'relative' }}>
        <LoadingOverlay visible={isLoading} />
        {resource && (
          <>
            <Title order={1} mb="xl">{resource.name}</Title>
            {renderDetails()}
          </>
        )}
      </div>
    </Container>
  );
};

export default ResourceDetail;