import store from "./store";

export function applyMixins(derivedCtor, baseCtors) {
  for (let i = 0, len = baseCtors.length; i < len; i++) {
    const baseCtor = baseCtors[i];
    const propertyKeys = Object.getOwnPropertyNames(baseCtor.prototype);
    for (let j = 0, len2 = propertyKeys.length; j < len2; j++) {
      const name = propertyKeys[j];
      if (name !== "constructor") {
        derivedCtor.prototype[name] = baseCtor.prototype[name];
      }
    }
  }
}

export function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function formatDate(date) {
  //2018-06-12
  return (
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2)
  );
}

export function getSellerByID(id) {
  if (id > 0) {
    return store.getState().sellers.find((e) => e.id === id);
  }
  return null;
}

export function getClientByID(id) {
  if (id > 0) {
    return store.getState().clients.find((e) => e.id === id);
  }
  return null;
}

export function getProductByID(id) {
  if (id > 0) {
    return store.getState().products.find((e) => e.id === id);
  }
  return null;
}

export function getInventoryByID(id) {
  if (id > 0) {
    return store.getState().inventory.find((e) => e.id === id);
  }
  return null;
}

export function formatDateTime(date) {
  //2018-06-12T19:30
  return (
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2) +
    "T" +
    ("0" + date.getHours()).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2)
  );
}

export function serialize(object) {
  var str = [];
  for (const key in object)
    if (object.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key) + "=" + encodeURIComponent(object[key]));
    }
  return str.join("&");
}

export function getFilename(fullPath) {
  if (fullPath) {
    const startIndex =
      fullPath.indexOf("\\") >= 0
        ? fullPath.lastIndexOf("\\")
        : fullPath.lastIndexOf("/");
    const filename = fullPath.substring(startIndex);
    if (filename.indexOf("\\") === 0 || filename.indexOf("/") === 0) {
      return filename.substring(1);
    }
  }
  return "";
}
