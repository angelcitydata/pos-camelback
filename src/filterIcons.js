/**
 * Font Awesome icon names (fa-solid) for filter labels.
 * Used by FilterCard when an icon is defined for the current filter.
 */

const TOP_TEN_ICON = "star";

const PRODUCT_TYPE_ICONS = {
  General: "tag",
  Hardgoods: "box",
  Edibles: "cookie-bite",
  Arrangement: "spa",
  Wraps: "gift",
  Wine: "wine-bottle",
  "Potted Plants": "seedling",
  "Gift Boxes": "gift",
};

const COLLECTION_ICONS = {
  "Top Ten": TOP_TEN_ICON,
  "Back to School": "graduation-cap",
  "Books & Stationary": "book",
  Pantry: "jar",
  "Summer 2025": "sun",
  Sweets: "candy-cane",
  "Flowers Under $100": "coins",
  "Home Fragrance": "spray-can-sparkles",
  "Home & Objects": "couch",
  "Table Centerpieces": "wine-glass",
  "Plant Collection": "seedling",
  Orchids: "spa",
  "Winter Collection 2025": "snowflake",
  Romance: "heart",
  "Wine & Flower Gifts": "wine-bottle",
  "Weddings & Events": "ring",
};

/**
 * Returns the Font Awesome icon name (e.g. "star") for a filter label,
 * or null if none is defined. FilterCard should only render an icon when this is non-null.
 *
 * @param {string} filterLabel - e.g. "Top Ten", "Edibles", "Back to School"
 * @param {string} filterMode - "Collections" | "Product Type"
 * @returns {string|null}
 */
export function getFilterIcon(filterLabel, filterMode) {
  if (!filterLabel) return null;
  if (filterLabel === "Top Ten") return TOP_TEN_ICON;
  if (filterMode === "Product Type") return PRODUCT_TYPE_ICONS[filterLabel] ?? null;
  return COLLECTION_ICONS[filterLabel] ?? null;
}
