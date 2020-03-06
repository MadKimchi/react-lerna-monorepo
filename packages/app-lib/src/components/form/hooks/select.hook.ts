import {useRef, MutableRefObject} from 'react';
import { RxSelectControlRef } from '../classes';
import { ControlTypeEnum } from '../enums';
import { IControlSelectOption } from '../components';

export function useSelect(
    key: string,
    options: IControlSelectOption<any>[],
    isMultiple: boolean = false
): RxSelectControlRef {
  const selectControl = new RxSelectControlRef(key, ControlTypeEnum.select);
  selectControl.label = `Select Label ${key}`;
  selectControl.isMultiple = isMultiple;
  selectControl.options = options;

  const selectRef = useRef(selectControl);
  return selectRef.current;
}