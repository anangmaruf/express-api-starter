const bcrypt = require("bcrypt");
const { db } = require("../utils");
const { hashToken } = require("../utils/hashToken");
const {returnValue} = require("../utils/helper");

/**
 * mandatory assign param email
 * @param {*} data
 * @returns
 */
const findMany = async (data) => {
    return await db.post.findMany(...data);
}

const insertPost = async (post) => {
    return await db.post.create({
        data: post
    });
}

const findById = async (id) => {
    return await db.post.findUnique({
        where: {
            id
        }
    });
}

module.exports = {
    findMany,
    insertPost,
    findById
}