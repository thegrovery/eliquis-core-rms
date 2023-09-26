const dotenv = require("dotenv");
dotenv.config();

const algoliasearch = require("algoliasearch");
const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_WRITE_API_KEY
);

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const removeMd = require("remove-markdown");

// Function to get the size of an object in bytes
const sizeof = obj => {
  return Buffer.from(JSON.stringify(obj)).length;
};

// Algolia's maximum record size (in bytes)
const ALGOLIA_MAX_SIZE = 10000; // 10KB

// Function to truncate the content of a record to fit Algolia's size limit
const truncateToFit = record => {
  let truncatedRecord = { ...record };
  while (sizeof(truncatedRecord) > ALGOLIA_MAX_SIZE) {
    truncatedRecord.content = truncatedRecord.content.slice(0, -100); // Remove the last 100 characters
    if (!truncatedRecord.content) break; // Stop if content is empty
  }
  return truncatedRecord;
};

const readFilesRecursively = (directory) => {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const files = entries.filter(file => !file.isDirectory()).map(file => path.join(directory, file.name));
  const folders = entries.filter(folder => folder.isDirectory());

  folders.forEach(folder => {
    files.push(...readFilesRecursively(path.join(directory, folder.name)));
  });

  return files;
};

const directoryPath = "./src/content/docs/en";
const filenames = readFilesRecursively(directoryPath).filter(filename => {
  return path.extname(filename) === '.mdx'; // Check for markdown files
});

console.log('Filenames:', filenames); // Log the filenames

const splitContentByHeadings = (content, title) => {
  const splitByH2 = content.split(/##\s+/).slice(1);
  const splitByH3 = content.split(/###\s+/).slice(1);

  return {
    lvl0: splitByH2[0] || null,
    lvl1: title,
    lvl2: splitByH3[0] || null,
    // Add more levels if needed
  };
};

const data = filenames.map(filename => {
  try {
    const markdownWithMeta = fs.readFileSync(filename, 'utf8');
    const { data: frontmatter, content } = matter(markdownWithMeta);
    
    const levels = splitContentByHeadings(content, frontmatter.title);

    const relativePath = path.relative(directoryPath, filename);
    const urlSlug = relativePath.replace(/\.mdx$/, '');
    const url = `/${urlSlug}`;

    const object = {
      objectID: frontmatter.slug,
      title: frontmatter.title,
      content: removeMd(content).replace(/\n/g, ""),
      url: url,
      ...levels  // spread the levels into the object
    };

    // Truncate the content of the object if it exceeds Algolia's size limit
    const truncatedObject = truncateToFit(object);

    console.log('Truncated Object:', truncatedObject);

    return truncatedObject;
  } catch (e) {
    console.log('Error reading file:', filename, e.message);
  }
}).filter(Boolean);

console.log('Data:', data); // Log the data

// Send the dataset in JSON format
client
  .initIndex(process.env.ALGOLIA_INDEX_NAME)
  .saveObjects(data, { autoGenerateObjectIDIfNotExist: true })
  .then(res => console.log(res))
  .catch(err => console.error(err));
