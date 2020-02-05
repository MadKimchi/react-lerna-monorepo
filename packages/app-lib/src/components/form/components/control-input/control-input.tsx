import React, {
  FunctionComponent,
  ReactElement,
  useState,
  ChangeEvent
} from 'react';

import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import { IFormControlProps } from '../../interfaces';

export const ControlInput: FunctionComponent<IFormControlProps> = ({
  controlRef
}): ReactElement => {
  const [error, setError] = useState(false);
  const errorOnBlur = true;
  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    controlRef.value = event.target.value;

    if (error !== controlRef.invalid && !errorOnBlur) {
      setError(controlRef.invalid);
    }

    controlRef.formGroupRef.onDebounce.next(true);
  };

  const onBlur = (): void => {
    setError(controlRef.invalid);
  };

  return (
    <FormControl variant="filled" error={error}>
      <InputLabel htmlFor="field-email">{controlRef.label}</InputLabel>
      <FilledInput id={controlRef.key} onBlur={onBlur} onChange={onChange} />
      {error && (
        <FormHelperText id="my-helper-text">
          We'll never share your email.
        </FormHelperText>
      )}
    </FormControl>
  );
};
