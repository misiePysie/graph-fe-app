function getUnique(arr, comp) {

    const unique = arr
        .map(e => e[comp])
        // store the keys of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)
        // eliminate the dead keys & store unique objects
        .filter(e => arr[e]).map(e => arr[e]);

    return unique;
}

export const transformGraphData = (data) => {

    const nodesData = data.nodes;
    const edgesData = data.edges;

    const nodesDataTransformed = nodesData.map(node => ({
        id: node.id,
        label: `${node.label} size:${node.size}B`,
        heightConstraint: { minimum: node.fileSize, maximum: 100 },
        widthConstraint: { minimum: node.fileSize, maximum: 100 }
    }));

    const edgesDataTransformed = edgesData.map(edge => ({
        from: edge.from.id,
        to: edge.to.id,
        label: edge.size,
    }))

    return { nodesData: nodesDataTransformed, edgesData: edgesDataTransformed }
}

export const pathReformer = (path) => path.split("\\").join("\\\\");