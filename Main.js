var config = require('config');
var http = require('http');
var AWS = require('aws-sdk');
var uuid = require('uuid');
var s3 = require('s3');
var express = require('express');

var app = express();


var bucketName = config.get('s3Config.bucketName');
var keyName = config.get('s3Config.keyName');
var localFilePath = config.get('filePathConfig.localFilePath');


var credentials = new AWS.SharedIniFileCredentials();
var s3client = s3.createClient(credentials);
var params = {
	localFile: localFilePath,
	s3Params:{
		Bucket: bucketName,
		Key: keyName,
	},
};

var downloader = s3client.downloadFile(params);
downloader.on('error',function(err){
	console.error("unable to download: ",err.stack);
});
downloader.on('progress', function(){
	console.log("progress", downloader.progressAmount,downloader.progressTotal);
});
downloader.on('end',function(){
	console.log("doneDownloading");
});


app.get('/download',function(req,res){
	console.log("Downloading File......");
	res.download(localFilePath);
});

app.listen(config.get('serverConfig.port'),config.get('serverConfig.host'));


