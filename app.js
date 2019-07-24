/**
 * @file
 *
 * @author : zhoumh
 * @history :
 * Date         Version Remarks
 * ============ ======= ======================================================
 * 2019/4/25      1.0     First version
 *
 * Copyright 2019, all rights reserved. Essa.cn
 * */

var express = require('express');
var path = require('path');
var app = express();



app.set('view engine', 'html');
// 处理静态文件
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function (req,res) {
    res.sendFile(__dirname+"/src/views/index.html");
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000 !');
});