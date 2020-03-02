import React, { FunctionComponent, ReactElement } from 'react';

import { RxSelectControlRef } from "../classes";
import { ControlTypeEnum } from "../enums";
import { RxFormControl } from "../form-control";
import { IControlSelectOption } from '../components';

export const Select: FunctionComponent = (): ReactElement => {
    const controlRef = new RxSelectControlRef("selectKey", ControlTypeEnum.select);
    controlRef.label = `Select Label`;
    controlRef.validators = [selectValidator(3)];
    controlRef.isMultiple = true;
    controlRef.options = getOptions();

    return <RxFormControl controlRef={controlRef} />;
}

function selectValidator(minLength: number): Function {
    return (value: any[]): { key: string; msg: string } | null => {
      const hasError = (!!value && value.length < minLength) || !value;
      return hasError
        ? { key: 'minLength', msg: `At least ${minLength} characters` }
        : null;
    };
}

function getOptions(): IControlSelectOption<string>[] {
    const options = [
      'Oliver Hansen',
      'Van Henry',
      'April Tucker',
      'Ralph Hubbard',
      'Omar Alexander',
      'Carlos Abbott',
      'Miriam Wagner',
      'Bradley Wilkerson',
      'Virginia Andrews',
      'Kelly Snyder'
    ];

    return options.map((name: string, index: number) => ({
      id: `${index}`,
      label: name,
      value: name
    }));
}