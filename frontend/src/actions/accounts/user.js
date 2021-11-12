import { CRUDAction, ReadOnlyAction, UpdateAction } from "actions/generics";

export const UserProfileCRUDAction = new CRUDAction(
  "userprofile",
  process.env.REACT_APP_API_URL + "userprofile/"
);

export const UserRetrieveUpdateAction = new ReadOnlyAction(
  "user",
  process.env.REACT_APP_API_URL + "user/"
);

export const ChangePasswordUpdateAction = new UpdateAction(
  "changepassword",
  process.env.REACT_APP_API_URL + "changepassword/"
);
