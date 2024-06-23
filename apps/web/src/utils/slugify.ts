/**
 * Slugifies a given text by converting it to lowercase, removing diacritics,
 * replacing non-alphanumeric characters with hyphens, and removing leading
 * and trailing hyphens.
 *
 * @param {string} text - The text to be slugified.
 * @return {string} The slugified version of the text.
 * @throws {Error} If the input is not a string.
 */
function slugify(text: string): string {
  if (typeof text !== 'string') {
    throw new Error('Please provide a string');
  }

  let slug = text
    .normalize('NFD') // Decompose combined characters (e.g., é → e + ´)
    .replace(/[\u0300-\u036f]/g, ''); // Remove diacritics (e.g., ´)

  slug = slug.toLowerCase().trim();

  slug = slug.replace(/[^a-z0-9]+/g, '-'); // Allow only alphanumeric and hyphens
  slug = slug.replace(/-+/g, '-'); // Replace multiple consecutive hyphens with one

  slug = slug.replace(/^-+|-+$/g, ''); // Remove Leading/Trailing Hyphens

  return slug;
}

export default slugify;
