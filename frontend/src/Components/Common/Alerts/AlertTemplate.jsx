import React from "react";

const AlertTemplate = ({ style, options, message, close }) => {
  let alertClass = "";
  if (options.type === "info") {
    alertClass = "alert-info";
  } else if (options.type === "success") {
    alertClass = "alert-success";
  } else if (options.type === "error") {
    alertClass = "alert-danger";
  }
  return (
    <div
      className={"alert alert-dismissible fade show " + alertClass}
      role="alert"
      style={style}
    >
      {message}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default AlertTemplate;
