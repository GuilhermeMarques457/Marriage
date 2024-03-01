"use client";
import { useState } from "react";

function isInvalidText(text: string, label: string) {
  return text != null && text.trim() !== ""
    ? `O campo ${label} é obrigatório`
    : null;
}

function isInvalidEmail(text: string, label: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(text) ? `O campo ${label} é obrigatório` : null;
}

export default function InputText(props: {
  label: string;
  placeholder: string;
  name: string;
  type: string;
}) {
  const initialStateInput = {
    value: "",
    touched: false,
    valid: true,
  };

  const initialStateError = {
    error: "",
  };

  const [inputState, setInputState] = useState(initialStateInput);
  const [inputError, setInputErrors] = useState(initialStateError);

  function onInputValueChangeHandler(e: any) {
    const inputValue = e.target.value;

    let error: string | null = null;
    const errorRequired = isInvalidText(inputValue, props.label);

    if (errorRequired) error = errorRequired;

    if (props.type === "email" && !errorRequired) {
      const errorEmail = isInvalidEmail(inputValue, props.label);
      if (errorEmail) error = errorEmail;
    }

    setInputErrors({ error: error ? error : "" });

    setInputState({
      value: inputValue,
      touched: true,
      valid: inputError ? true : false,
    });

    console.log(inputError);
  }

  return (
    <>
      <div className="mb-3">
        <label htmlFor={props.name} className="form-label">
          {props.label}
        </label>
        <input
          type={props.type}
          className={`form-control ${
            inputState.touched
              ? inputState.valid
                ? "is-invalid"
                : "is-valid"
              : undefined
          }`}
          onChange={onInputValueChangeHandler}
          name={props.name}
          id={props.name}
          placeholder={props.placeholder}
        />
        {inputError.error ? (
          <div className="invalid-feedback">{inputError.error}</div>
        ) : undefined}
      </div>
    </>
  );
}
