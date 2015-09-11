var contextHelper = require('sp-context-helper');

function makeFolders(webUrl, listTitle, folderPath, crossSite, done, error) {
    var contextWrapper = contextHelper(webUrl, crossSite);
    var clientContext = contextWrapper.clientContext;
    var folderNames = folderPath.split('/');

    if (folderNames.length === 0) {
        return;
    }

    var list = clientContext.get_web().get_lists().getByTitle(listTitle);
    var parentFolder = list.get_rootFolder();

    makeFoldersRecursively(parentFolder, folderNames, done, error);
}

function makeFoldersRecursively(parentFolder, folderNames, done, error) {
    var clientContext = parentFolder.get_context();
    var folderName = folderNames.shift();
    var newFolder = parentFolder.get_folders().add(folderName);

    clientContext.load(newFolder);
    clientContext.executeQueryAsync(function (sender, args) {
        if (folderNames.length === 0) {
            done();
        } else {
            makeFoldersRecursively(newFolder, folderNames, done, error);
        }
    }, error);
}

module.exports = makeFolders;
