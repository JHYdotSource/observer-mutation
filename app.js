(() => {
    'use strict';

    const selectors = {
        'mutationContainer': '.mutation__container',
        'mutationChild': '.mutation__container--child',
        'controlButtonChange': '.control__button.change__attribute',
        'controlButtonRemove': '.control__button.remove__element',
        'controlButtonAdd': '.control__button.add__element',
        'consoleOutput': '.console__display--output',
    }

    const addElement = () => {
        const childElem = document.createElement("div");
        childElem.id = `child__${Date.now()}`;
        childElem.classList.add('mutation__container--child');
        
        const changeBtn = document.createElement("button");
        changeBtn.classList.add('control__button', 'change__attribute');
        changeBtn.textContent = 'Change attribute';
        changeBtn.addEventListener("click", (event) => {
            const time = Date.now();
            event.currentTarget.parentElement.dataset.timeStart = time;
        });

        const addBtn = document.createElement("button");
        addBtn.classList.add('control__button', 'add__element');
        addBtn.textContent = 'Add element';
        addBtn.addEventListener("click", (event) => {
            addElement();
        });

        const removeBtn = document.createElement("button");
        removeBtn.classList.add('control__button', 'remove__element');
        removeBtn.textContent = 'Remove element';
        removeBtn.addEventListener("click", (event) => {
            event.currentTarget.parentElement.remove();
        });

        childElem.appendChild(changeBtn);
        childElem.appendChild(addBtn);
        childElem.appendChild(removeBtn);

        const mtnContainer = document.querySelector(selectors.mutationContainer);
        if (mtnContainer) {
            mtnContainer.appendChild(childElem);
        }
    }

    const output = (outputTitle, outputMessage) => {
        const consoleDisplay = document.querySelector(selectors.consoleOutput);
        if (consoleDisplay) {
            consoleDisplay.append(`${outputTitle}: ${outputMessage}\r\n`);
            consoleDisplay.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }

    const mtnContainer = document.querySelector(selectors.mutationContainer);
    if (mtnContainer) {

        const mutationConfig = { 
            attributes: true, 
            childList: true, 
            subtree: true 
        };

        const mutationCallback = (entries, observer) => {
            for (const entry of entries) {
                console.log(entry)
                const addButtons = document.querySelectorAll(selectors.controlButtonAdd);
                if (addButtons) {
                    if (entry.type === 'childList') {
                        if (entry.target.children.length > 10) {
                            addButtons.forEach(addBtn => addBtn.disabled = true);
                        } else {
                            addButtons.forEach(addBtn => addBtn.disabled = false);
                        }
                    }
                }
                
                output('EventType', entry.type);
                if (entry.type === 'attributes') {
                    output('Changed attribute', entry.attributeName);
                    if (entry.target.id) {
                        output('ID', entry.target.id);
                    }
                }

                if (entry.removedNodes) {
                    entry.removedNodes.forEach(removedNode => {
                        output('Removed', removedNode.id);           
                    })
                }

                if (entry.addedNodes) {
                    entry.addedNodes.forEach(addedNode => {
                        output('Added', addedNode.id);          
                    })
                }
                
            }
        }

        const mutationObserver = new MutationObserver(mutationCallback);
        mutationObserver.observe(mtnContainer, mutationConfig);
    }

    const rmvButtons = document.querySelectorAll(selectors.controlButtonRemove);
    if (rmvButtons) {
        rmvButtons.forEach((rmvButton) => {
            rmvButton.addEventListener("click", (event) => {
                event.currentTarget.parentElement.remove();
            });
        });
    }

    const chgButtons = document.querySelectorAll(selectors.controlButtonChange);
    if (chgButtons) {
        chgButtons.forEach((chgButton) => {
            chgButton.addEventListener("click", (event) => {
                const time = Date.now();
                event.currentTarget.parentElement.dataset.timeStart = time;
            });
        })
    }

    const addButtons = document.querySelectorAll(selectors.controlButtonAdd);
    if (addButtons) {
        addButtons.forEach((addButton) => {
            addButton.addEventListener("click", (event) => {
                addElement();
            });
        });
    }

})();