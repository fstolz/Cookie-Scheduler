var tabToUrl = {};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) { update(tab); });
chrome.tabs.onCreated.addListener(function(tab) {                    update(tab); });

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  var key = "tabToUrl_" + tabId;
  chrome.storage.local.get(key, function(result) {
    var url = result[key];
    console.log("closed tab with url " + url);
    chrome.storage.local.remove(key);

    deleteCookiesIfApplicable(url);
  });
});

function deleteCookiesIfApplicable(url) {
  var key = "colourValue_" + url;

  chrome.storage.local.get(key, function(result) {
    var colour = result[key];
    if (colour == null || colour == "" || colour == "Std") {
      chrome.storage.local.get("colourValueStandard", function(result) {
        var colour = result["colourValueStandard"];
        if (colour == null || colour == "") {
          colour = "Green";
        }
        deleteByColour(url, colour);
      });
    } else {
      deleteByColour(url, colour);
    }
  }
}
function deleteByColour(deleteUrl, colour) {
  if (colour == "Green") {
  // do nothing
  } else if (colour == "Yellow") {
  // delete when browser is being closed
  } else if (colour == "Red") {
  // delete if there's no other tab left
    chrome.tabs.query({}, function(array_of_Tabs) {
      var tab : Tab;
      var url;
      for (var i : int = 0; i < array_of_Tabs.length; i++) {
        tab = array_of_Tabs[i];
        url = tab.url;
        var pathArray = url.split( "/" );
        var protocol = pathArray[0];
        var host = pathArray[2];
        url = protocol + "//" + host;
        if (url == deleteUrl) {
          return;
        }
      }
      // if we get here, there's no open tab left from the same page
      var obj= {};
      obj["url"] = deleteUrl;
      chrome.cookies.getAll(obj, function(cookies) {
        for (int i = 0; i < cookies.length; i++) {
//          chrome.cookies.remove({url:cookies[i].url, name:cookies[i].name});
        }
      });
    });
  }
}

function update(tab) {
  var key = "tabToUrl_" + tab.id;
  var obj= {};
  obj[key] = tab.url;

  chrome.storage.local.set(obj);
}


/*
chrome.tabs.onCreated.addListener(function(tab) {   // same as onAttached
  var key = "windowToTabs_" + tab.windowId;
  chrome.storage.local.get(key, function(result) {
    tabs = result[key];
    if (tabs == null) {
      tabs = [];
    }
    tabs.push(tabId);
    var obj = {};
    obj[key] = tabs;
    chrome.storage.local.set(obj);
  });
});

chrome.tabs.onDetached.addListener(function(tabId, detachInfo) {
  var key = "windowToTabs_" + detachInfo.oldWindowId;
  var tabs = chrome.storage.local.get(key);
  chrome.storage.local.get(key, function(result) {
    tabs = result[key];
    if (tabs == null) {
      tabs = [];
    }
    var index = tabs.indexOf(tabId);
    if (index > -1) {
      tabs.splice(index, 1);
    }
    var obj = {};
    obj[key] = tabs;
    chrome.storage.local.set(obj);
  });
});

chrome.tabs.onAttached.addListener(function(tabId, attachInfo) {
  var key = "windowToTabs_" + attachInfo.newWindowId;
  chrome.storage.local.get(key, function(result) {
    tabs = result[key];
    if (tabs == null) {
      tabs = [];
    }
    tabs.push(tabId);
    var obj = {};
    obj[key] = tabs;
    chrome.storage.local.set(obj);
  });
});*/

/*chrome.windows.onRemoved.addListener(function(windowId) {
  var key =  "windowToTabs_" + windowId;
  chrome.storage.local.get(key, function(result) {
    tabs = result[key];
    for (var i = 0; i < tabs.length; i++) {
      var urlKey = "tabToUrl_" + tabs[i];
      chrome.storage.local.get(key, function(result) {
        var url = result[key];
        console.log("i = " + i + " closed tab with id " + tabs[i] + " and url " + url);
      });
    }
  })
});*/
