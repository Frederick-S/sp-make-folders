/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var makeFolders = __webpack_require__(1);

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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var contextHelper = __webpack_require__(2);

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


/***/ },
/* 2 */
/***/ function(module, exports) {

	function contextHelper(webUrl, crossSite) {
	    var web = null;
	    var site = null;
	    var clientContext = null;
	    var appContextSite = null;

	    if (crossSite) {
	        clientContext = SP.ClientContext.get_current();
	        appContextSite = new SP.AppContextSite(clientContext, webUrl);
	        web = appContextSite.get_web();
	        site = appContextSite.get_site();
	    } else {
	        clientContext = new SP.ClientContext(webUrl);
	        web = clientContext.get_web();
	        site = clientContext.get_site();
	    }

	    return {
	        web: web,
	        site: site,
	        clientContext: clientContext,
	        appContextSite: appContextSite
	    };
	}

	module.exports = contextHelper;

/***/ }
/******/ ]);