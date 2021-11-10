import i18next from "i18next";

export const formatData = (objeto, header) => {
  if (objeto && header) {
    if (header["Content-Type"] === "multipart/form-data") {
      return Object.keys(objeto).reduce((formData, key) => {
        formData.append(key, objeto[key]);
        return formData;
      }, new FormData());
    }
  }
  return objeto;
};

// Setup config with token - helper function
export const tokenConfig = (
  getState,
  header = { "Content-Type": "application/json" }
) => {
  // Get token from state
  const token = getState.accounts.auth.token;
  if (token == null) {
    return undefined;
  }
  // Headers
  if (header === undefined) {
    header = { "Content-Type": "application/json" };
  }

  const config = {
    headers: header,
  };
  config.headers["Accept-Language"] = i18next.language;
  // If has token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};
