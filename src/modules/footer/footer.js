import * as css from './style.css';

const footer = (authors, about) => {
    return(
        `
        <div class="footer-wrapper">
            <div class="footer-author">
            <h2>Autorzy</h2>
                ${authors.map(author=>{
                    return`<h5>${author}</h5>`
                }).join('')}
            </div>
            <div class="footer-about">
                <h2>O projekcie</h2>
                ${about}
            </div>
        </div>
           `
    );
} 

export default footer;