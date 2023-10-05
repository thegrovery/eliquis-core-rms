import resources from '~/data/resources.json';

interface Resource {
  title: string;
  tags: string[];
  // ...other properties of a resource
}

function getRelatedResources(currentTags: string[], relatedTitles: string[] = []): Resource[] {
  return resources.resources.filter(resource =>
    resource.tags.some(tag => currentTags.includes(tag)) ||
    relatedTitles.includes(resource.title)
  );
}

export default getRelatedResources;
