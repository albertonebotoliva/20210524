import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import * as d3 from 'd3';
import { renderImage, renderAnnotations, initilizeBrush } from './../../../utils/d3';

const useStyles = makeStyles({
    canvas: {
        zIndex: 0,
        background: "#DDD",
        textAlign: "center",
        overflow: "hidden"
    },
    svg: {
        height: "100vh",
        width: "100%",
    },
    brush: {
        strokeWidth: 3,
        opacity: "0.3"
    },
    hidden: {
        display: "none",
        visibility: "hidden"
    }
});

const Canvas = ({ image, selected, annotations, showOnly, dispatch }) => {
    const classes = useStyles();
    const ref = useRef();

    //NOTE: We RENDER the image in the page. Only Once
    React.useEffect(() => {
        const svg = d3.select(ref.current);
        renderImage(svg, image);
    }, []);

    //NOTE: We RENDER annotations from previous session on the store.   
    //NOTE: We INITIALIZE brush
    React.useEffect(() => {
        const svg = d3.select(ref.current);
        svg.selectAll("rect").remove(); //NOTE: RESET
        if (annotations)
            renderAnnotations(svg, annotations, showOnly, classes);
        if (selected.id) //NOTE: A Category MUST be selected
            initilizeBrush(svg, selected.color, classes, dispatch);
    });

    return (
        <div className={classes.canvas} >
            <svg className={classes.svg} ref={ref}></svg>
        </div>
    )
};

Canvas.propTypes = {
    image: PropTypes.object,
    selected: PropTypes.object,
    annotations: PropTypes.object,
    showOnly: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

Canvas.defaultProps = {
    image: {},
    selected: {},
    annotations: {},
    showOnly: {},
    dispatch: () => { }
};

export default Canvas;
