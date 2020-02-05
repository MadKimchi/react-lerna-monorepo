import React, {
  PureComponent,
  FunctionComponent,
  Component,
  ReactElement,
  useState
} from 'react';

import { LibFormControlConfig } from '../classes/form-control-config.class';
import { LibFormBuilder } from '../classes/form-builder.class';

// export const ButtonSubmit: FunctionComponent<{
//   formBuilder: LibFormBuilder;
// }> = (props: { formBuilder: LibFormBuilder }): ReactElement => {
//   const [error, setError] = useState(false);

//   return <button />;
// };

export class ButtonSubmit extends Component<{ builder: LibFormBuilder }> {
  componentWillReceiveProps(prevProps: { builder: LibFormBuilder }) {
    console.log(prevProps.builder.invalid);
    // console.log(this.props.builder.invalid);
  }

  render(): ReactElement {
    console.log('????', this.props.builder.invalid);
    return <button disabled={!this.props.builder.invalid}>'Submit'</button>;
  }
}
