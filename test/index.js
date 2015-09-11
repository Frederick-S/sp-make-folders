var makeFolders = require('sp-make-folders');

var getQueryStringParameter = function (param) {
    var params = document.URL.split("?")[1].split("&");
    var strParams = "";

    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");

        if (singleParam[0] == param) {
            return decodeURIComponent(singleParam[1]);
        }
    }
};

var appWebUrl = getQueryStringParameter('SPAppWebUrl');
var listTitle = 'TestList';
var folderPath = 'Folder1/Folder2';

makeFolders(appWebUrl, listTitle, folderPath, false, function (sender, args) {
    var clientContext = SP.ClientContext.get_current();
    var list = clientContext.get_web().get_lists().getByTitle(listTitle);

    var folderUrls = [appWebUrl + '/Lists/TestList/Folder1', appWebUrl + '/Lists/TestList/Folder1/Folder2'];

    for (var i = 0; i < 2; i++) {
        var listItemCreateInfo = new SP.ListItemCreationInformation();
        listItemCreateInfo.set_folderUrl(folderUrls[i]);

        var listItem = list.addItem(listItemCreateInfo);
        listItem.set_item('Title', 'Item ' + (i + 1));
        listItem.update();
        clientContext.load(listItem);
    }

    clientContext.executeQueryAsync(function (sender, args) {
        $('#message').html('Folders are createdly successfully. <a href=\'' + appWebUrl + '/Lists/TestList/Folder1\'>Folder1</a>, <a href=\'' + appWebUrl + '/Lists/TestList/Folder1/Folder2\'>Folder1/Folder2</a>');
    }, function (sender, args) {
        $('#message').text(args.get_message());
    });
}, function (sender, args) {
    $('#message').text(args.get_message());
});
