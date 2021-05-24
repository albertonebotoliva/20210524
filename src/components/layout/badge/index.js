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

const SimpleBadge = (props) => {
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

SimpleBadge.propTypes = {
    props: PropTypes.object
};

SimpleBadge.defaultProps = {
    props: {}
};


export default withStyles(styles)(SimpleBadge);
