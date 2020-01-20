import { setGraphVariant, graphNetworkScript } from './graphNetwork';
import { getCommitHash } from './requests';

export const clearButtonActive = () => {
    const graphFilesNetworkButton = document.querySelector("#fileProjectStructure");
    const functionsCallsButton = document.querySelector("#functionCall");
    const modulesButton = document.querySelector("#modules");
    const modulesFilesMethods = document.querySelector("#modules-files-methods");
    const file_method = document.querySelector("#file_method");

    graphFilesNetworkButton.classList.remove("tabsButtonActive");
    functionsCallsButton.classList.remove("tabsButtonActive");
    modulesButton.classList.remove("tabsButtonActive");
    modulesFilesMethods.classList.remove("tabsButtonActive");
    file_method.classList.remove("tabsButtonActive");
}

export const hideInputWrappers = () => {
    const graphOptionsWrapper = document.querySelector("#graphOptionsWrapper");
    const modulesFilesMethodsInputWrapper = document.querySelector("#graphOptionsWrapper-modules-files-methods");

    graphOptionsWrapper.classList.remove("inputWrapperActive");
    modulesFilesMethodsInputWrapper.classList.remove("inputWrapperActive");
}

export const tabsScript = () => {
    const graphFilesNetworkButton = document.querySelector("#fileProjectStructure");
    const functionsCallsButton = document.querySelector("#functionCall");
    const modulesButton = document.querySelector("#modules");
    const modulesFilesMethods =  document.querySelector("#modules-files-methods");
    const file_method = document.querySelector("#file_method");

    const graphOptionsWrapper = document.querySelector("#graphOptionsWrapper");
    const modulesFilesMethodsInputWrapper = document.querySelector("#graphOptionsWrapper-modules-files-methods");
    const commit = document.querySelector("#commit");

    commit.onclick = () => {
        getCommitHash();
    }

    graphFilesNetworkButton.onclick = () => {
        hideInputWrappers();
        clearButtonActive();
        setGraphVariant('fileProjectStructure');
        graphFilesNetworkButton.classList.add("tabsButtonActive");
        graphOptionsWrapper.classList.add("inputWrapperActive");
        graphNetworkScript();
    }

    functionsCallsButton.onclick = () => {
        hideInputWrappers();
        clearButtonActive();
        setGraphVariant('functionCall');
        functionsCallsButton.classList.add("tabsButtonActive");
        graphOptionsWrapper.classList.add("inputWrapperActive");
        graphNetworkScript();
    }

    modulesButton.onclick = () => {
        hideInputWrappers();
        clearButtonActive();
        setGraphVariant('modules');
        modulesButton.classList.add("tabsButtonActive");
        graphOptionsWrapper.classList.add("inputWrapperActive");
        graphNetworkScript();
    }

    modulesFilesMethods.onclick = () => {
        hideInputWrappers();
        clearButtonActive();
        setGraphVariant('modules-files-methods');
        modulesFilesMethods.classList.add("tabsButtonActive");
        modulesFilesMethodsInputWrapper.classList.add("inputWrapperActive");
        graphNetworkScript();
    }

    file_method.onclick = () => {
        hideInputWrappers();
        clearButtonActive();
        setGraphVariant('file_method');
        file_method.classList.add("tabsButtonActive");
        graphOptionsWrapper.classList.add("inputWrapperActive");
        graphNetworkScript();
    }



    // graphWrapper.onclick = () => {
    //     clearButtonActive();
    //     setGraphVariant('graphWrapper');
    //     graphWrapper.classList.add("tabsButtonActive");
    //     graphNetworkScript();
    // }

    // modulesFilesMethodsInputWrapper.onclick = () => {
    //     clearButtonActive();
    //     setGraphVariant('modules-files-methods');
    //     modulesFilesMethods.classList.add("tabsButtonActive");
    //     graphNetworkScript();
    // }
}

// export const inputsWrappersScripts = () => {
//     const graphWrapper = document.querySelector("#fileProjectStructure");
//     const modulesFilesMethodsInputWrapper = document.querySelector("#functionCall");

//     graphWrapper.onclick = () => {
//         clearButtonActive();
//         setGraphVariant('modules');
//         graphWrapper.classList.add("tabsButtonActive");
//         graphNetworkScript();
//     }

//     modulesFilesMethodsInputWrapper.onclick = () => {
//         clearButtonActive();
//         setGraphVariant('modules-files-methods');
//         modulesFilesMethods.classList.add("tabsButtonActive");
//         graphNetworkScript();
//     }
// }