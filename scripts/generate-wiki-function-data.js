const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

// Read CSV file
const csvPath = path.join(process.env.HOME, 'Downloads/wiki-funkcional.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parse CSV with semicolon delimiter
const records = parse(csvContent, {
  delimiter: ';',
  columns: true,
  skip_empty_lines: true,
  relax_quotes: true,
  relax_column_count: true,
});

const articles = [];
const categories = new Set();

for (const row of records) {
  const postId = row['Post ID'];
  const title = row['Title'];
  const category = row['Category'];
  const media = row['Media'];
  const textRaw = row['Text'];

  if (!postId || !title) continue;

  if (category) {
    categories.add(category.trim());
  }

  // Text is plain HTML, wrap in text block
  let text = [];
  if (textRaw && textRaw.length > 0) {
    text = [{ ty: "text", te: textRaw }];
  }

  // Generate slug from title using transliteration
  const translitMap = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
    'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
    'і': 'i', 'ї': 'yi', 'є': 'ye', 'ґ': 'g'
  };
  const slug = title
    .toLowerCase()
    .split('')
    .map(char => translitMap[char] !== undefined ? translitMap[char] : char)
    .join('')
    .replace(/[^\w\s-]/gi, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 80);

  articles.push({
    id: postId,
    title: title.replace(/^"|"$/g, ''),
    category: category || 'Без категории',
    image: media,
    slug,
    text,
  });
}

// Generate TypeScript file
const tsContent = `// Auto-generated from wiki-funkcional.csv
export interface WikiFunctionArticle {
  id: string
  title: string
  category: string
  image: string
  text: any[]
  slug: string
}

export const wikiFunctionCategories = ${JSON.stringify(Array.from(categories).sort())}

export const wikiFunctionArticles: WikiFunctionArticle[] = ${JSON.stringify(articles, null, 2)}
`;

const outputPath = path.join(__dirname, '../lib/wiki-function-data.ts');
fs.writeFileSync(outputPath, tsContent, 'utf-8');

console.log(`Generated ${articles.length} articles with ${categories.size} categories`);
console.log('Categories:', Array.from(categories).sort().join(', '));
