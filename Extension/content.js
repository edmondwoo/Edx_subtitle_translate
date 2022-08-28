(function() {
    'use strict';
    var text = document.getElementsByClassName("closed-captions is-visible")[0];

    let translate = document.createElement('div');
    translate.className = "closed-captions is-visible";
    translate.setAttribute(
        'style',
        'top: 75%;',
    );

    insertAfter(translate, text);
    var config = { attributes: true, childList: true, subtree: true };

    var observer = new MutationObserver((list) => {
        console.log(list[0].target.textContent);
        console.log("hihi");
        console.log(list);
        getTranslation(list[0].target.textContent, translatedText => {
            const translatedTextList = translatedText.split('\n\n');
            console.log(translatedTextList);
            translate.textContent = translatedTextList;
            translate.setAttribute(
                'style',
                'top: 75%;',
            );
        });
    });

    observer.observe(text, config);
})();

function getTranslation (words, callback) {
  // 通过谷歌翻译 API 进行翻译，输入待翻译的字符串，返回翻译完成的字符串
  const xhr = new XMLHttpRequest()
  let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-tw&dt=t&q=${encodeURI(words)}`
  xhr.open('GET', url, true)
  xhr.responseType = 'text'
  xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200 || xhr.status === 304) {
        // 返回的翻译文本大概是
        // [[["你好。","hello.",null,null,1],["你好","hello",null,null,1]],null,"en"]
        // 这样的字符串
        // 需要将结果拼接成完整的整段字符串
        const translatedList = JSON.parse(xhr.responseText)[0]
        let translatedText = ''
        for (let i = 0; i < translatedList.length; i++) {
          translatedText += translatedList[i][0]
        }
        callback(translatedText)
      }
    }
  }
  xhr.send()
}

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}