# Utilities

This document outlines various utility functions available in the project, including their descriptions and files.

## clsx

**File:** clsx.ts

**Description:** Concatenates class names conditionally. Supports various input types like strings, objects, arrays, and functions. Useful for managing dynamic class names in React or other frameworks.

---

## cryptr

**File:** cryptr.ts

**Description:** Provides encryption and decryption functionalities using the aes-256-gcm algorithm. It allows setting custom encoding, PBKDF2 iterations, and salt length.

---

## debounce

**File:** debounce.ts

**Description:** Debounces a function, delaying its execution until after a specified wait time has elapsed since the last invocation. Includes cancel and flush methods.

---

## deepEqual

**File:** deepEqual.ts

**Description:** Compares two values recursively to check if they are deeply equal. Handles objects and arrays but not functions or circular objects.

---

## formatToCurrency

**File:** formatToCurrency.ts

**Description:** Formats a number to a currency string based on specified options like locale and currency type.

---

## getType

**File:** getType.ts

**Description:** Returns the type of the provided input as a string. For objects, it returns the specific type (e.g., 'array', 'date') in lowercase.

---

## mdxLoader

**File:** mdxLoader.ts

**Description:** Loads, parses, and extracts data from MDX files. Supports frontmatter parsing and MDX file discovery within a directory.

---

## nFormatter

**File:** nFormatter.ts

**Description:** Formats a number into a human-readable string with optional suffixes (K, M, B, etc.) or in full numeric format.

---

## slugify

**File:** slugify.ts

**Description:** Converts a given text to a slug by converting it to lowercase, removing diacritics, and replacing non-alphanumeric characters with hyphens.

---

## throttle

**File:** throttle.ts

**Description:** Creates a throttled function that limits the rate at which it can be called. Includes `cancel` and `flush` methods to manage the throttling behavior. Supports options for leading and trailing edge invocation.