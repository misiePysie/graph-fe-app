import * as css from './style.css';
import {getCommitHash} from '../graphNetwork/requests';

const header = (id, title, content) => {
    return(
        `
        <div id=${id} class="header-wrapper">
            <h2>${title}</h2>
            <h4> ${content} </h4>
        </div>
           `
    );
} 

export default header;