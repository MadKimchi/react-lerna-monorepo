import React, { FunctionComponent, ReactElement, ComponentType } from 'react';
import { ControlInput } from './control-input/control-input';
import { ControlTypeEnum } from '../../enums';
import { IFormControlProps } from '../../interfaces';
import { ControlSelect } from './control-select/control-select';

/**
 * Form Control component built with benefits of RxJS
 */
export const RxFormControl: FunctionComponent<IFormControlProps> = ({
  controlRef
}): ReactElement => {

  function createControl(controlType: ControlTypeEnum): ComponentType<any> {
    switch(controlType) {
        // case ControlTypeEnum.datePicker: {
        //   return ControlDatePicker
        // }
      
        case ControlTypeEnum.select: {
            return ControlSelect
        }

        case ControlTypeEnum.input:
        default: {
            return ControlInput
        }
    }
  }

  const Control = createControl(controlRef.type)
  return <Control controlRef={controlRef} />
};
