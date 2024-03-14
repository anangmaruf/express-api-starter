const express = require("express");
const create = require("./create");
const get = require("./get");
const softDelete = require("./softDelete");
const restore = require("./restore");

module.exports = [
    create,
    get,
    softDelete,
    restore
]
