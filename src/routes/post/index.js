const express = require("express");
const create = require("./create");
const get = require("./get");

module.exports = [
    create,
    get
]
