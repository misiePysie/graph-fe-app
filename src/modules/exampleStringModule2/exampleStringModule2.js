import * as css from './style.css';

export const exampleStringModuleScript2 = () => {
    const myButton = document.querySelector("#myButton");
    myButton.onclick = () => {
        alert('You clicked me :>');
    }
}

const exampleStringModule2 = (id, header) => {
    return(
        `
        <div id=${id} class="example-string-module-wrapper2">
            <h5>${header}</h5>
            <p>he</p>
            <button id="myButton"> Click me! </button>
            <h2> Here can by any sort of content </h2>
            <p> You should make modules like this </p>
        </div>
           `
    );
} 

export default exampleStringModule2;