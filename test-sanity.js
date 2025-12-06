const { createClient } = require("next-sanity");

// Mock env vars if needed, or rely on process.env if loaded
const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your_project_id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2024-01-01";

console.log("Testing Sanity Connection...");
console.log("Project ID:", projectId);
console.log("Dataset:", dataset);

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

async function testFetch() {
  try {
    const data = await client.fetch('*[_type == "portfolioItem"][0]');
    console.log(
      "Successfully fetched data:",
      data ? "Found item" : "No items found"
    );
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}

testFetch();
