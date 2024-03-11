const {findMany, insertPost, findById} = require("../../repositories/post.repository");

const paginate = async (limit, skip, data) => {
    const filters = {
        take: limit,
        skip: skip,
        ...data
    }
    return await findMany(filters);
}

const createPost = async (data) => {
    return await insertPost(data);
}

const getById = async (id) => {
    return await findById(id);
}

module.exports = {
    paginate,
    createPost,
    getById
}