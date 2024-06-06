// Inspiration - https://www.zhenghao.io/posts/js-data-type

/**
 * Converts the first letter of a string to lowercase.
 *
 * @param {string} str - The input string.
 * @return {string} The modified string with the first letter in lowercase.
 */
const lowerCaseFirstLetter = (str: string): string =>
  str[0].toLowerCase() + str.slice(1);

/**
 * Returns the type of the provided input as a string.
 * For objects, it returns the specific type (e.g., 'array', 'date') in lowercase.
 *
 * @param {unknown} input - The input whose type is to be determined.
 * @returns {string} - The type of the object.
 */
function getType(input: unknown): string {
  if (input === null) {
    return 'null';
  }

  const type = typeof input;
  if (type !== 'object') {
    return type;
  }

  return lowerCaseFirstLetter(
    Object.prototype.toString.call(input).slice(8, -1)
  );
}

export default getType;
