export function getFromStorage(key) {
  if (!key) {
    return null;
  }

  try {
    const valueStr = localStorage.getItem(key);
    if (valueStr) {
      return JSON.parse(valueStr);
    }
    return null;
  } catch (err) {
    return null;
  }
}

export function setInStorage(key, obj) {
  if (!key) {
    console.error("Error: key is missing");
  }
  try {
    localStorage.setItem(key, JSON.stringify(obj));
    console.log("here");
  } catch(err) {
    console.error(err);
  }
}

export function removeFromStorage(key) {
  if (!key) {
    console.error("Error: key is missing");
  }

  try {
    const valueStr = localStorage.getItem(key);
    if (valueStr) {
      localStorage.removeItem(key);
    }
    console.error("Error: key does not exist in storage.");
  } catch (err) {
    console.error(err);
  }
}
