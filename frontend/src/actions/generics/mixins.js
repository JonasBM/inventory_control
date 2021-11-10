import { formatData, tokenConfig } from "../actionUtils";

import axios from "axios";
import { returnErrors } from "../actionMessages";

var names = [];

export class BaseMixin {
  name;
  url;
  types;
  header = { "Content-Type": "application/json" };
  initialState = [];
  useAuthentication = true;
  paginated = false;

  constructor(
    name,
    url,
    options = {
      header: { "Content-Type": "application/json" },
      initialState: [],
      useAuthentication: true,
      paginated: false,
    }
  ) {
    if (names.includes(name)) {
      throw new Error(
        'name: "' + name + '" already exists. name must be unique.'
      );
    } else {
      names.push(name);
      this.name = name;
      this.url = url;
    }
    this.types = {
      LIST_OPTIONS: "LIST_OPTIONS" + this.name.toUpperCase(),
      LIST_HEAD: "LIST_HEAD" + this.name.toUpperCase(),
      LIST: "LIST_" + this.name.toUpperCase(),
      CREATE: "CREATE_" + this.name.toUpperCase(),
      RETRIEVE: "RETRIEVE_" + this.name.toUpperCase(),
      UPDATE: "UPDATE_" + this.name.toUpperCase(),
      DESTROY: "DESTROY_" + this.name.toUpperCase(),
    };
    this.header =
      options.header !== undefined
        ? options.header
        : { "Content-Type": "application/json" };
    this.useAuthentication =
      options.useAuthentication !== undefined
        ? options.useAuthentication
        : true;
    this.paginated =
      options.paginated !== undefined ? options.paginated : false;
    this.initialState =
      options.initialState !== undefined
        ? options.initialState
        : this.paginated
        ? { count: 0, next: null, previous: null, results: [] }
        : [];
  }

  // LIST_OPTIONS
  listOptions() {
    return (dispatch, getState) => {
      return axios
        .options(
          this.url,
          this.useAuthentication
            ? tokenConfig(getState(), this.header)
            : this.header
        )
        .then((res) => {
          dispatch({
            type: this.types.LIST_OPTIONS,
            payload: res.data,
          });
          return res.data;
        })
        .catch((err) => {
          dispatch(returnErrors(err));
          throw err;
        });
    };
  }

  //LIST_HEAD
  listHead() {
    return (dispatch, getState) => {
      return axios
        .head(
          this.url,
          this.useAuthentication
            ? tokenConfig(getState(), this.header)
            : this.header
        )
        .then((res) => {
          dispatch({
            type: this.types.LIST_HEAD,
            payload: res.data,
          });
          return res.data;
        })
        .catch((err) => {
          dispatch(returnErrors(err));
          throw err;
        });
    };
  }
}

export class ListMixin extends BaseMixin {
  list(object = undefined, SalveState = true) {
    return (dispatch, getState) => {
      let headerWithValues = Object.assign(
        {},
        { params: formatData(object, this.header) },
        this.useAuthentication
          ? tokenConfig(getState(), this.header)
          : this.header
      );
      return axios
        .get(this.url, headerWithValues)
        .then((res) => {
          if (SalveState) {
            dispatch({
              type: this.types.LIST,
              payload: res.data,
            });
          }
          return res.data;
        })
        .catch((err) => {
          dispatch(returnErrors(err));
          throw err;
        });
    };
  }
}

export class CreateMixin extends BaseMixin {
  create(object, SalveState = true) {
    return (dispatch, getState) => {
      return axios
        .post(
          this.url,
          formatData(object, this.header),
          this.useAuthentication
            ? tokenConfig(getState(), this.header)
            : this.header
        )
        .then((res) => {
          if (SalveState) {
            dispatch({
              type: this.types.CREATE,
              payload: res.data,
            });
          }
          return res.data;
        })
        .catch((err) => {
          dispatch(returnErrors(err));
          throw err;
        });
    };
  }
}

export class RetrieveMixin extends BaseMixin {
  retrieve(id, SalveState = true) {
    return (dispatch, getState) => {
      return axios
        .get(
          this.url + id + "/",
          this.useAuthentication
            ? tokenConfig(getState(), this.header)
            : this.header
        )
        .then((res) => {
          if (SalveState) {
            dispatch({
              type: this.types.RETRIEVE,
              payload: res.data,
            });
          }
          return res.data;
        })
        .catch((err) => {
          dispatch(returnErrors(err));
          throw err;
        });
    };
  }
}

export class UpdateMixin extends BaseMixin {
  update(object, SalveState = true) {
    return (dispatch, getState) => {
      if (!object.id) {
        return;
      }
      return axios
        .patch(
          this.url + object.id + "/",
          formatData(object, this.header),
          this.useAuthentication
            ? tokenConfig(getState(), this.header)
            : this.header
        )
        .then((res) => {
          if (SalveState) {
            dispatch({
              type: this.types.UPDATE,
              payload: res.data,
            });
          }
          return res.data;
        })
        .catch((err) => {
          dispatch(returnErrors(err));
          throw err;
        });
    };
  }
}

export class DestroyMixin extends BaseMixin {
  destroy(id, SalveState = true) {
    return (dispatch, getState) => {
      return axios
        .delete(
          this.url + id + "/",
          this.useAuthentication
            ? tokenConfig(getState(), this.header)
            : this.header
        )
        .then((res) => {
          if (SalveState) {
            dispatch({
              type: this.types.DESTROY,
              payload: id,
            });
          }
          return res.data;
        })
        .catch((err) => {
          dispatch(returnErrors(err));
          throw err;
        });
    };
  }
}
