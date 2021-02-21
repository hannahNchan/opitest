import React from 'react';
// import PropTypes from 'prop-types';
import ButtonElemet from '@material-ui/core/Button';

import './styles.css';

export const Button = props => {
  return (
    <ButtonElemet
      className="points-button"
      color="primary"
      variant="contained">
      Obtener puntos
    </ButtonElemet>
  );
}

export default Button;

