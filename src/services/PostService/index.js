const {findMany, insertPost, findById, softDelete} = require("../../repositories/post.repository");
const {environtment} = require("../../constants");
const {setDataCache, responseJson} = require("../../utils");
const {getDataCache} = require("../../utils/cache");

const prefixCache = `${environtment.APP_NAME}-POST`;
const paginate = async (limit, skip, data) => {
    const filters = {
        take: limit,
        skip: skip,
        ...data
    }
    return await findMany(filters);
}

const createPost = async (data) => {
    const post = await insertPost(data);
    /**
     * set data cache
     * params (key, data)
     */
    await setDataCache(`${prefixCache}-${post.id}`, post);
    return post;
}

const getById = async (id) => {
    const dataCache = await getDataCache(`${prefixCache}-${id}`);
    if (dataCache === null) {
        const post = await findById(id);
        /**
         * set data cache
         * params (key, data)
         */
        await setDataCache(`${prefixCache}-${id}`, post);
        return post;
    } else {
        return dataCache;
    }
}

const softDeleteById = async (id) => {
    return await softDelete(id);
}

module.exports = {
    paginate,
    createPost,
    getById,
    softDelete
}