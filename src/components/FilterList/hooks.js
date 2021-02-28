import { useState, useEffect } from 'react';

export const useChecked = props => {
  const [checked, setChecked] = useState([]);
  const [list, setList] = useState([]);

  const handleSetChecked = value => {
    setChecked(value);
  }

  useEffect(() => {
    setList(props.types);
    setChecked(props.types);
  }, [props.types]);

  return { checked, list, handleSetChecked }
}

export default useChecked;

