var names = [];

export default class Reducer {
  types;
  initialState = [];
  paginated = false;

  constructor(
    name,
    options = {
      initialState: [],
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
    this.paginated =
      options.paginated !== undefined ? options.paginated : false;
    this.initialState =
      options.initialState !== undefined
        ? options.initialState
        : this.paginated
        ? { count: 0, next: null, previous: null, results: [] }
        : [];
  }

  getNewState = (state, payload_instance) => {
    if (state && payload_instance && payload_instance.id) {
      if (state.find((o) => o.id === payload_instance.id)) {
        return [
          ...state.map((o) =>
            o.id === payload_instance.id ? payload_instance : o
          ),
        ];
      } else {
        return [...state.concat(payload_instance)];
      }
    }
    return state;
  };

  reducer = (state = this.initialState, action) => {
    let payload_page;
    let payload_array;
    let payload_instance;
    let payload_id;

    switch (action.type) {
      case this.types.LIST:
        if (this.paginated) {
          if (action.payload.hasOwnProperty("count")) {
            payload_page = action.payload;
            return payload_page;
          }
        } else {
          if (Array.isArray(action.payload)) {
            payload_array = action.payload;
            return [...payload_array];
          }
        }
        throw new Error(
          "List received not a array object (payload[]) in generics.mixins.reducer|LIST"
        );
      case this.types.CREATE:
        payload_instance = action.payload;
        if (this.paginated) {
          return {
            ...state,
            results: this.getNewState(state.results, payload_instance),
          };
        } else {
          return this.getNewState(state, payload_instance);
        }
      case this.types.RETRIEVE:
        payload_instance = action.payload;
        if (this.paginated) {
          return {
            ...state,
            results: this.getNewState(state.results, payload_instance),
          };
        } else {
          return this.getNewState(state, payload_instance);
        }
      case this.types.UPDATE:
        payload_instance = action.payload;
        if (this.paginated) {
          return {
            ...state,
            results: this.getNewState(state.results, payload_instance),
          };
        } else {
          return this.getNewState(state, payload_instance);
        }

      case this.types.DESTROY:
        if (typeof action.payload == "number") {
          payload_id = action.payload;

          if (this.paginated) {
            return {
              ...state,
              results: [...state.results.filter((o) => o.id !== payload_id)],
            };
          } else {
            return [...state.filter((o) => o.id !== payload_id)];
          }
        }
        throw new Error(
          "Destroy received not a number(id) in generics.mixins.reducer|DESTROY"
        );
      default:
        return state;
    }
  };
}
