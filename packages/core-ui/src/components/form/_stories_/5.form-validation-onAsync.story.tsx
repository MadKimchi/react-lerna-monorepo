import React, { useState } from 'react';

import { ValidationTriggerEnum } from '../enums';
import { useFormGroup, useInput, useSelect } from '../hooks';
import { StringValidator } from '../validators';
import { RxFormControl } from '../components';
import { RxForm } from '../form';

import { useStyles } from './_styles_/example.style';
import { getSelectOptions, buildFormOutput } from './_utils_/story.util';

export default {
  title: 'Components/RxForm',
  component: RxForm
};

export const AsyncValidationForm = () => {
  const classes = useStyles();
  const [JSONValue, setJSONValue] = useState('');
  const nameList = getSelectOptions();

  const formGroup = useFormGroup();
  formGroup.validationTrigger = ValidationTriggerEnum.onAsync;

  const controlKey1 = useInput('key1');
  controlKey1.validators = [StringValidator(4)];
  
  const controlKey2 = useSelect('key2', nameList);
  controlKey2.validators = [selectValidator(1)];

  const controlKey3 = useSelect('key3', nameList);
  controlKey3.validators = [selectValidator(1)];

  const controlKey4 = useSelect('key4', nameList, true);
  controlKey4.validators = [selectValidator(3)];

  formGroup.addControl(controlKey1);
  formGroup.addControl(controlKey2);
  formGroup.addControl(controlKey3);
  formGroup.addControl(controlKey4);

  function onFormAction(): void {
    const output = buildFormOutput(formGroup);
    const stringified = JSON.stringify(output, undefined, 4);
    setJSONValue(stringified);
  }

  return (
    <div className={classes.column}>
      <RxForm
        formGroupRef={formGroup}
        onSubmit={onFormAction}
        onClear={onFormAction}>
        <div className={classes.control}>
          <RxFormControl controlRef={controlKey1} />
        </div>
        <div className={classes.control}>
          <RxFormControl controlRef={controlKey2} />
        </div>
        <div className={classes.control}>
          <RxFormControl controlRef={controlKey3} />
        </div>
        <div className={classes.control}>
          <RxFormControl controlRef={controlKey4} />
        </div>
      </RxForm>
      <pre>{ JSONValue }</pre>
    </div>
  );
};

AsyncValidationForm.story = {
  title: 'Components/RxForm',
  component: RxForm,
  name: 'Validation on Async'
}

function selectValidator(minLength: number): Function {
  return (value: any[]): { key: string; msg: string } | null => {
    const hasError = (!!value && value.length < minLength) || !value;
    return hasError
      ? { key: 'minLength', msg: `At least ${minLength} item(s) must be selected` }
      : null;
  };
}