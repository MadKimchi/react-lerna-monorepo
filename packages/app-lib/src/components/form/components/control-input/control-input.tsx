import React, {
  FunctionComponent,
  ReactElement,
  useState,
  ChangeEvent
} from 'react';

import { of, empty } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import FilledInput, { FilledInputProps } from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import { IFormControlProps } from '../../interfaces';
import { ValidationTriggerEnum } from '../../enums';

export const ControlInput: FunctionComponent<IFormControlProps> = ({
  controlRef
}): ReactElement => {
  const [error, setError] = useState(false);
  const trigger = controlRef.formGroupRef.validationTrigger;

  const props: FilledInputProps = {};
  props.id = controlRef.key;

  // callbacks
  props.onClick = () => {
    if (!controlRef.isTouched) {
      controlRef.isTouched = true;
    }
  };

  props.onChange = (event: ChangeEvent<HTMLInputElement>) => {
    controlRef.value = event.target.value;
    if (!controlRef.isDirty) {
      controlRef.isDirty = true;
    }

    // const errorOnBlur = trigger === ValidationTriggerEnum.onBlur;
    // if (error !== controlRef.invalid && !errorOnBlur) {
    //   setError(controlRef.invalid);
    // }

    if (
      error !== controlRef.invalid &&
      trigger === ValidationTriggerEnum.onSync
    ) {
      of({})
        .pipe(debounceTime(10000))
        .subscribe(() => {
          setError(controlRef.invalid);
        });
    }

    controlRef.formGroupRef.onDebounce.next();
  };

  if (
    controlRef.formGroupRef.validationTrigger === ValidationTriggerEnum.onBlur
  ) {
    props.onBlur = (): void => {
      setError(controlRef.invalid);
    };
  }

  return (
    <FormControl variant="filled" error={error}>
      <InputLabel htmlFor="field-email">{controlRef.label}</InputLabel>
      <FilledInput {...props} />
      {error && (
        <FormHelperText id="my-helper-text">
          We'll never share your email.
        </FormHelperText>
      )}
    </FormControl>
  );
};
