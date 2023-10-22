document.querySelectorAll("li.tab").forEach(addSwitchTabEventListener());

function addSwitchTabEventListener() {
    return clickedTab => clickedTab.addEventListener("click", () => {
        document.querySelectorAll("li.tab").forEach(tab => {
            tab.classList.remove("is-active");
        });
        clickedTab.classList.add("is-active");

        const tabId = clickedTab.attributes["tabId"].nodeValue;
        const contentToDisplay = document.getElementById(tabId);
        document.querySelectorAll(".content-tab").forEach(content => {
            content.style.display = "none";
        });
        contentToDisplay.style.display = "block";
    });
}

