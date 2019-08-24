/*global chrome*/

export default function getStorage(key,cb){
    chrome.storage.local.get([key], function(result) {
        cb(result);
    });
}