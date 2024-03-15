const yup = require("yup");

const postSchema = yup.object({
    body: yup.object({
        title: yup.string().required(),
        content: yup.string().required(),
    })
});

module.exports = {
    postSchema
}