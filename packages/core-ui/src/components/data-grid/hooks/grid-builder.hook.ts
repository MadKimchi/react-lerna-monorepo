import { useRef } from 'react';
import { GridBuilder } from '../classes';

export function useGridBuild(): GridBuilder {
    const builder = new GridBuilder();
    const ref = useRef(builder);
    return ref.current;
}