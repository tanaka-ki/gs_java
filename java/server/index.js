const functions = require('firebase-functions');
const express = require('express');
var fs = require('fs');
var https = require('https');
var cors = require('cors')
const app = express();

app.use(cors())

exports.app = functions.https.onRequest(app);

app.get('/timestamp', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
})

var hospurl = 'https://opendata.corona.go.jp/api/covid19DailySurvey';

app.get('/hospital', (request, response, next) => {
    response.header('Cache-Control', ['private', 'no-store', 'no-cache', 'must-revalidate', 'proxy-revalidate'].join(','));
     //URL後方作成
     var urlafter = "";
     var isfarst = true;
     if(request.query.facilityName){
         urlafter+="?facilityName=" + request.query.facilityName;
         isfarst = false;
     }
 
     if(request.query.prefName){
         if(isfarst){
             urlafter+="?prefName=" + request.query.prefName;
             isfarst = false;
         }else{
             urlafter+="&prefName=" + request.query.prefName;
         }
     }
 
     if(request.query.cityName){
         if(isfarst){
             urlafter+="?cityName=" + request.query.cityName;
             isfarst = false;
         }else{
             urlafter+="&cityName=" + request.query.cityName;
         }
     }
 
     if(request.query.facilityType){
         if(isfarst){
             urlafter+="?facilityType=" + request.query.facilityType;
             isfarst = false;
         }else{
             urlafter+="&facilityType=" + request.query.facilityType;
         }
     }
 
     if(request.query.ansType){
         if(isfarst){
             urlafter+="?ansType=" + request.query.ansType;
             isfarst = false;
         }else{
             urlafter+="&ansType=" + request.query.ansType;
         }
     }

     var data = [];
     https.get(hospurl + urlafter, (res) => {
         res.on('data', (chunk) => {
             data.push(chunk);
         });
         res.on('end', () => {
             var events   = Buffer.concat(data);
             var r = JSON.parse(events);
             response.send(r);
         });
     })
})
