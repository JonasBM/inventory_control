import React, { Fragment, useEffect } from "react";
import { useAppSelector, usePrevious } from "hooks";

import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";

const Alerts = () => {
  const { errors, messages } = useAppSelector((state) => state);
  const prevErrors = usePrevious(errors);
  const prevMessages = usePrevious(messages);
  const alert = useAlert();
  const history = useHistory();

  useEffect(() => {
    if (errors !== prevErrors) {
      if (errors.msg.detail) {
        alert.error(errors.msg.detail);
      } else if (errors.status) {
        if (errors.status >= 400 && errors.status < 500) {
          for (const key in errors.msg) {
            alert.error(key + ": " + errors.msg[key]);
          }
        }
      }
    }
    if (messages !== prevMessages) {
      if (messages.CRUDcreate) alert.success(messages.CRUDcreate);
      if (messages.CRUDread) alert.success(messages.CRUDread);
      if (messages.CRUDupdate) alert.success(messages.CRUDupdate);
      if (messages.CRUDdelete) alert.success(messages.CRUDdelete);
      if (messages.ERROR) alert.error(messages.ERROR);
      if (messages.INFO) alert.info(messages.INFO);
      if (messages.SUCCESS) alert.success(messages.SUCCESS);
    }
  }, [errors, prevErrors, messages, prevMessages, alert, history]);

  return <Fragment />;
};

export default Alerts;
