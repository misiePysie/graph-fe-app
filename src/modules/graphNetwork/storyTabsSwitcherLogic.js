export const clearButtonActive = () => {
    const graphFilesNetworkButton = document.querySelector("#fileProjectStructure");
    const functionsCallsButton = document.querySelector("#functionCall");
    const modulesButton = document.querySelector("#modules");

    graphFilesNetworkButton.classList.remove("tabsButtonActive");
    functionsCallsButton.classList.remove("tabsButtonActive");
    modulesButton.classList.remove("tabsButtonActive");
}

export const tabsScript = () => {
    const graphFilesNetworkButton = document.querySelector("#fileProjectStructure");
    const functionsCallsButton = document.querySelector("#functionCall");
    const modulesButton = document.querySelector("#modules");

    graphFilesNetworkButton.onclick = () => {
        clearButtonActive();
        graphVariant = 'fileProjectStructure';
        graphFilesNetworkButton.classList.add("tabsButtonActive");
        graphNetworkScript();
    }

    functionsCallsButton.onclick = () => {
        clearButtonActive();
        graphVariant = 'functionCall';
        functionsCallsButton.classList.add("tabsButtonActive");
        graphNetworkScript();
    }

    modulesButton.onclick = () => {
        clearButtonActive();
        graphVariant = 'modules';
        modulesButton.classList.add("tabsButtonActive");
        graphNetworkScript();
    }
}