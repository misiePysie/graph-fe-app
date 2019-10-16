import * as css from './css/style.css'; // import global styles
import header from './modules/header/header';
import footer from './modules/footer/footer';
import graphNetwork, {graphNetworkScript} from './modules/graphNetwork/graphNetwork';
const app = document.getElementById("root"); 

// define modules UI
app.innerHTML = `
<div id="app">
    ${header(
        'header-project-structure',
        'GRAPH',
        'by Misie Pysie'
    )}
    ${graphNetwork()}

    ${footer(
        ['autor1','autor2','autor3','itd'],
        [{to:'#', label:'link1'},{to:'#', label:'link2'},{to:'#', label:'link3'}, ],
        'tutaj jakis opisik może'
    )}
</div>
`
// define modules Logic
graphNetworkScript();


