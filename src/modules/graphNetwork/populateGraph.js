import * as css from './style.css';
import * as vis from 'vis-network';

export const populateGraph = (nodesData, edgesData) => {
    const container = document.getElementById('projectGraph');
    const nodes = new vis.DataSet(nodesData);
    const edges = new vis.DataSet(edgesData);

    const data = {
        nodes: nodes,
        edges: edges
    };

    const options = {
        nodes: {
            color: "#6dc5ff",
            font: "16px arial white",
            borderWidth: 1
        },
        edges: {
            smooth: false,
            color: "#2998ff",
            font: {
                color: "#ffffff",
                size: 16,
            },
            arrows: {
                to: { enabled: true, scaleFactor: 0.5, type: "arrow" }
            }
        },
        physics: {
            enabled: true,
            maxVelocity: 200,
            minVelocity: 1,
            barnesHut: {
                gravitationalConstant: -5000,
                springLength: 300,
                springConstant: 0.05,
                avoidOverlap: 1,
                centralGravity: 0.5,
                damping: 1
            }
        }
    };
    const network = new vis.Network(container, data, options);
}