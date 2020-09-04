console = chrome.extension.getBackgroundPage().console;


//document.addEventListener('click', () => alert('Click occurred!'));

function showMarketPriceForOnePrestige() {
    let itemNodes = document.getElementsByClassName('mactprice');
    if (itemNodes.length === 0) {
        alert("Error: No items with class 'item' found.")
    } else {
        for (let i=0; i<itemNodes.length; i++) {
            itemNodes[i].textContent = itemNodes[i].textContent + 'KEK';
        }
    }
}
