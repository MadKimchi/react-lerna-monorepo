import React, {
  FunctionComponent,
  ReactElement,
  useState,
  ChangeEvent
  // KeyboardEvent
} from 'react';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { LibFormControlConfig } from '../classes/form-control-config.class';

export const ControlInput: FunctionComponent<{
  config: LibFormControlConfig;
}> = (props: { config: LibFormControlConfig }): ReactElement => {
  const [error, setError] = useState(props.config.invalid);
  const handleLoginKeyUp = (event: ChangeEvent<HTMLInputElement>): void => {
    // console.log(props.config.invalid, error);
    props.config.value = event.target.value;
    console.log(props.config);
    console.log(props.config.invalid, error);
    console.log(props.config.hasError);
    // if (props.config.invalid !== error) {
    //   // console.log(props.config.invalid);
    //   setError(props.config.invalid);
    // }
  };

  return (
    <FormControl variant="filled" error={props.config.invalid}>
      <InputLabel htmlFor="field-email">{props.config.label}</InputLabel>
      <FilledInput
        id="field-email"
        error={error}
        value={props.config.value}
        onChange={handleLoginKeyUp}
      />
      <FormHelperText id="my-helper-text">
        We'll never share your email.
      </FormHelperText>
    </FormControl>
  );
};
