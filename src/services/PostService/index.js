const {findMany, insertPost, findById, softDelete, restore, forceDelete} = require("../../repositories/post.repository");
const {environtment} = require("../../constants");
const {setDataCache, getDataCache, removeDataCache} = require("../../utils");
const {} = require("../../utils/cache");

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
    const dataCache = await getDataCache(`${prefixCache}-${id.id}`);
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
    if (data.deleted_at === null) {
        const post = await softDelete(id);
        /**
         * set data cache
         * params (key, data)
         */
        await setDataCache(`${prefixCache}-${id.id}`, post);
        return post;
    }
    return false;
}

const restoreById = async (id) => {
    const post = await restore(id);
    await setDataCache(`${prefixCache}-${id.id}`, post);
    return post;
}

const deleteById = async (id) => {
    const post = await forceDelete(id);
    await removeDataCache(`${prefixCache}-${id}`);
}

module.exports = {
    paginate,
    createPost,
    getById,
    softDeleteById,
    restoreById,
    deleteById
}