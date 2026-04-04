const fs = require("fs");
const path = require("path");

// Read CSV file
const csvPath = path.join(process.env.HOME, "Downloads/wiki-custom.csv");
const csvContent = fs.readFileSync(csvPath, "utf-8");

// Parse CSV with semicolon delimiter
const lines = csvContent.split("\n").filter((line) => line.trim());
const header = lines[0];

const articles = [];
const categories = new Set();

for (let i = 1; i < lines.length; i++) {
  // Simple CSV parser that handles quoted fields
  const line = lines[i];
  const fields = [];
  let current = "";
  let inQuotes = false;

  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    if (char === '"') {
      if (inQuotes && line[j + 1] === '"') {
        current += '"';
        j++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ";" && !inQuotes) {
      fields.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  fields.push(current);

  const postId = fields[0];
  const title = fields[2];
  const category = fields[3];
  const media = fields[5];
  const textRaw = fields[7];

  if (!postId || !title) continue;

  if (category) {
    category.split(";").forEach((cat) => categories.add(cat.trim()));
  }

  // Parse text JSON
  let text = [];
  try {
    // Unescape the JSON string
    const unescaped = textRaw.replace(/\\"/g, '"').replace(/\\\\/g, "\\");
    text = JSON.parse(unescaped);
  } catch (e) {
    // If parsing fails, try with different escaping
    try {
      const fixed = textRaw.replace(/""/g, '"');
      text = JSON.parse(fixed);
    } catch (e2) {
      console.error(`Failed to parse text for ${postId}: ${e2.message}`);
    }
  }

  // Generate slug from title using transliteration
  const translitMap = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "yo",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "yu",
    я: "ya",
    і: "i",
    ї: "yi",
    є: "ye",
    ґ: "g",
  };
  const slug = title
    .toLowerCase()
    .split("")
    .map((char) => (translitMap[char] !== undefined ? translitMap[char] : char))
    .join("")
    .replace(/[^\w\s-]/gi, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 80);

  articles.push({
    id: postId,
    title: title.replace(/^"|"$/g, ""),
    category: category || "Без категории",
    image: media,
    slug,
    text,
  });
}

// Generate TypeScript file
const tsContent = `// Auto-generated from wiki-custom.csv
export interface WikiCustomArticle {
  id: string
  title: string
  category: string
  image: string
  text: any[]
  slug: string
}

export const wikiCustomCategories = ${JSON.stringify(Array.from(categories).sort())}

export const wikiCustomArticles: WikiCustomArticle[] = ${JSON.stringify(articles, null, 2)}
`;

const outputPath = path.join(__dirname, "../lib/wiki-custom-data.ts");
fs.writeFileSync(outputPath, tsContent, "utf-8");

console.log(
  `Generated ${articles.length} articles with ${categories.size} categories`,
);
console.log("Categories:", Array.from(categories).sort().join(", "));
