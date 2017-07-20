# sp-make-folders

[![Greenkeeper badge](https://badges.greenkeeper.io/Frederick-S/sp-make-folders.svg)](https://greenkeeper.io/)
Create folders recursively in SharePoint list.

Note: the folders created are not visible as list items.

## Installation
```
npm install sp-make-folders --save
```

## Usage
```js
var makeFolders = require('sp-make-folders');

var webUrl = 'web url';
var listTitle = 'list title';
var folderPath = 'Folder1/Folder2';
var useAppContextSite = false;

makeFolders(webUrl, listTitle, folderPath, useAppContextSite, function () {
    // Do something
}, function (sender, args) {
    // Error
}):
```

## License
MIT.
