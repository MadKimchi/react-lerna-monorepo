# Design Specification for RxForm Component

## Overview
Forms are stateful (not in terms of React statefulness but the actual form states, such as, isValid, isTouched, isDirty, and etc). It is also inevitable to check the validity of all children components (FormControls) in order to evaluate the validity of the form to be submitted.

### Problem
- It is challenging to map the form states to the React component states of the parent and its children React compnents in hierarchy, triggered by many factors, such as, input changes or button clicks
- State update with dependencies can often cause unnecessary re-rendering and loss of its original/current values of form state.

### Solution
- Form and FormControl components rendered based off Ref object, of which current value is tracked instead of re-instantiated every re-render
- Use of Observer-Observe patterns (RxJS) allows to trigger state update/re-render in a more controlled manner, thus preventing unnecessary re-rendering

## Diagram
### Component Hierarchy
![rx-form-component-hierarchy-revised](https://user-images.githubusercontent.com/19801457/76281589-e4ed4880-626b-11ea-8675-70c47d73b183.png)

### Workflow

## Implemtation Details

## Extensibility

## Limitation
