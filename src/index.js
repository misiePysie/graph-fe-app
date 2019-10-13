import * as css from './css/style.css'; // import global styles
import exampleStringModule from './modules/exampleStringModule/exampleStringModule';
import exampleStringModule2, {exampleStringModuleScript2} from './modules/exampleStringModule2/exampleStringModule2';
const app = document.getElementById("root"); 

// define modules UI
app.innerHTML = `
<div id="app">
<h1> Misie Pysie App</h1>
    ${exampleStringModule('example-string-module','Module 1')}  <!-- You can reuse modules any time for UI purpose, can pass content of module, ids, itp.-->
    ${exampleStringModule('example-string-module-copy', 'Same module but with other content')}
    ${exampleStringModule2('example-string-module2', 'Example String Module2')}
</div>
`

// define modules Logic
exampleStringModuleScript2();


