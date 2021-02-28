import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import useChecked from './hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
  },
  elements: {
    position: 'absolute',
    bottom: '25px',
    left: '30px',
    zIndex: 1000,
    width: '400px',
  },
  percentage: {
    marginLeft: '10px',
  },
}));

export const FilterList = (props) => {
  const classes = useStyles();
  const { list, checked, handleSetChecked } = useChecked(props);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    handleSetChecked(newChecked);
    props.onHandleChange(newChecked);
  };

  return (
    <>
      {list.length !== 0 && (
        <Paper elevation={3} className={classes.elements}>
          <List className={classes.root}>
            {list.map((value, index) => {
              const colors = {
                backgroundColor: `#${value.colors}`
              };
              const labelId = `checkbox-list-label-${value.type}`;

              return (
                <ListItem key={value+'-'+index} role={undefined} dense button onClick={handleToggle(value)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      id={value.type}
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={value.type} />
                  <ListItemSecondaryAction>
                    <Chip label={value.numbers} variant="outlined" style={colors} />
                    <Typography className={classes.percentage} variant="subtitle1" component="span">
                      {`${props.percentage[index]} %`}
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </Paper>
      )}
    </>
  );
}

export default React.memo(FilterList);

