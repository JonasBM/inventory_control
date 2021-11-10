import React from "react";

const AccordionItem = ({
  name,
  title,
  accordionId,
  isOpen = false,
  stayOpen = false,
  classNameBody = "",
  upperTitle = true,
  children,
}) => {
  classNameBody += " accordion-body";
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={"header" + name}>
        <button
          className={
            "accordion-button bg-secondary px-4 py-2" +
            (isOpen ? "" : " collapsed") +
            (upperTitle ? " text-uppercase" : "")
          }
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={"#collapse" + name}
          aria-expanded={isOpen ? "true" : "false"}
          aria-controls={"collapse" + name}
        >
          {title}
        </button>
      </h2>

      {stayOpen ? (
        <div
          id={"collapse" + name}
          className={
            "accordion-collapse collapse bg-light" + (isOpen ? " show" : "")
          }
          aria-labelledby={"header" + name}
        >
          <div className={classNameBody}>{children}</div>
        </div>
      ) : (
        <div
          id={"collapse" + name}
          className={
            "accordion-collapse collapse bg-light" + (isOpen ? " show" : "")
          }
          aria-labelledby={"header" + name}
          data-bs-parent={"#" + accordionId}
        >
          <div className={classNameBody}>{children}</div>
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
