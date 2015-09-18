# sp-make-folders
Create folders recursively in SharePoint list.

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
