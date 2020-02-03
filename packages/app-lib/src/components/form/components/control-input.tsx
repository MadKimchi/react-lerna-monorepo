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
import { LibFormControlConfig } from '../classes/form-control-config.class';

export const ControlInput: FunctionComponent<{
  config: LibFormControlConfig;
}> = (props: { config: LibFormControlConfig }): ReactElement => {
  const [error, setError] = useState(false);
  const handleLoginKeyUp = (event: ChangeEvent<HTMLInputElement>): void => {
    props.config.value = event.target.value;

    if (error !== props.config.invalid) {
      setError(props.config.invalid);
    }
  };

  return (
    <FormControl variant="filled" error={error}>
      <InputLabel htmlFor="field-email">{props.config.label}</InputLabel>
      <FilledInput id={props.config.key} onChange={handleLoginKeyUp} />
      {error && (
        <FormHelperText id="my-helper-text">
          We'll never share your email.
        </FormHelperText>
      )}
    </FormControl>
  );
};
