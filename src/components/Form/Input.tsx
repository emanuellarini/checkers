import React, { memo, useRef, useEffect, useState } from 'react';

import { TextField as BaseTextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';

export type InputProps = TextFieldProps & {
  name: string;
};

export const Input: React.FC<InputProps> = memo(
  ({ name, helperText, defaultValue, InputLabelProps, ...restProps }) => {
    if (!name) {
      console.error(
        'TextField component must have a `name` property for correctly working.'
      );
    }

    const inputRef = useRef<HTMLInputElement>(null);
    const {
      fieldName,
      defaultValue: defaultFieldValue,
      registerField,
      error
    } = useField(name);
    const defaultInputValue = defaultValue ?? defaultFieldValue;
    const [shrink, setShrink] = useState<boolean>(!!defaultInputValue);

    useEffect(() => {
      if (fieldName) {
        registerField({
          name: fieldName,
          ref: inputRef.current,
          path: 'value',
          clearValue(ref, resetValue: string) {
            const newValue = resetValue ?? defaultInputValue ?? '';
            ref.value = newValue;
            setShrink(!!newValue);
          },
          setValue(ref: HTMLInputElement, value: string) {
            if (ref) {
              const newValue = value ?? '';
              ref.value = newValue;
              setShrink(!!newValue);
            }
          }
        });
      }
    }, [fieldName, registerField, defaultInputValue, setShrink]);

    useEffect(() => {
      const input = inputRef.current;

      function handlerFocusEvent(evt: FocusEvent) {
        const inputValue = (evt.currentTarget as HTMLInputElement).value;
        if (!inputValue) setShrink(true);
      }

      function handlerBlurEvent(evt: FocusEvent) {
        const inputValue = (evt.target as HTMLInputElement).value;
        if (!inputValue) setShrink(false);
      }

      if (input) {
        input.addEventListener('focus', handlerFocusEvent);
        input.addEventListener('blur', handlerBlurEvent);
      }

      return () => {
        if (input) {
          input.removeEventListener('focus', handlerFocusEvent);
          input.removeEventListener('blur', handlerBlurEvent);
        }
      };
    }, [inputRef]);

    return (
      <BaseTextField
        {...restProps}
        name={fieldName}
        error={!!error}
        helperText={error || helperText}
        inputRef={inputRef}
        defaultValue={defaultInputValue}
        InputLabelProps={{
          ...InputLabelProps,
          shrink: InputLabelProps?.shrink ?? shrink
        }}
        margin="normal"
        variant="outlined"
      />
    );
  }
);
