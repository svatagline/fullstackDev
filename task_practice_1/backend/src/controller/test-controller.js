const { BlogTable, BlogVersionTable } = require("../models/blog-model")
const User = require("../models/User")
const Post = require("../models/Post")
const Order = require("../models/Order")
const Like = require("../models/Like")
const Follow = require("../models/Follow")
const Comment = require("../models/Comment")
const Payment = require("../models/Payment")



const getRecords = async (req, res) => {



    const data = await User.aggregate([
        {
            $lookup: {
                from: "orders",
                localField: "_id",
                foreignField: "userId",
                as: "orders",
            },



        },
        { $unwind: "$orders" },
        {
            $lookup: {
                from: "payments",
                localField: "orders._id",
                foreignField: "orderId",
                as: "payments",
            },



        },
        { $unwind: "$payments" },
        {
            $group: {
                _id: "$_id",
                revenue: {
                    $sum: "$payments.amount"
                }
            }
        }
        // {
        //     $addFields: {
        //         totalPost: { $size: "$posts" }
        //     }
        // },
        // { $sort: { totalPost: 1 } },

        // { $limit: 5 }
    ])


    res.status(200).send({
        data: data
    })
}


const addRecord = async (req, res) => {
    const body = req.body



    const payments = [
        {
            orderId: "69a282564a7811f8dd736ed9",
            userId: "65f100000000000000000002",
            providerId: "65f100000000000000000004",
            amount: 100,
            platformFee: 10,
            providerEarning: 90,
            paymentMethod: "upi",
            status: "success"
        },
        {
            orderId: "69a282564a7811f8dd736ed9",
            userId: "65f100000000000000000003",
            providerId: "65f100000000000000000006",
            amount: 200,
            platformFee: 20,
            providerEarning: 180,
            paymentMethod: "card",
            status: "success"
        },
        {
            orderId: "69a282564a7811f8dd736eda",
            userId: "65f100000000000000000005",
            providerId: "65f100000000000000000009",
            amount: 150,
            platformFee: 15,
            providerEarning: 135,
            paymentMethod: "upi",
            status: "success"
        },
        {
            orderId: "69a282564a7811f8dd736eda",
            userId: "65f100000000000000000007",
            providerId: "65f100000000000000000004",
            amount: 120,
            platformFee: 12,
            providerEarning: 108,
            paymentMethod: "netbanking",
            status: "success"
        },
        {
            orderId: "69a282564a7811f8dd736edb",
            userId: "65f100000000000000000008",
            providerId: "65f100000000000000000006",
            amount: 80,
            platformFee: 8,
            providerEarning: 72,
            paymentMethod: "upi",
            status: "failed"
        },
        {
            orderId: "69a282564a7811f8dd736edb",
            userId: "65f100000000000000000010",
            providerId: "65f100000000000000000009",
            amount: 300,
            platformFee: 30,
            providerEarning: 270,
            paymentMethod: "card",
            status: "success"
        },
        {
            orderId: "69a282564a7811f8dd736edb",
            userId: "65f100000000000000000002",
            providerId: "65f100000000000000000004",
            amount: 140,
            platformFee: 14,
            providerEarning: 126,
            paymentMethod: "upi",
            status: "success"
        },
        {
            orderId: "69a282564a7811f8dd736edb",
            userId: "65f100000000000000000003",
            providerId: "65f100000000000000000006",
            amount: 160,
            platformFee: 16,
            providerEarning: 144,
            paymentMethod: "card",
            status: "success"
        },
        {
            orderId: "69a282564a7811f8dd736edb",
            userId: "65f100000000000000000005",
            providerId: "65f100000000000000000009",
            amount: 90,
            platformFee: 9,
            providerEarning: 81,
            paymentMethod: "upi",
            status: "success"
        },
        {
            orderId: "69a282564a7811f8dd736edb",
            userId: "65f100000000000000000007",
            providerId: "65f100000000000000000004",
            amount: 180,
            platformFee: 18,
            providerEarning: 162,
            paymentMethod: "netbanking",
            status: "pending"
        }
    ];

    const data = await Payment.insertMany(payments)


    res.status(200).send({
        data: 'data'
    })
}

const updateRecord = async (req, res) => {
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

const deleteRecord = async (req, res) => {
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
    getRecords, addRecord, updateRecord,
    deleteRecord
}