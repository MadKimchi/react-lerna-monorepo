import React, { FunctionComponent, ReactElement, ComponentType } from 'react';

import { ControlTypeEnum } from '../enums';
import { IFormControlProps } from '../interfaces';
import { ControlInput, ControlSelect } from '.';

/**
 * Form Control component built with benefits of RxJS
 */
export const RxFormControl: FunctionComponent<IFormControlProps> = ({
  controlRef
}): ReactElement => {

  function createControl(controlType: ControlTypeEnum): ComponentType<any> {
    switch(controlType) {
        // TODO: add more cases
        /**
         * case ControlTypeEnum.datePicker: 
         * case ControlTypeEnum.editor:
         * case ControlTypeEnum.checkbox:
         * case ControlTypeEnum.radio:
         * ...
         * etc
         */
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
