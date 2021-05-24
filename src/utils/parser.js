const imageWidth = 1080;
const imageHeight = 720;

const flatten = arr => Array.prototype.concat.apply([], arr);

const percentageNormalization = (position, max) => (position * 100 / max) / 100;

const parseAnnotations = annotations => Object.values(annotations)
    .map(annotationsInCategory => annotationsInCategory
        .map(annotation => (
            {
                "boundingPoly": [
                    {
                        "normalizedVertices": [
                            { "x": percentageNormalization(annotation.position["00"][0], imageWidth), "y": percentageNormalization(annotation.position["00"][1], imageHeight) },
                            { "x": percentageNormalization(annotation.position["01"][0], imageWidth), "y": percentageNormalization(annotation.position["01"][1], imageHeight) },
                            { "x": percentageNormalization(annotation.position["11"][0], imageWidth), "y": percentageNormalization(annotation.position["11"][1], imageHeight) },
                            { "x": percentageNormalization(annotation.position["10"][0], imageWidth), "y": percentageNormalization(annotation.position["10"][1], imageHeight) }
                        ]
                    }
                ],
                "categories": [{ "confindence": 100, "name": annotation.category.name }],
                "mid": annotation.id,
                "score": null,
                "type": "rectangle"
            }
        )));

const parse = annotations => {
    return {
        "OBJECT_DETECTION_JOB": {
            "annotations": flatten(parseAnnotations(annotations))
        }
    }
}

export { parse }