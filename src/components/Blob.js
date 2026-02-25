import React, { useState } from "react";
import { BLOB_PATHS } from "../blobPaths";

const DEFAULT_VIEWBOX = "0 0 200 200";
const DEFAULT_COLOR = "#b9f8cf";

function getRandomPath() {
  return BLOB_PATHS[Math.floor(Math.random() * BLOB_PATHS.length)];
}

function getTranslate(viewBox) {
  const parts = viewBox.trim().split(/\s+/);
  if (parts.length >= 4) {
    const w = parseFloat(parts[2], 10);
    const h = parseFloat(parts[3], 10);
    if (!Number.isNaN(w) && !Number.isNaN(h))
      return `translate(${w / 2} ${h / 2})`;
  }
  return "translate(100 100)";
}

export default function Blob({
  color = DEFAULT_COLOR,
  viewBox = DEFAULT_VIEWBOX,
  className,
  style,
  ...rest
}) {
  const [pathD] = useState(() => getRandomPath());
  const transform = getTranslate(viewBox);

  return (
    <div className={`blob-enter ${className ?? ""}`} style={style}>
      <svg
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        className="size-full"
        {...rest}
      >
        <path fill={color} d={pathD} transform={transform} />
      </svg>
    </div>
  );
}
