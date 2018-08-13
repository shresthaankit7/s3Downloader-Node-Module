var http = require('http');
var AWS = require('aws-sdk');
var uuid = require('uuid');
var s3 = require('s3');
var express = require('express');

var app = express();


var bucketName = 'myBucketName';
var keyName = 'myKeyPath/file.txt';


var credentials = new AWS.SharedIniFileCredentials();

var s3client = s3.createClient(credentials);


var params = {
	localFile: "/home/ankshrestha/Desktop/fromS3Node.txt",
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


app.get('/',function(req,res){
	console.log("Downloading File......");
	res.download("/home/ankshrestha/Desktop/fromS3Node.txt");
});

app.listen(8080);


