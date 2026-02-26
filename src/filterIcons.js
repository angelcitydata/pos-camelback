/**
 * Font Awesome icon names (fa-solid) for filter labels.
 * Used by FilterCard when an icon is defined for the current filter.
 */

const TOP_TEN_ICON = "star";

const PRODUCT_TYPE_ICONS = {
  Arrangement: "flower",
  Basket: "basket-shopping",
  Bowl: "bowl-food",
  Edibles: "cookie-bite",
  "Events/Weddings": "champagne-glasses",
  "Fresh Cut Flowers": "scissors",
  Funeral: "dove",
  General: "tag",
  "Gift Boxes": "gift",
  "Gift Cards": "credit-card",
  Goodies: "cake-candles",
  "Greeting Cards": "envelope-open",
  Hardgoods: "box",
  "Home Décor": "lamp",
  "House Account": "building",
  Jar: "jar-wheat",
  "N/A": "circle-minus",
  Plant: "tree-deciduous",
  Pots: "bucket",
  "Potted Plants": "seedling",
  Service: "handshake",
  "Shop by Color": "palette",
  "Shop by Occasion": "calendar-days",
  "Shop by Products": "store",
  "Shop Supplies": "box-open",
  Spirits: "martini-glass",
  Vase: "vase",
  "With Sympathy": "heart-crack",
  Wine: "wine-bottle",
  Wraps: "ribbon",
};

const COLLECTION_ICONS = {
  "Top Ten": TOP_TEN_ICON,
  "All One Thing": "layer-group",
  Apothecary: "mortar-pestle",
  "Back to School": "graduation-cap",
  "Books & Stationary": "book",
  Crystals: "gem",
  "Flowers Under $100": "coins",
  Gardening: "leaf",
  "Home Fragrance": "spray-can-sparkles",
  "Home & Objects": "couch",
  Kitchen: "utensils",
  Orchids: "spa",
  Pantry: "jar",
  "Plant Collection": "seedling",
  Romance: "heart",
  Savory: "bread-slice",
  Sweets: "candy-cane",
  Sympathy: "heart-crack",
  "Summer 2025": "sun",
  "Table Centerpieces": "wine-glass",
  "The Wrap Club": "ribbon",
  "Vessels & Pottery": "jar",
  "Weddings & Events": "ring",
  Wine: "wine-glass",
  "Wine & Flower Gifts": "wine-bottle",
  "Wine Under $60": "tags",
  "Winter Collection": "snowflake",
  "Winter Collection 2025": "snowflake",
  "Wreaths & Branches": "wreath",
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
  if (filterMode === "Product Type")
    return PRODUCT_TYPE_ICONS[filterLabel] ?? null;
  return COLLECTION_ICONS[filterLabel] ?? null;
}
