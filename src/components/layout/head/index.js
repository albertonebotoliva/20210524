import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, ListItem, ListItemText, Icon, IconButton } from '@material-ui/core';
import { handleDownload } from './../../../utils/download';
import { parse } from '../../../utils/parser';

const Head = ({ openAll, openSearch, annotations, dispatch }) => {
    const parsedObject = parse(annotations);

    return (
        <ListItem>
            <ListItemText primary={<b>CATEGORIES</b>} />
            <Tooltip placement="top" title="Export">
                <IconButton aria-label="export" onClick={() => handleDownload(parsedObject)}>
                    <Icon>get_app</Icon>
                </IconButton>
            </Tooltip>
            <Tooltip placement="top" title="Search">
                <IconButton aria-label="search" onClick={() => dispatch({ type: "toggle_open_search", open: !openSearch })}>
                    <Icon>search</Icon>
                </IconButton>
            </Tooltip>
            <Tooltip placement="top" title="Expand All">
                {!openAll
                    ? <IconButton onClick={() => dispatch({ type: "toggle_open_all", open: true })}><Icon>expand_more</Icon></IconButton>
                    : <IconButton onClick={() => dispatch({ type: "toggle_open_all", open: false })}><Icon>expand_less</Icon></IconButton>
                }
            </Tooltip>
        </ListItem >
    )
};

Head.propTypes = {
    openAll: PropTypes.bool,
    openSearch: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
}
Head.defaultProps = {
    openAll: false,
    openSearch: false,
    dispatch: () => { }
}

export default Head;
