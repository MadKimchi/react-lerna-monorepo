import { useRef } from 'react';
import { RxFormGroupRef } from '../classes';

export function useFormGroup(): RxFormGroupRef {
  const formGroupRef = useRef(new RxFormGroupRef());
  return formGroupRef.current;
}