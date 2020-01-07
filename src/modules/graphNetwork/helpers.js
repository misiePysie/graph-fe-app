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

    const { nodesData, edgesData } = data;

    const nodesDataTransformedDuplicated = nodesData.map(node => ({
        id: node.id,
        label: `${node.label} size:${node.fileSize}B`,
        heightConstraint: { minimum: node.size, maximum: 100 },
        widthConstraint: { minimum: node.size, maximum: 100 }
    }));

    const edgesDataTransformed = edgesData.map(edge => ({
        from: edge.from,
        to: edge.to,
        label: edge.weight.toString(),
    }))

    const nodesDataTransformed = getUnique(nodesDataTransformedDuplicated, 'id');
    return { nodesData: nodesDataTransformed, edgesData: edgesDataTransformed }
}


export const transformGraphFunctionsCallsData = (data) => {

    const { methodsToArray, methodsFromArray, edgesOfMethods } = data;

    const nodesData = [...methodsToArray, ...methodsFromArray];

    const nodesDataTransformedDuplicated = nodesData.map(node => ({
        id: node,
        label: `${node}`,
        heightConstraint: { minimum: node.size, maximum: 100 },
        widthConstraint: { minimum: node.size, maximum: 100 }
    }));

    const nodesDataTransformed = getUnique(nodesDataTransformedDuplicated, 'id');
    console.log(nodesDataTransformed);


    const edgesDataTransformed = edgesOfMethods.map(edge => {
        return (
            {
                from: edge.from,
                to: edge.to,
                label: edge.weight.toString(),
            }
        )
    }
    )

    return { nodesData: nodesDataTransformed, edgesData: edgesDataTransformed }
}

export const pathReformer = (path) => path.split("\\").join("\\\\");

export const transformGraphModulesData = (data) => {

    //
    // This is just a place holder, the real healper need to be implemented 
    //

    const { nodesData, edgesData } = data;

    const nodesDataTransformedDuplicated = nodesData.map(node => ({
        id: node.id,
        label: `${node.label} size:${node.fileSize}B`,
        heightConstraint: { minimum: node.size, maximum: 100 },
        widthConstraint: { minimum: node.size, maximum: 100 }
    }));

    const edgesDataTransformed = edgesData.map(edge => ({
        from: edge.from,
        to: edge.to,
        label: edge.weight.toString(),
    }))
    const nodesDataTransformed = getUnique(nodesDataTransformedDuplicated, 'id');
    return { nodesData: nodesDataTransformed, edgesData: edgesDataTransformed }
}