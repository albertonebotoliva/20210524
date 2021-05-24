import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, TextField } from '@material-ui/core';
import useDebounce from '../../../hooks';

const Search = ({ dispatch }) => {
    const setFilter = e => dispatch({ type: "set_filter", filter: e.target.value })
    const onChange = useDebounce(setFilter);
    return (
        <ListItem>
            <TextField
                onChange={onChange}
                fullWidth
                label="Search in Categories"
            />
        </ListItem>
    )
};

Search.propTypes = {
    dispatch: PropTypes.func.isRequired
}

Search.defaultProps = {
    dispatch: () => { }
}

export default Search;
