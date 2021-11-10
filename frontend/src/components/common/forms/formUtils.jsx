import { Field, FieldProps, useFormState } from "react-final-form";
import React, { Fragment, useRef, useState } from "react";

import i18next from "i18next";

export const required = (value) =>
  value ? undefined : i18next.t("HTMLError.badInput");

export const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

const errorKeys = [
  "badInput",
  "patternMismatch",
  "rangeOverflow",
  "rangeUnderflow",
  "stepMismatch",
  "tooLong",
  "tooShort",
  "typeMismatch",
  "valueMissing",
];

const defaultErrors = {
  badInput: i18next.t("HTMLError.badInput"),
  patternMismatch: i18next.t("HTMLError.patternMismatch"),
  rangeOverflow: i18next.t("HTMLError.rangeOverflow"),
  rangeUnderflow: i18next.t("HTMLError.rangeUnderflow"),
  stepMismatch: i18next.t("HTMLError.stepMismatch"),
  tooLong: i18next.t("HTMLError.tooLong"),
  tooShort: i18next.t("HTMLError.tooShort"),
  typeMismatch: i18next.t("HTMLError.typeMismatch"),
  valueMissing: i18next.t("HTMLError.valueMissing"),
};

const defaultErrorsValues = {
  patternMismatch: "pattern",
  rangeOverflow: "max",
  rangeUnderflow: "min",
  stepMismatch: "step",
  tooLong: "maxLength",
  tooShort: "minLength",
};

export const Error = ({ name, innerRefs }) => {
  //const serverError = useAppSelector((state) => state.errors.msg[name]);
  //const serverError = {};
  let formState = useFormState();
  return (
    <Field
      name={name}
      subscription={{ error: true, touched: true, valid: true }}
    >
      {({ meta: { error, touched } }) => {
        let HTML5error = undefined;
        if (innerRefs !== undefined) {
          for (const innerRef of innerRefs) {
            if (innerRef.current) {
              const currentInput = innerRef.current;
              const validity = currentInput.validity;
              const internalHTML5errorKey =
                validity && errorKeys.find((key) => validity[key]);
              if (!HTML5error && internalHTML5errorKey) {
                HTML5error = defaultErrors[internalHTML5errorKey];
                let HTML5errorValue =
                  currentInput[defaultErrorsValues[internalHTML5errorKey]];

                switch (internalHTML5errorKey) {
                  case "patternMismatch":
                    HTML5error = i18next.t(
                      "HTMLErrorWithValue.patternMismatch",
                      {
                        HTML5errorValue: HTML5errorValue,
                      }
                    );
                    break;
                  case "rangeOverflow":
                    HTML5error = i18next.t("HTMLErrorWithValue.rangeOverflow", {
                      HTML5errorValue: HTML5errorValue,
                    });
                    break;
                  case "rangeUnderflow":
                    HTML5error = i18next.t(
                      "HTMLErrorWithValue.rangeUnderflow",
                      {
                        HTML5errorValue: HTML5errorValue,
                      }
                    );
                    break;
                  case "stepMismatch":
                    HTML5error = i18next.t("HTMLErrorWithValue.stepMismatch", {
                      HTML5errorValue: HTML5errorValue,
                    });
                    break;
                  case "tooLong":
                    HTML5error = i18next.t(
                      "HTMLErrorWithValue.patternMismatch",
                      {
                        HTML5errorValue: HTML5errorValue,
                      }
                    );
                    break;
                  case "tooShort":
                    HTML5error = i18next.t("HTMLErrorWithValue.tooShort", {
                      HTML5errorValue: HTML5errorValue,
                    });
                    break;
                  default:
                    break;
                }
              }

              currentInput.setCustomValidity(
                // error ? error : serverError ? serverError : ""
                error ? error : ""
              );
            }
          }
          // error =
          //   !error && HTML5error
          //     ? HTML5error
          //     : serverError
          //     ? serverError
          //     : error;
          error = !error && HTML5error ? HTML5error : error;
        }
        error && formState.errors && (formState.errors[name] = error);
        return error && touched ? (
          <div className="invalid-feedback text-start">{error}</div>
        ) : null;
      }}
    </Field>
  );
};
