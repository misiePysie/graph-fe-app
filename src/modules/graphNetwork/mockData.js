export const mockData = {
     nodesData: [
        {id:'./src/1', label: './src/java/lorem/ipsum', size: 1, fileSize: 1234 },
        {id:'./src/2', label: 'Node 2', size: 15, fileSize: 1234 },
        {id:'./src/3', label: 'Node 3', size: 50, fileSize: 12114 },
        {id:'./src/4', label: 'Node 4', size: 88, fileSize: 1214 },
        {id:'./src/5', label: 'Node 5', size: 100, fileSize: 1234}
      ],
    edgesData: [
        {from: './src/1', to: './src/3', weight: 1},
        {from: './src/1', to: './src/2',  weight: 1},
        {from: './src/2', to: './src/4', weight: 4},
        {from: './src/2', to: './src/5', weight: 5},
        {from: './src/3', to: './src/3', weight:  7}
      ]
}