const { BlogTable, BlogVersionTable } = require("../models/blog-model")

const getBlogs = async (req, res) => {



    const data = await BlogTable.aggregate([
        {
            $addFields: {
                versionObjId: { $toObjectId: "$versionId" }
            }
        },
        {
            $lookup: {
                from: "blogversions",
                localField: "versionObjId",
                foreignField: "_id",
                as: "versionData"
            }
        },
        {
            $unwind: {
                path: "$versionData",
                preserveNullAndEmptyArrays: true
            }
        }
    ]);


    res.status(200).send({
        data: data
    })
}


const addBlog = async (req, res) => {
    const body = req.body
    const newBlog = await BlogTable.insertOne({
        title: body.title
    })

    const newVersion = await BlogVersionTable.insertOne({
        content: body.content,
        blogId: newBlog._id
    })

    await BlogTable.updateOne({ _id: newBlog._id }, {
        versionId: newVersion.id
    })

    res.status(200).send({
        data: newVersion
    })
}

const updateBlog = async (req, res) => {
    const body = req.body

    if (body.title) {
        await BlogTable.updateOne({ _id: body.id }, {
            title: body.title
        })
    }

    if (body.content) {

        await BlogVersionTable.insertOne({
            content: body.content,
            blogId: body.id
        })
    }

    if (body.onlyVersionChange === 1) {
        await BlogTable.updateOne({ _id: body.id }, {
            versionId: body.versionId
        })
    }


    res.status(200).send({
        data: { "message": "version updated" }
    })
}

const deleteBlog = async (req, res) => {
    const body = req.body
    await BlogTable.updateOne({
        _id: body.id
    }, { isSoftDeleted: 1 })

    await BlogVersionTable.updateMany({
        blogId: body.id
    }, { isSoftDeleted: 1 })



    res.status(200).send({
        data: { "message": "blog deleted" }
    })
}


module.exports = {
    getBlogs, addBlog, updateBlog,
    deleteBlog
}