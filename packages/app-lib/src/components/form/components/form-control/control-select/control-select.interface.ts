import { IFormControlProps } from '../../../interfaces';

export interface IControlSelectOption<T> {
  id: string;
  label: string;
  value: T;
}

export interface IPropsControlSelect<T> extends IFormControlProps {
  options: IControlSelectOption<T>[];
}
