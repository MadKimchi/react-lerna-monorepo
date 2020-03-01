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
}) => {;
  const [error, setError] = useState(false);

  const ref = useRef<ReactNode>();
  const props = useRef<AutocompleteProps<any> & UseAutocompleteProps<any>>(
    {
      multiple: controlRef.isMultiple as true,
      renderInput
    }
  ); 

  props.current.value = []
  props.current.id = controlRef.key;
  props.current.options = controlRef.options;
  props.current.getOptionLabel = (option: IControlSelectOption<any>) => option.label;
  props.current.renderInput = (params: RenderInputParams) => {
    return (
    <TextField
      {...params}
      error={error}
      variant="filled"
      label={controlRef.label}
      placeholder={controlRef.placeholder}
      fullWidth
    />
  )};
  props.current.onClick = (): void => {
    if (!controlRef.isTouched) {
      controlRef.isTouched = true;
    }
  };

  props.current.onBlur = (): void => {
    setError(controlRef.invalid);
  };
  
  props.current.onChange = (event: React.ChangeEvent<{}>, value: any | null): void => {  
    console.log(value)
    // const selected = value.find(value.id)
    controlRef.value = value
    if (error !== controlRef.invalid) {
      setError(!controlRef.hasError);
    }
    console.log(event)
    console.log(value)
    console.log(props.current.inputValue)
    // controlRef.formGroupRef.onDebounce.next();
  }

  props.current.renderTags = (value: any[], getTagProps: GetTagProps) => {
    // console.log(value)
    // console.log(getTagProps)
    return value.map((option, index) => (
      <Chip
        variant="outlined"
        label={option.label}
        size="small"
        {...getTagProps({ index })}
      />
    ));
  }

  function renderInput(params: RenderInputParams) {
    console.log(params)
    return (
      <TextField
        {...params}
        variant="filled"
        label="Size small"
        placeholder="Favorites"
        fullWidth
      />
    )
  }

  useEffect(()=> {
    controlRef.formGroupRef.onClear
      .pipe(takeUntil(controlRef.unsubscribe))
      .subscribe(() => {
        controlRef.clear();
        ref.current = []
        
        // props.current.renderTags([], () => {})
        // (ref.current as any).value = controlRef.value;
        setError(false);
        // setShrink(false);
      })
  }, [])

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

