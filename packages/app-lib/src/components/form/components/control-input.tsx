import React, {
  FunctionComponent,
  ReactElement,
  useState,
  ChangeEvent
  // FocusEvent
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
  const errorOnBlur = true;
  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    props.config.value = event.target.value;

    if (error !== props.config.invalid && !errorOnBlur) {
      setError(props.config.invalid);
    }
  };

  const onBlur = (): void => {
    console.log(props.config.value);
    setError(props.config.invalid);
    // if (error !== props.config.invalid) {
    //   setError(props.config.invalid);
    // }
  };

  return (
    <FormControl variant="filled" error={error}>
      <InputLabel htmlFor="field-email">{props.config.label}</InputLabel>
      <FilledInput id={props.config.key} onBlur={onBlur} onChange={onChange} />
      {error && (
        <FormHelperText id="my-helper-text">
          We'll never share your email.
        </FormHelperText>
      )}
    </FormControl>
  );
};
