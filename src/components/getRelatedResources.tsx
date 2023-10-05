// src/utils/getRelatedResources.ts
import resources from '~/data/resources.json';

interface Resource {
  title: string;
  tags: string[];
  // ...other properties of a resource
}

function getRelatedResources(tags: string[] = ['all'], titles: string[] = ['all']): Resource[] {
  if (tags.includes('all') && titles.includes('all')) {
    // If 'all' is included in tags or titles, return all resources
    return resources.resources;
  }

  return resources.resources.filter(resource =>
    tags.some(tag => resource.tags.includes(tag)) ||
    titles.includes(resource.title)
  );
}

export default getRelatedResources;
