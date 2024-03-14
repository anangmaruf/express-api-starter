const {findMany, insertPost, findById, softDelete, restore} = require("../../repositories/post.repository");
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
    const param = id;
    const dataCache = await getDataCache(`${prefixCache}-${param.id}`);
    if (dataCache === null) {
        const post = await findById(id);
        /**
         * set data cache
         * params (key, data)
         */
        await setDataCache(`${prefixCache}-${post.id}`, post);
        return post;
    } else {
        return dataCache;
    }
}

const softDeleteById = async (id) => {
    const data = await getById(id);
    switch (data.deleted_at) {
        case null:
            const post = await softDelete(id);
            /**
             * set data cache
             * params (key, data)
             */
            await setDataCache(`${prefixCache}-${post.id}`, post);
            return post;
            break;
        default:
            return false;
            break;
    }
}

const restoreById = async (id) => {
    const post = await restore(id);
    await setDataCache(`${prefixCache}-${post.id}`, post);
    return post;
}

module.exports = {
    paginate,
    createPost,
    getById,
    softDeleteById,
    restoreById,
}