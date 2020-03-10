import { useRef } from 'react';
import { RxFormControlRef } from '../classes';
import { ControlTypeEnum } from '../enums';

export function useInput(key: string): RxFormControlRef {
  const inputControl = new RxFormControlRef(key, ControlTypeEnum.input);
  inputControl.label = `Input Label ${key}`;

  const inputRef = useRef(inputControl);
  return inputRef.current;
}