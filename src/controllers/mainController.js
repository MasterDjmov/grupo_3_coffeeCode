const express = require('express');
const path = require('path');

const mainController = {
    index: (req, res) => {
        //res.sendFile(path.resolve(__dirname,'../views/index.html'));
        const datos = {
            titulo: "COFFECODE"
        }
        res.render('index',{'datos':datos});
    }
}

module.exports = mainController;