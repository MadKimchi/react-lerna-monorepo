import React, { FunctionComponent, useState } from 'react';

import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
  MenuProps
} from '@material-ui/core';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Select, { SelectProps } from '@material-ui/core/Select';
import Autocomplete, { AutocompleteProps } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import {
  IPropsControlSelect,
  IControlSelectOption
} from './control-select.interface';
import { useStyles, getStyles } from './control-select.style';
import { UseAutocompleteProps } from '@material-ui/lab/useAutocomplete';

const menuProps: Partial<MenuProps> = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left'
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left'
  },
  getContentAnchorEl: null,
  PaperProps: {
    style: {
      // ITEM_HEIGHT: 48, ITEM_PADDING_TOP: 8
      maxHeight: 48 * 4.5 + 8,
      width: 250
    }
  }
};

export const ControlSelect: FunctionComponent<IPropsControlSelect<any>> = ({
  controlRef,
  options
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState(true);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelected(event.target.value as string[]);
    console.log(selected);
  };

  const handleChangeMultiple = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const { options } = event.target as HTMLSelectElement;
    const value: string[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelected(value);
  };

  function handleDelete(selected: SelectProps['value']): Function {
    return function(): void {
      console.log(selected);
    };
  }

  function handleChipClick(ev: any): void {
    ev.preventDefault();
  }

  const props: AutocompleteProps<any> & UseAutocompleteProps<any> = {};
  props.id = controlRef.key;
  props.multiple = true; // controlRef.isMultiple
  props.value = selected;
  props.options = options; // controlRef.isMultiple
  props.onChange = handleChange;

  // if (controlRef.customInput) {
  //   // props.input = <Input id="select-multiple-chip" />;
  //   props.input = customInput;
  // }

  if (props.multiple) {
    props.renderValue = (selected: SelectProps['value']) => (
      <div className={classes.chips}>
        {(selected as string[]).map(value => (
          <Chip
            color="primary"
            className={classes.chip}
            key={value}
            label={value}
            onClick={handleChipClick}
            onDelete={handleDelete}
          />
        ))}
      </div>
    );
    props.MenuProps = menuProps;
  }

  return (
    // <FormControl variant="filled" className={classes.formControl}>
    <div>
      <Autocomplete
        multiple
        id="size-small-filled-multi"
        size="small"
        options={options}
        getOptionLabel={option => option.label}
        // defaultValue={[options[0]]}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option.label}
              size="small"
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={params => (
          <TextField
            {...params}
            variant="filled"
            label="Size small"
            placeholder="Favorites"
            fullWidth
          />
        )}
      />;
      {controlRef.hasError &&
        controlRef.errors.map((error: string, index: number) => (
          <FormHelperText id="my-helper-text" key={index}>
            {error}
          </FormHelperText>
        ))}
    </div>
  );

  // const props: SelectProps = {};
  // props.id = controlRef.key;
  // props.multiple = true; // controlRef.isMultiple
  // props.value = selected;
  // props.onChange = handleChange;

  // // if (controlRef.customInput) {
  // //   // props.input = <Input id="select-multiple-chip" />;
  // //   props.input = customInput;
  // // }

  // if (props.multiple) {
  //   props.renderValue = (selected: SelectProps['value']) => <div
  //       className={classes.chips}
  //     >
  //       {(selected as string[]).map(value => (
  //         <Chip
  //           color="primary"
  //           className={classes.chip}
  //           key={value}
  //           label={value}
  //           onClick={handleChipClick}
  //           onDelete={handleDelete}
  //         />
  //       ))}
  //     </div>;
  //   props.MenuProps = menuProps;
  // }

  // <FormControl variant="filled" className={classes.formControl}>
  //   <InputLabel id="demo-simple-select-filled-label">
  //     {controlRef.label}
  //   </InputLabel>
  //   <Select {...props}>
  //     {options.map((option: IControlSelectOption<any>) => (
  //       <MenuItem
  //         key={option.id}
  //         value={option.value}
  //         style={getStyles(option.value, selected, theme)}
  //       >
  //         {option.label}
  //       </MenuItem>
  //     ))}
  //   </Select>
  //   {controlRef.hasError &&
  //     controlRef.errors.map((error: string, index: number) => (
  //       <FormHelperText id="my-helper-text" key={index}>
  //         {error}
  //       </FormHelperText>
  //     ))}
  // </FormControl>
};
