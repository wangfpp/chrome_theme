let history_container = document.querySelector("#history_container");
chrome.browserAction.onClicked.addListener(() => chrome.tabs.create({}))
chrome.history.search({text: '', maxResults: 10}, function(data) {
    let history_item = "";
    data.forEach(function(page) {
        let { id, title, url, visitCount, typedCount } = page;
        history_item += `
            <div class="history_item">
                <a href="${url}">
                    <img src="chrome://favicon/size/20@2x/${url}" alt="icon"/>
                    <p class="title">${title}</p>
                </a>
            </div>
        `
    });
    if (history_item.length && history_container) {
        history_container.innerHTML = history_item;
    }
});