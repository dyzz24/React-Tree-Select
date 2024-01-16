import React from 'react';
import { useTreeSelectContext } from '../../context/context.tsx';

export const TreeSelectRoot = () => {
  const state = useTreeSelectContext();
  return <div>hola</div>
}
