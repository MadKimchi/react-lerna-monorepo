import React, { FunctionComponent, ReactElement } from 'react';
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
  const buildControl = (): ReactElement => {
    switch (controlRef.type) {
      case ControlTypeEnum.input: {
        return <ControlInput controlRef={controlRef} />;
      }

      case ControlTypeEnum.select: {
        return <ControlSelect controlRef={controlRef} />;
      }

      default: {
        return <></>;
      }
    }
  };

  return buildControl();
};
