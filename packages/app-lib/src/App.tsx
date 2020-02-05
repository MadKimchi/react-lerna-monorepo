import React from 'react';
import './App.css';
import { LibFormControl } from './components/form';
import { LibFormControlConfig } from './components/form/classes/form-control-config.class';
import { ButtonSubmit } from './components/form/components/button-submit';
import { ControlTypeEnum } from './components/form/enums';
import { StringValidator } from './components/form/validators';
import { RequiredValidator } from './components/form/validators/required.validator';
import { LibFormBuilder } from './components/form/classes/form-builder.class';

const App = () => {
  const formBuilder = new LibFormBuilder();
  formBuilder.addControl(buildInputControl('1'));
  formBuilder.addControl(buildInputControl('2'));
  formBuilder.addControl(buildInputControl('3'));
  formBuilder.addControl(buildInputControl('4'));
  formBuilder.addControl(buildInputControl('5'));
  formBuilder.addControl(buildInputControl('6'));
  formBuilder.addControl(buildInputControl('7'));
  formBuilder.addControl(buildInputControl('8'));
  formBuilder.addControl(buildInputControl('9'));
  formBuilder.addControl(buildInputControl('10'));
  formBuilder.addControl(buildInputControl('11'));
  formBuilder.addControl(buildInputControl('12'));

  const form = Object.values(formBuilder.controls).map(
    (control: LibFormControlConfig) => control
  );

  function buildInputControl(key: string): LibFormControlConfig {
    const inputControl = new LibFormControlConfig(key, ControlTypeEnum.input);
    inputControl.formBuilder = formBuilder;
    inputControl.label = `some label ${key}`;
    inputControl.validators = [StringValidator(3)];
    return inputControl;
  }

  return (
    <div className="App">
      {form.map((config: LibFormControlConfig) => (
        <LibFormControl key={config.key} config={config} />
      ))}
      <ButtonSubmit builder={formBuilder} />
    </div>
  );
};

export default App;
