import React, { FunctionComponent, useState, useRef, useEffect } from 'react';
import { takeUntil } from 'rxjs/operators'

import FormHelperText from '@material-ui/core/FormHelperText';
import Chip from '@material-ui/core/Chip';
import { FormControl } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { UseAutocompleteProps } from '@material-ui/lab/useAutocomplete';
import Autocomplete, {
  AutocompleteProps,
  RenderInputParams,
  GetTagProps
} from '@material-ui/lab/Autocomplete';

import {
  IControlSelectOption
} from './control-select.interface';
import { RxSelectControlRef } from '../../classes';
import { ValidationTriggerEnum } from '../../enums';
import { useStyles } from './control-select.style';

interface IProps {
  controlRef: RxSelectControlRef
}

export const ControlSelect: FunctionComponent<IProps> = ({
  controlRef
}) => {
  const [selected, setSelected] = useState<any[]>(controlRef.value);
  const [error, setError] = useState(false);
  const trigger = controlRef.formGroupRef.validationTrigger;
  const classes = useStyles()

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

    // TODO: possibly move this logic to class setter
    if (!controlRef.isDirty) {
      controlRef.isDirty = true;
    }

    if (
      error !== controlRef.invalid &&
      trigger !== ValidationTriggerEnum.onBlur
    ) {
      setError(controlRef.invalid);
    }

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
    return (
      <TextField
        className={classes.normalizeMargin}
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
      <FormControl className={classes.formControlRoot} variant="filled" error={error}>
        <Autocomplete className={classes.normalizeMargin} {...props.current} />
        {error &&
          controlRef.errors.map((error: string, index: number) => (
            <FormHelperText id="my-helper-text" key={index}>
              {error}
            </FormHelperText>
          ))}
      </FormControl>
    </div>
  );
};

