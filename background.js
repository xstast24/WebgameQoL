// Forked from blikenoother's repo: https://github.com/blikenoother/ClearCookieAndReload
// triggered when user clicks on installed extension icon
chrome.browserAction.onClicked.addListener(function (tab) {
    let domain = 'prehraj.to';
    console.log('Clearing cookies for ', domain);

    // clear all cookies for the current url
    let cookies_query = {domain: domain};
    chrome.cookies.getAll(cookies_query, function (cookies) {
        console.log("Found cookies: ", cookies);
        clearCookies(cookies);
    });

    // reload current tab (the one where extension was clicked)
    chrome.tabs.reload(tab.id)
});


function clearCookies(cookies) {
    // iterate on cookies to get cookie detail
    for (let i = 0; i < cookies.length; i++) {
        let url = "http" + (cookies[i].secure ? "s" : "") + "://" + cookies[i].domain + cookies[i].path;
        let cname = cookies[i].name;

        // delete cookie (must be specified by url and name)
        chrome.cookies.remove({url: url, name: cname});
    }
}


// chrome.browserAction.onClicked.addListener(function (tab) {
//
//     let url = tab.url;
//
//     // clear all cookies for the current url
//     chrome.cookies.getAll({ url: url }, function (cookies) {
//         console.log("Clearing cookies for active urL", url, cookies);
//         //clearCookies(cookies);
//     });
//
//     // retrive domain from active tab
//     let matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
//     let domain = matches && matches[1].replace('www.', '');
//     domain = "." + domain;
//
//     // get all cookies for domain
//     chrome.cookies.getAll({ domain: domain }, function (cookies) {
//         console.log("Clearing cookies for domain", domain, cookies);
//         clearCookies(cookies);
//     });
// });