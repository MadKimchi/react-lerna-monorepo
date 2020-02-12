import React from 'react';
import { storiesOf } from '@storybook/react';

import { RxFormControl } from './index';
import { RxFormGroupRef, RxFormControlRef } from './classes';
import { ValidationTriggerEnum, ControlTypeEnum } from './enums';
import { StringValidator } from './validators';

const testText = 'this is a test';

storiesOf('RxFormControl', module).add('text test', () => {
  const formGroup = new RxFormGroupRef();
  formGroup.validationTrigger = ValidationTriggerEnum.onBlur;
  const controlRef = buildInputControl('1', formGroup);
  return (
    <>
      <RxFormControl controlRef={controlRef} />
    </>
  );
});

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
