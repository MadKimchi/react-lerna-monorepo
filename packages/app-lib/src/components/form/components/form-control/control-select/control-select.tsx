import React, { FunctionComponent, useState, useRef } from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Select, { SelectProps } from '@material-ui/core/Select';
import Autocomplete, {
  AutocompleteProps,
  RenderInputParams,
  GetTagProps
} from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import {
  IControlSelectOption
} from './control-select.interface';
import { UseAutocompleteProps } from '@material-ui/lab/useAutocomplete';
import { IFormControlProps } from '../../../interfaces';

export const ControlSelect: FunctionComponent<IFormControlProps> = ({
  controlRef
}) => {;
  const [error, setError] = useState(false);

  const props = useRef<AutocompleteProps<any> & UseAutocompleteProps<any>>(
    {
      multiple: controlRef.extras && controlRef.extras.isMultiple ? undefined : false,
      renderInput: (params: RenderInputParams) => (
        <TextField
          {...params}
          variant="filled"
          label="Size small"
          placeholder="Favorites"
          fullWidth
        />
      )
    }
  );  
  props.current.id = controlRef.key;
  props.current.options = controlRef.extras?.options;
  props.current.getOptionLabel = (option: IControlSelectOption<any>) => option.label;
  props.current.renderInput = (params: RenderInputParams) => (
    <TextField
      {...params}
      error={error}
      variant="filled"
      label="Size small"
      placeholder="Favorites"
      fullWidth
    />
  );
  props.current.onClick = (): void => {
    if (!controlRef.isTouched) {
      controlRef.isTouched = true;
    }
  };

  props.current.onBlur = (): void => {
    // TODO: set the error by trigger type
    setError(controlRef.invalid);
  };
  
  props.current.onChange = (event: React.ChangeEvent<{}>, value: any | null): void => {  
    controlRef.value.add(value);
    if (error !== controlRef.invalid) {
      setError(!controlRef.hasError);
    }
  }

  props.current.renderTags = (value: any[], getTagProps: GetTagProps) =>
    value.map((option, index) => (
      <Chip
        variant="outlined"
        label={option.label}
        size="small"
        {...getTagProps({ index })}
      />
    ));

  return (
    <div>
      <Autocomplete {...props.current} />
      {controlRef.hasError &&
        controlRef.errors.map((error: string, index: number) => (
          <FormHelperText id="my-helper-text" key={index}>
            {error}
          </FormHelperText>
        ))}
    </div>
  );
};

