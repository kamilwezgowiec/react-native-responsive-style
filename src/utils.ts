export const isClient = typeof window !== "undefined";

export function isMediaQuery(propertyName: string) {
  return propertyName.startsWith("@media");
}

export function toKebabCase(string: string) {
  return string.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    ($, ofs) => (ofs ? "-" : "") + $.toLowerCase()
  );
}

export function hash(string: string) {
  let hash = 0;

  for (let i = 0, chr = 0; i < string.length; i++) {
    chr = string.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }

  return hash;
}
