import React from 'react';
import { storiesOf } from '@storybook/react';

import { RxFormControl } from '../src/components/form/form-control';
import {
  RxFormGroupRef,
  RxFormControlRef
} from '../src/components/form/classes';
import {
  ValidationTriggerEnum,
  ControlTypeEnum
} from '../src/components/form/enums';
import { StringValidator } from '../src/components/form/validators';

const testText = 'this is a test';

function buildInputControl(
  key: string,
  formGroupRef: RxFormGroupRef
): RxFormControlRef {
  const inputControl = new RxFormControlRef(key, ControlTypeEnum.input);
  inputControl.label = `some label ${key}`;
  inputControl.validators = [StringValidator(3)];
  formGroupRef.addControl(inputControl);
  return inputControl;
}

export default {
  title: 'RxFormControl',
  component: RxFormControl
};

export const formControlWithGroup = () => {
  const formGroup = new RxFormGroupRef();
  formGroup.validationTrigger = ValidationTriggerEnum.onBlur;
  const controlRef = buildInputControl('1', formGroup);
  return (
    <>
      <RxFormControl controlRef={controlRef} />
    </>
  );
};

formControlWithGroup.story = {
  parameters: {
    notes: 'A small component'
  }
};