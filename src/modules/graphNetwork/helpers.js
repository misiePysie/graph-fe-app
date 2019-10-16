export const transformGraphData = (data) => {
    
    const {nodesData, edgesData} = data;

    const nodesDataTransformed = nodesData.map(node => ({
        id: node.id,
        label: `${node.label} size:${node.fileSize}B`,
        heightConstraint: {minimum: node.size, maximum:100}, 
        widthConstraint: {minimum: node.size, maximum:100}
    }));

    const edgesDataTransformed = edgesData.map(edge => ({
        from: edge.from,
        to: edge.to,
        label: edge.weight.toString(),
    }))

   return {nodesData: nodesDataTransformed, edgesData: edgesDataTransformed}
}
export const pathReformer = (path) =>  path.split("\\").join("\\\\");