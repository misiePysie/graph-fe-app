export const transformGraphData = (data) => {
    
    const {nodesData, edgesData} = data;

    const nodesDataTransformed = nodesData.map(node => ({
        id: node.id,
        label: node.label,
        heightConstraint: {minimum: node.size, maximum:100}, 
        widthConstraint: {minimum: node.size, maximum:100}
    }));

   return {nodesData: nodesDataTransformed, edgesData}
}