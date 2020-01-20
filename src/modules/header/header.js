import * as css from './style.css';
import {getCommitHash} from '../graphNetwork/requests';

const header = async(id, title, content) => {
    try {
        const res = await getCommitHash();
        console.log(res.data);
    } catch (e) {
        console.log(':(');
    }
    // let res = await getCommitHash();
    return(
        `
        <div id=${id} class="header-wrapper">
            <h2>${title}</h2>
            <h4> ${content} </h4>
            <h4>${res}<h4>
        </div>
           `
    );
    
} 

export default header;