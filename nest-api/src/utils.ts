/**
 * Returns true if obj does not exist, or obj params does not exist
 * @param obj
 * @param param object key / property
 */
export const DNE = (obj: any, param: string): boolean => {
  if (!obj || obj[param] == null || obj[param] == undefined) {
    return true;
  }

  return false;
};
