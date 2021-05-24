import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, ListItem, ListItemIcon, ListItemText, Icon, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '../badge';


const useStyles = makeStyles((theme) => ({
    select: {
        cursor: 'pointer'
    }
}));

const Category = ({ category, badgeContent, selected, open, index, dispatch }) => {
    const classes = useStyles();
    return (
        <ListItem
            className={classes.select}
            onClick={() => dispatch({ type: "set_selected", selected: category.id })}
        >
            <Tooltip placement="top" title="Select">
                <ListItemIcon>
                    <Icon style={{ color: category.color }}>{selected.id === category.id ? "radio_button_checked" : "radio_button_unchecked"}</Icon>
                </ListItemIcon>
            </Tooltip>
            <ListItemText primary={category.name} />
            <Tooltip placement="top" title="Expand">
                <IconButton aria-label="expand" onClick={() => dispatch({ type: "set_open", index })}>
                    <Badge badgeContent={badgeContent} color={category.color}>
                        {open[index]
                            ? <Icon>expand_less</Icon>
                            : <Icon>expand_more</Icon>
                        }
                    </Badge>
                </IconButton>
            </Tooltip>
        </ListItem>
    )
};

Category.propTypes = {
    category: PropTypes.object,
    badgeContent: PropTypes.number,
    selected: PropTypes.object,
    open: PropTypes.array,
    index: PropTypes.number,
    dispatch: PropTypes.func.isRequired
}
Category.defaultProps = {
    category: {},
    badgeContent: 0,
    selected: {},
    open: [],
    index: -1,
    dispatch: () => { }
}

export default Category;
