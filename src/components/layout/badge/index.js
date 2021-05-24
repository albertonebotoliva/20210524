import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";

const styles = theme => ({
    customBadge: {
        backgroundColor: props => props.color,
        color: "white"
    }
});

const CustomBadge = (props) => {
    const { classes } = props;
    return (
        <div>
            <Badge
                classes={{ badge: classes.customBadge }}
                badgeContent={props.badgeContent}
            >
                {props.children}
            </Badge>
        </div>
    );
}

CustomBadge.propTypes = {
    props: PropTypes.object
};

CustomBadge.defaultProps = {
    props: {}
};


export default withStyles(styles)(CustomBadge);
