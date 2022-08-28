let lan = 'zh-tw'; // Language

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ lan });
  console.log('Default background color set to chinese', `language: ${lan}`);
});