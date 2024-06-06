function getType(input: any): string {
  const lowerCaseTheFirstLetter = (str: string) =>
    str[0].toLowerCase() + str.slice(1);
  const type = typeof input;
  if (type !== 'object') {
    return type;
  }

  return lowerCaseTheFirstLetter(
    Object.prototype.toString.call(input).replace(/^\[object (\S+)\]$/, '$1')
  );
}

/**
 * Compares two values recursively to check if they are deeply equal.
 *
 * @param {unknown} inputOne - The first value to compare.
 * @param {unknown} inputTwo - The second value to compare.
 * @return {boolean} Returns true if the values are deeply equal, false otherwise.
 *
 *  * @note
 * - This function does not handle comparing functions.
 * - This function does not handle circular objects.
 * - This function only compares enumerable properties of objects.
 * - This function compares objects and arrays, but it does not handle other types such as strings, numbers, booleans, or null.
 */
export default function deepEqual(
  inputOne: unknown,
  inputTwo: unknown
): boolean {
  // Check primitives
  if (Object.is(inputOne, inputTwo)) {
    return true;
  }

  const typeOfValueOne = getType(inputOne);
  const typeOfValueTwo = getType(inputTwo);

  const bothObjects =
    typeOfValueOne === 'object' && typeOfValueTwo === 'object';
  const bothArrays = Array.isArray(inputOne) && Array.isArray(inputTwo);

  if (!bothObjects && !bothArrays) {
    return false;
  }

  // Compare the keys of arrays and objects.
  if (
    Object.keys(inputOne as Array<unknown> | Object).length !==
    Object.keys(inputTwo as Array<unknown> | Object).length
  ) {
    return false;
  }
  for (const key in inputOne as Record<string, unknown>) {
    if (!deepEqual((inputOne as any)[key], (inputTwo as any)[key])) {
      return false;
    }
  }

  return true;
}
