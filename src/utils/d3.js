import * as d3 from 'd3';

const renderImage = (svg, image) => {
    svg.append("image")
        .attr("xlink:href", image.url)
        .attr("width", "1080px")
        .attr("height", "720px");
}

const renderAnnotations = (svg, annotations, showOnly, classes) => {
    Object.values(annotations)
        .map(annotationsInCategory => annotationsInCategory
            .map((annotation, index) => {
                return svg.append('rect')
                    .attr('x', annotation.position["00"][0])
                    .attr('y', annotation.position["00"][1])
                    .attr('width', annotation.position["01"][0] - annotation.position["00"][0])
                    .attr('height', annotation.position["11"][1] - annotation.position["01"][1])
                    .attr('class', showOnly
                        ? annotation.category.id === showOnly.category && index === showOnly.index
                            ? `${classes.brush}`
                            : `${classes.hidden}`
                        : annotation.hidden
                            ? `${classes.hidden}`
                            : `${classes.brush}`)
                    .attr('fill', annotation.category.color)
                    .attr('stroke', "black")
            }));
}
const initilizeBrush = (svg, color, classes, dispatch) => {
    const brushed = ({ selection }) => {
        if (!selection) return;
        svg.append('rect')
            .attr('x', selection[0][0])
            .attr('y', selection[0][1])
            .attr('width', selection[1][0] - selection[0][0])
            .attr('height', selection[1][1] - selection[0][1])
            .attr('class', `${classes.brush}`)
            .attr('fill', color)
            .attr('stroke', "black");
        svg.call(d3.brush().clear);

        dispatch({ type: "add_annotation", coordinates: selection });
    };
    const brush = d3.brush()
        .extent([[0, 0], [screen.width, screen.height]])
        .on("end", brushed);

    svg.call(brush);
}

export { renderImage, renderAnnotations, initilizeBrush }