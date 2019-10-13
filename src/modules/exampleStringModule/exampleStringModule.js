import * as css from './style.css';

const exampleStringModule = (id, header) => {
    return(
        `
        <div id=${id} class="example-string-module-wrapper">
            <h2>${header}</h1>
            <h4> Here can by any sort of content </h2>
            <p> You should make modules like this </p>
        </div>
           `
    );
} 

export default exampleStringModule;