const { db } = require("../utils");

/**
 * mandatory assign param email
 * @param {*} data
 * @returns
 */
const findMany = async (data) => {
    return db.post.findMany(data);
}

const insertPost = async (post) => {
    return db.post.create({
        data: post
    });
}

const findById = async (id) => {
    return db.post.findUnique({
        where: {
            ...id,
            deleted_at: null
        }
    });
}

const softDelete = async (id) => {
    return db.post.update({
        where: id,
        data: {
            deleted_at: new Date(),
            deleted: true
        }
    });
}

const restore = async (id) => {
    return db.post.update({
        where: id,
        data: {
            deleted_at: null,
            deleted: false
        }
    });
}

const forceDelete = async (id) => {
    return db.post.delete({
        where: {
            id: id
        }
    });
}

module.exports = {
    findMany,
    insertPost,
    findById,
    softDelete,
    restore,
    forceDelete
}