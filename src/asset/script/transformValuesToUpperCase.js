export default function transformValuesToUpperCase(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      obj[key] = transformValuesToUpperCase(obj[key]); // Recursively call the function for nested objects
    } else if (typeof obj[key] === 'string') {
      obj[key] = obj[key].toUpperCase(); // Transform string values to uppercase
    }
  }
  return obj;
}
