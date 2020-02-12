import React from 'react';
import { storiesOf } from '@storybook/react';

import { RxFormControl } from '../src/components/form/form-control';
import {
  RxFormGroupRef,
  RxFormControlRef
} from '../src/components/form/classes';
import {
  ValidationTriggerEnum,
  ControlTypeEnum
} from '../src/components/form//enums';
import { StringValidator } from '../src/components/form/validators';

const testText = 'this is a test';

// const articlePageOptions = { showPanel: false };
// const examplePageOptions = { showPanel: true, panelPosition: 'right' };

// const docStories = {
// 		name: 'Accordion',
// 		component: require('../src/components/Accordion/Accordion'),
// 		examplesContext: require.context(
// 			'../src/components/Accordion/examples',
// 			true,
// 			/\.(j|t)sx?$/
// 		),
// 		examplesContextRaw: require.context(
// 			'!!raw-loader!../src/components/Accordion/examples',
// 			true,
// 			/\.(j|t)sx?$/
// 		),
// 	},
// const getExamplesFromContext = (reqExamples, rawContext) =>
//   _.map(loadAllKeys(reqExamples, rawContext), ({ key, module, raw }) => ({
//     name: _.join(_.reject(_.words(key), w => /^(\d+|[tj]sx?)$/.test(w)), ' '),
//     Example: getDefaultExport(module),
//     exampleNotes: module.notes,
//     source: raw
//   }));

// const loadAllKeys = (reqContext, rawContext) => {
//   return _.map(_.get(reqContext, 'keys', _.constant([]))(), key => ({
//     key,
//     module: reqContext(key),
//     raw: rawContext(key)
//   }));
// };

storiesOf('RxFormControl', module).add('text test', () => {
  const formGroup = new RxFormGroupRef();
  formGroup.validationTrigger = ValidationTriggerEnum.onBlur;
  const controlRef = buildInputControl('1', formGroup);
  return (
    <>
      <RxFormControl controlRef={controlRef} />
    </>
  );
});

function buildInputControl(
  key: string,
  formGroupRef: RxFormGroupRef
): RxFormControlRef {
  const inputControl = new RxFormControlRef(key, ControlTypeEnum.input);
  inputControl.label = `some label ${key}`;
  inputControl.validators = [StringValidator(3)];
  formGroupRef.addControl(inputControl);
  return inputControl;
}
