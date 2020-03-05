import React, { useState, useEffect, useRef, ReactElement } from 'react';
import { takeUntil } from 'rxjs/operators';

import {
  RxFormGroupRef,
  RxFormControlRef,
  RxSelectControlRef
} from '../../classes';
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

const tracker = new Set<any>();

export const DefaultForm = () => {
  const classes = useStyles();
  const [JSONValue, setJSONValue] = useState('');
  const formRef = useRef(new RxFormGroupRef());

  buildInputControl('key1', formRef.current);
  buildSelectControl('key2', formRef.current);
  buildSelectControl('key3', formRef.current, true);

  function buildInputControl(key: string, formGroupRef: RxFormGroupRef): void {
    const inputControl = new RxFormControlRef(key, ControlTypeEnum.input);
    inputControl.label = `Input Label ${key}`;

    const ref = useRef(inputControl);
    tracker.add(ref);
    formGroupRef.addControl(ref.current);
  }

  function buildSelectControl(
    key: string,
    formGroupRef: RxFormGroupRef,
    isMultiple: boolean = false
  ): void {
    const selectControl = new RxSelectControlRef(key, ControlTypeEnum.select);
    selectControl.label = `Select Label ${key}`;
    selectControl.isMultiple = isMultiple;
    selectControl.options = getOptions();

    const ref = useRef(selectControl);
    tracker.add(ref);
    formGroupRef.addControl(ref.current);
  }

  function renderControls(): ReactElement[] {
    const form = Object.values(formRef.current.controls);
    return form.map((controlRef: IRxFormControlRef) => (
      <div className={classes.control}>
        <RxFormControl key={controlRef.key} controlRef={controlRef} />
      </div>
    ));
  }

  function onFormAction(): void {
    const output = {
      payload: formRef.current.values,
      controlReferenceCount: tracker.size
    };
    const stringified = JSON.stringify(output, undefined, 4);
    setJSONValue(stringified);
  }

  return (
    <div className={classes.column}>
      <RxForm
        formGroupRef={formRef.current}
        onSubmit={onFormAction}
        onClear={onFormAction}
      >
        {renderControls()}
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
