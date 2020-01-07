import * as css from './css/style.css';
import header from './modules/header/header';
import footer from './modules/footer/footer';
import graphNetwork, {graphNetworkScript} from './modules/graphNetwork/graphNetwork';
import { tabsScript } from './modules/graphNetwork/storyTabsSwitcherLogic';
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
        ['Karol Żebrowski','Karol Wyrzykowski','Norbert Wójtowicz','Gabriela Śreniawska','Karolina Szykuła','Dominik Strama'],
        'Aplikacja ma za zadanie wyświetlenie połączeń występujących pomiędzy jej własnymi plikami źródłowymi w postaci grafu'
    )}
</div>
`
// define modules Logic
graphNetworkScript();
tabsScript();


