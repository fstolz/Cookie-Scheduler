document.addEventListener('DOMContentLoaded', function() {

  document.getElementById("radioStd").addEventListener('click', function(){radioClick("Std")});
  document.getElementById("radioRed").addEventListener('click', function(){radioClick("Red")});
  document.getElementById("radioYellow").addEventListener('click', function(){radioClick("Yellow")});
  document.getElementById("radioGreen").addEventListener('click', function(){radioClick("Green")});
  document.getElementById("labelStd").addEventListener('click', function(){radioClick("Std")});
  document.getElementById("labelRed").addEventListener('click', function(){radioClick("Red")});
  document.getElementById("labelYellow").addEventListener('click', function(){radioClick("Yellow")});
  document.getElementById("labelGreen").addEventListener('click', function(){radioClick("Green")});


  chrome.tabs.getSelected(null, function(tab) {
    var url = tab.url;
    var pathArray = url.split( "/" );
    var protocol = pathArray[0];
    var host = pathArray[2];
    url = protocol + "//" + host;
    document.getElementById("mytitle").innerHTML = url;

    chooseInitialRadio(url);
    chrome.storage.local.set({"currentUrl" : url});
  });
}, false);


function radioClick(colour) {
  chrome.storage.local.get("currentUrl", function(result) {
    var url = result["currentUrl"];

    var key = "colourValue_" + url;
    var obj= {};
    obj[key] = colour;

    chrome.storage.local.set(obj);
  });
}

function chooseInitialRadio(url) {
  var key = "colourValue_" + url;

  chrome.storage.local.get(key, function(result) {
    var colour = result[key];
    if (colour == null || colour == "") {
      document.getElementById("radioStd").checked = true;
    } else {
      document.getElementById("radio" + colour).checked = true;
    }
  });
}
