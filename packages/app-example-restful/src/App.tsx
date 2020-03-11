import React, { useState } from 'react';
import './App.css';

import {
  RxForm,
  IControlSelectOption,
  useFormGroup,
  useInput,
  useSelect,
  RxFormControl,
  RxFormGroupRef,
  IRxFormControlRef
} from '@madkimchi/core-ui';

import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginLeft: '5px'
  },
  control: {
    paddingBottom: '10px'
  }
});

const App = () => {
  const [JSONValue, setJSONValue] = useState('');
  const nameList = getSelectOptions();

  const formGroup = useFormGroup();
  // give more meaningful name if used in prod
  const controlKey1 = useInput('key1');
  const controlKey2 = useSelect('key2', nameList);
  const controlKey3 = useSelect('key3', nameList, true);

  formGroup.addControl(controlKey1);
  formGroup.addControl(controlKey2);
  formGroup.addControl(controlKey3);

  function onFormAction(): void {
    const output = buildFormOutput(formGroup);
    const stringified = JSON.stringify(output, undefined, 4);
    setJSONValue(stringified);
  }

  const classes = useStyles();

  return (
    <div className={classes.column}>
      <RxForm
        formGroupRef={formGroup}
        onSubmit={onFormAction}
        onClear={onFormAction}
      >
        <div className={classes.control}>
          <RxFormControl controlRef={controlKey1} />
        </div>
        <div className={classes.control}>
          <RxFormControl controlRef={controlKey2} />
        </div>
        <div className={classes.control}>
          <RxFormControl controlRef={controlKey3} />
        </div>
      </RxForm>
      <pre>{JSONValue}</pre>
    </div>
  );
}

export default App;

export function getSelectOptions(): IControlSelectOption<string>[] {
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

export function buildFormOutput(formGroup: RxFormGroupRef): { [key: string]: any } {
  const output = {
      payload: formGroup.values,
      status: mapControlStatus(formGroup),
  };
  
  return output;
}

function mapControlStatus(formGroup: RxFormGroupRef): { [key: string]: any } {
  const controls = Object.values(formGroup.controls);
  return controls.reduce(getControlStatus(), {});
}

function getControlStatus(): (
  accumulator: {[key: string]: any},
  control: IRxFormControlRef
) => {[key: string]: any} {
  return (accumulator: {[key: string]: any}, control: IRxFormControlRef) => {
    const status = {
      isDirty: control.isDirty,
      isTouched: control.isTouched,
      invalid: control.invalid
    };
    accumulator[control.key] = status;

    return accumulator;
  };
}