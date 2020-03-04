import React, { useState, useEffect, useRef } from 'react';
import { takeUntil } from 'rxjs/operators';

import { RxFormGroupRef, RxFormControlRef, RxSelectControlRef } from '../../classes';
import { ControlTypeEnum } from '../../enums';
import { RxForm } from '../../form';
import { IControlSelectOption } from '../../components';
import { RxFormControl } from '../../form-control';
import { useStyles } from '../_styles_/example.style';
import { IRxFormControlRef } from '../../interfaces';

export default {
  title: 'Components/RxForm',
  component: RxForm
};

export const DefaultForm = () => {
  const classes = useStyles();
  const [JSONValue, setJSONValue] = useState('');

  const inputControl = new RxFormControlRef('inputControlKey', ControlTypeEnum.input);
  inputControl.label = 'Input Label';

  const control = useRef(inputControl);

  const singleSelectControl = new RxSelectControlRef('singleSelectControlKey', ControlTypeEnum.select);
  singleSelectControl.label = 'Single Select Label';
  singleSelectControl.options = getOptions();

  const control2 = useRef(singleSelectControl);

  const multiSelectControl = new RxSelectControlRef('multiSelectControlKey', ControlTypeEnum.select);
  multiSelectControl.label = 'Multi Select Label';
  multiSelectControl.isMultiple = true;
  multiSelectControl.options = getOptions();

  const control3 = useRef(multiSelectControl);

  const formGroupRef = new RxFormGroupRef();
  const formRef = useRef(formGroupRef);

  formRef.current.addControl(control.current);
  formRef.current.addControl(control2.current);
  formRef.current.addControl(control3.current);

  useEffect(
    () => {
      formRef.current.onSubmit
        .pipe(takeUntil(formRef.current.unsubscribe))
        .subscribe(() => {
          const stringified = JSON.stringify(formRef.current.values, undefined, 4);
          setJSONValue(stringified);
          console.log(formRef.current.values);
        });

        formRef.current.onClear
        .pipe(takeUntil(formRef.current.unsubscribe))
        .subscribe(() => {
          console.log(formRef.current.values);
        });

      return () => {
        formRef.current.unsubscribe.next();
        formRef.current.unsubscribe.complete();
      };
    },
    [formRef.current]
  )

  return (
    <div className={classes.column}>
      <RxForm formGroupRef={formRef.current}>
        <div className={classes.control}>
          <RxFormControl controlRef={control.current} />
        </div>
        <div className={classes.control}>
          <RxFormControl controlRef={control2.current} />  
        </div>
        <div className={classes.control}>
          <RxFormControl controlRef={control3.current} />
        </div>
      </RxForm>
      <pre>{JSONValue}</pre>
    </div>
  );
};

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

DefaultForm.story = {
  title: 'Components/RxForm',
  component: RxForm,
  name: 'Default Form'
};
