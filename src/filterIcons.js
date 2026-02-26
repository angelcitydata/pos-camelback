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

function getCollectionIcon(filterLabel, collections) {
  if (!collections || typeof collections !== "object") return null;
  return collections[filterLabel] ?? null;
}

/**
 * Returns the Font Awesome icon name (e.g. "star") for a filter label,
 * or null if none is defined. FilterCard should only render an icon when this is non-null.
 *
 * @param {string} filterLabel - e.g. "Top Ten", "Edibles", "Back to School"
 * @param {string} filterMode - "Collections" | "Product Type"
 * @param {Object<string, string>} collections - FileMaker map of collection label -> icon name
 * @returns {string|null}
 */
export function getFilterIcon(filterLabel, filterMode, collections = {}) {
  if (!filterLabel) return null;
  if (filterLabel === "Top Ten") return TOP_TEN_ICON;
  if (filterMode === "Product Type")
    return PRODUCT_TYPE_ICONS[filterLabel] ?? null;
  return getCollectionIcon(filterLabel, collections);
}
