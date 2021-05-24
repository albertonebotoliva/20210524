import React from 'react';
import PropTypes from 'prop-types';
import { List, Chip, Tooltip, ListItem, Icon, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    }
}));

const Annotation = ({ category, annotations, open, index, dispatch }) => {
    const classes = useStyles();
    return (
        <Collapse key={index} in={open[index]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem className={classes.root}>
                    {annotations && annotations.map((annotation, index) => (
                        <Chip
                            key={index}
                            icon={
                                <Icon
                                    style={{ color: "white" }}
                                    onMouseEnter={() => dispatch({ type: "toogle_all_annotation_visibility", index, annotation })}
                                    onMouseLeave={() => dispatch({ type: "toogle_all_annotation_visibility", index, annotation })}
                                >
                                    {annotation.hidden ? "visibility_off" : "visibility"}
                                </Icon>
                            }
                            label={index + 1}
                            clickable
                            onClick={() => dispatch({ type: "toggle_annotation_visibility", index, annotation })}
                            style={{ backgroundColor: annotation.hidden ? "#DDD" : category.color, color: "white" }}
                            onDelete={() => dispatch({ type: "delete_annotation", index, annotation })}
                            deleteIcon={
                                <Tooltip placement="top" title="Delete Object">
                                    <Icon>close</Icon>
                                </Tooltip>
                            }
                        />
                    ))}
                </ListItem>
            </List>
        </Collapse>
    )
};

Annotation.propTypes = {
    category: PropTypes.object,
    annotations: PropTypes.array,
    open: PropTypes.array,
    index: PropTypes.number,
    dispatch: PropTypes.func.isRequired
}
Annotation.defaultProps = {
    category: {},
    annotations: [],
    open: [],
    index: -1,
    dispatch: () => { }
}

export default Annotation;
