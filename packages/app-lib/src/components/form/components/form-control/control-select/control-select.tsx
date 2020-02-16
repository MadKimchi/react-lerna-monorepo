import React, { FunctionComponent } from 'react';

import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Select, { SelectProps } from '@material-ui/core/Select';

import {
  IPropsControlSelect,
  IControlSelectOption
} from './control-select.interface';
import { useStyles, getStyles } from './control-select.style';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
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
  const [personName, setPersonName] = React.useState<string[]>([]);

  const props: SelectProps = {};
  props.id = controlRef.key;

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonName(event.target.value as string[]);
    console.log(personName);
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
    setPersonName(value);
  };

  function handleDelete(): void {}

  return (
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel id="demo-simple-select-filled-label">
        {controlRef.label}
      </InputLabel>
      <Select
        // labelId="demo-simple-select-filled-label"
        // id="demo-simple-select-filled"
        multiple
        value={personName}
        onChange={handleChange}
      >
        {options.map((option: IControlSelectOption<any>) => (
          <MenuItem
            key={option.id}
            value={option.value}
            style={getStyles(option.value, personName, theme)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
  // <FormControl variant="filled" className={classes.formControl}>
  //     <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
  //     <Select labelId="demo-mutiple-chip-label" id="demo-mutiple-chip" multiple value={personName} onChange={handleChange} input={<Input id="select-multiple-chip" />} renderValue={selected => <div
  //           className={classes.chips}
  //         >
  //           {(selected as string[]).map(value => (
  //             <Chip
  //               className={classes.chip}
  //               key={value}
  //               label={value}
  //               onDelete={handleDelete}
  //             />
  //           ))}
  //         </div>} MenuProps={MenuProps}>
  //       {options.map(option => (
  //         <MenuItem
  //           key={option.id}
  //           value={option.value}
  //           style={getStyles(option.value, personName, theme)}
  //         >
  //           {option.label}
  //         </MenuItem>
  //       ))}
  //     </Select>
  //   </FormControl>;
};
