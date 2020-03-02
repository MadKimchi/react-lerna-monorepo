import React, { FunctionComponent, ReactElement } from 'react';

import { RxFormControlRef } from "../classes";
import { ControlTypeEnum } from "../enums";
import { StringValidator } from "../validators";
import { RxFormControl } from "../form-control";

export const Input: FunctionComponent = (): ReactElement => {
    const controlRef = new RxFormControlRef('inputKey', ControlTypeEnum.input);
    controlRef.label = 'Input Label';
    controlRef.validators = [StringValidator(3)];
    
    return <RxFormControl controlRef={controlRef} />;
}