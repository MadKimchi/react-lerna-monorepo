import React, { FunctionComponent, ReactElement } from 'react';
import { ControlInput } from './control-input/control-input';
import { ControlTypeEnum } from '../../enums';
import { IFormControlProps } from '../../interfaces';

/**
 * Form Control component built with benefits of RxJS
 */
export const RxFormControl: FunctionComponent<IFormControlProps> = ({
  controlRef
}): ReactElement => {
  const buildControl = (): ReactElement => {
    if (controlRef.type === ControlTypeEnum.input) {
      return <ControlInput controlRef={controlRef} />;
    }

    return <></>;
  };

  return buildControl();
};
