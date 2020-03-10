import React, { useEffect, useState } from 'react';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { RxFormControl, RxButtonClear } from '../components';
import { RxForm } from '../form';
import { useFormGroup, useInput, useSelect } from '../hooks';

import { useStyles } from './_styles_/example.style';
import { getSelectOptions, buildFormOutput } from './_utils_/story.util';

export default {
  title: 'Components/RxForm',
  component: RxForm
};

export const DebounceForm = () => {
  const classes = useStyles();
  const [JSONValue, setJSONValue] = useState('');
  const nameList = getSelectOptions();

  const formGroup = useFormGroup();
  formGroup.debounceTimer = 2000;

  const controlKey1 = useInput('key1');
  const controlKey2 = useSelect('key2', nameList);
  const controlKey3 = useSelect('key3', nameList);
  const controlKey4 = useSelect('key4', nameList, true);

  formGroup.addControl(controlKey1);
  formGroup.addControl(controlKey2);
  formGroup.addControl(controlKey3);
  formGroup.addControl(controlKey4);

  useEffect(
    () => {
      formGroup.onDebounce
        .pipe(
          takeUntil(formGroup.unsubscribe),
          debounceTime(formGroup.debounceTimer)
        )
        .subscribe(() => {
          // You can do a data request here or inside pipe block to be chained
          const output = buildFormOutput(formGroup);
          const stringified = JSON.stringify(output, undefined, 4);
          setJSONValue(stringified);
        });

      formGroup.onClear
        .pipe(takeUntil(formGroup.unsubscribe))
        .subscribe(() => {
          const output = buildFormOutput(formGroup);
          const stringified = JSON.stringify(output, undefined, 4);
          setJSONValue(stringified);
        });

      return () => {
        formGroup.unsubscribe.next();
        formGroup.unsubscribe.complete();
      };
    },
    [formGroup]
  );

  return (
    <div className={classes.column}>
      <RxForm
        formGroupRef={formGroup}
        showDefaultActions={false}>
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
        <div className={classes.buttonWrapper}>
          <RxButtonClear formGroupRef={formGroup} />
        </div>
      </RxForm>
      <pre>{ JSONValue }</pre>
    </div>
  );
};

DebounceForm.story = {
  title: 'Components/RxForm',
  component: RxForm,
  name: 'Debounce in 2000ms'
}