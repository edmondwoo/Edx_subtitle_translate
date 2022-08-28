let translate = document.getElementById("translate");

translate.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageTranslate,
  });
});

function setPageTranslate() {
  chrome.storage.sync.get("lan", ({ lan }) => {
    console.log(lan);
    var ol = document.getElementsByClassName("subtitles-menu")[0];
    console.log(ol);
    // var targetLi = ol.getElementsByTagName("li")[3];

    // var li = document.createElement("li");
    // li.textContent = "777"

    // insertAfter(li,  targetLi);

    console.log(document.body);
  });
}

function insertAfter(newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}