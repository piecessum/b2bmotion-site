const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");

// Read CSV file
const csvPath = path.join(process.env.HOME, "Downloads/wiki-custom.csv");
const csvContent = fs.readFileSync(csvPath, "utf-8");

// Parse CSV with semicolon delimiter using csv-parse library
const records = parse(csvContent, {
  delimiter: ";",
  columns: true,
  skip_empty_lines: true,
  relax_quotes: true,
  relax_column_count: true,
});

const articles = [];
const categories = new Set();

for (const row of records) {
  const postId = row["Post ID"];
  const title = row["Title"];
  const category = row["Category"];
  const media = row["Media"];
  const textRaw = row["Text"];

  if (!postId || !title) continue;

  if (category) {
    category.split(";").forEach((cat) => categories.add(cat.trim()));
  }

  // Parse text JSON - the CSV field is already unescaped by csv-parse
  let text = [];
  try {
    text = JSON.parse(textRaw);
  } catch (e) {
    // Try fixing common issues
    try {
      // Sometimes the JSON has unescaped quotes inside strings
      const fixed = textRaw.replace(/""/g, '"');
      text = JSON.parse(fixed);
    } catch (e2) {
      // If it's not JSON at all, treat as plain HTML text
      if (textRaw && textRaw.length > 0 && !textRaw.startsWith("[")) {
        text = [{ ty: "text", te: textRaw }];
      } else {
        console.error(
          `Failed to parse text for ${postId} (${title}): ${e2.message}`,
        );
        console.error(`  Raw length: ${textRaw?.length || 0}`);
      }
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

const failedCount = articles.filter((a) => a.text.length === 0).length;
console.log(
  `Generated ${articles.length} articles with ${categories.size} categories`,
);
console.log(`Failed to parse text for ${failedCount} articles`);
console.log("Categories:", Array.from(categories).sort().join(", "));
