document.addEventListener('DOMContentLoaded', function() {

  document.getElementById("radioStd").addEventListener('click', function(){urlRadioClick("Std")});
  document.getElementById("radioRed").addEventListener('click', function(){urlRadioClick("Red")});
  document.getElementById("radioYellow").addEventListener('click', function(){urlRadioClick("Yellow")});
  document.getElementById("radioGreen").addEventListener('click', function(){urlRadioClick("Green")});
  document.getElementById("labelStd").addEventListener('click', function(){urlRadioClick("Std")});
  document.getElementById("labelRed").addEventListener('click', function(){urlRadioClick("Red")});
  document.getElementById("labelYellow").addEventListener('click', function(){urlRadioClick("Yellow")});
  document.getElementById("labelGreen").addEventListener('click', function(){urlRadioClick("Green")});

  document.getElementById("radioRedS").addEventListener('click', function(){stdRadioClick("Red")});
  document.getElementById("radioYellowS").addEventListener('click', function(){stdRadioClick("Yellow")});
  document.getElementById("radioGreenS").addEventListener('click', function(){stdRadioClick("Green")});
  document.getElementById("labelRedS").addEventListener('click', function(){stdRadioClick("Red")});
  document.getElementById("labelYellowS").addEventListener('click', function(){stdRadioClick("Yellow")});
  document.getElementById("labelGreenS").addEventListener('click', function(){stdRadioClick("Green")});

  document.getElementById("showStdButton").addEventListener('click', function(){showHideStd();})


  chrome.tabs.getSelected(null, function(tab) {
    var url = tab.url;
    var pathArray = url.split( "/" );
    var protocol = pathArray[0];
    var host = pathArray[2];
    url = protocol + "//" + host;
    document.getElementById("mytitle").innerHTML = "settings for: " + url;

    chooseInitialRadio(url);
    chrome.storage.local.set({"currentUrl" : url});
  });
}, false);


function showHideStd() {
  var fieldSet = document.getElementById("standardFieldset");
  if (fieldSet.style.display == "none") {
    fieldSet.style.display = "inline";
  } else {
    fieldSet.style.display = "none";
  }
}

function urlRadioClick(colour) {
  chrome.storage.local.get("currentUrl", function(result) {
    var url = result["currentUrl"];

    var key = "colourValue_" + url;
    var obj= {};
    obj[key] = colour;

    chrome.storage.local.set(obj);
  });
}

function stdRadioClick(colour) {
  var key = "colourValueStandard";
  var obj = {};
  obj[key] = colour;
  chrome.storage.local.set(obj);
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

  key = "colourValueStandard";
  chrome.storage.local.get(key, function(result) {
    var colour = result[key];
    if (colour == null || colour == "") {
      document.getElementById("radioGreenS").checked = true;
    } else {
      document.getElementById("radio" + colour + "S").checked = true;
    }
  });
}
