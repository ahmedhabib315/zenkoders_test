/**
 * 
 * Check if array is non empty
 * 
 * @param arr 
 * @returns boolean
 */
export const checkArrayLength = (arr: any): boolean => {
  return arr && arr.length > 0
}


/**
 * 
 * Set Value in Local Storage
 * 
 * @param key 
 * @param value 
 */
export const setValueInLocalStorage = (key: string, value: any): void => {
  if (key && value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

/**
 * 
 * Get Parsed Value in Local Storage
 * 
 * @param key 
 * @returns 
 */
export const getValueFromLocalStorage = (key: string): any => {
  if (key) {
    let value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }
  return null;
}

/**
 * 
 * Remove Value from Local Storage
 * 
 * @param key 
 */
export const removeValueFromLocalStorage = (key: string): void => {
  if (key) {
    localStorage.removeItem(key);
  }
}

/**
 * Clear Local Storage
 * 
 * 
 */
export const clearLocalStorage = (): void => {
  localStorage.clear();
}