import * as css from './css/style.css'; // import global styles
import exampleModule from './modules/exampleModule';
import exampleModule2 from './modules/exampleModule2';
const app = document.getElementById("app");

app.appendChild(exampleModule);
app.appendChild(exampleModule2);
