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
