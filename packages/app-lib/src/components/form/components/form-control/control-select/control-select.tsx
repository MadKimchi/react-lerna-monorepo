import React, { ReactNode, FunctionComponent, useState, useRef, useEffect } from 'react';
import { takeUntil } from 'rxjs/operators'

import FormHelperText from '@material-ui/core/FormHelperText';
import Chip from '@material-ui/core/Chip';

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
import { RxSelectControlRef } from '../../../classes';

interface IProps {
  controlRef: RxSelectControlRef
}

export const ControlSelect: FunctionComponent<IProps> = ({
  controlRef
}) => {
  const [selected, setSelected] = useState<any[]>(controlRef.value);
  const [error, setError] = useState(false);

  const props = useRef<AutocompleteProps<any> & UseAutocompleteProps<any>>();
  props.current = {
    multiple: controlRef.isMultiple as true,
    renderInput
  };

  
  props.current.value = selected
  props.current.id = controlRef.key;
  props.current.options = controlRef.options;
  props.current.getOptionLabel = (option: IControlSelectOption<any>) => option.label;

  props.current.onClick = (): void => {
    if (!controlRef.isTouched) {
      controlRef.isTouched = true;
    }
  };

  props.current.onBlur = (): void => {
    setError(controlRef.invalid);
  };
  
  props.current.onChange = (event: React.ChangeEvent<{}>, value: any | null): void => {
    console.log('???')
    controlRef.value = value
    setSelected(controlRef.value)
    
    if (error !== controlRef.invalid) {
      setError(!controlRef.hasError);
    }
  }

  props.current.renderTags = (value: any[], getTagProps: GetTagProps) => {
    return value.map((option: IControlSelectOption<any>, index: number) => (
      <Chip
        variant="outlined"
        label={option.label}
        size="small"
        {...getTagProps({ index })}
      />
    ));
  }
  
  function renderInput(params: RenderInputParams) {
    console.log(error)
    return (
      <TextField
        {...params}
        error={error}
        variant="filled"
        label={controlRef.label}
        placeholder={controlRef.placeholder}
        fullWidth
      />
    );
  }

  useEffect(()=> {
    controlRef.formGroupRef.onClear
      .pipe(takeUntil(controlRef.unsubscribe))
      .subscribe(() => {
        controlRef.clear();
        setSelected(controlRef.value)
        setError(false);
      })
  }, [controlRef])

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

