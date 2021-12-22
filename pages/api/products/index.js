import clientPromise from '../../../lib/mongodb'
export default async function handler(req, res) {


    switch (req.method) {
        case 'GET': {
            return getProducts(req, res);
        }

        case 'POST': {
            return await addProduct(req, res);
        }

        case 'PUT': {
            return updateProduct(req, res);
        }

        case 'DELETE': {
            return deleteProduct(req, res);
        }
    }
}

async function getProducts(req, res) {
    try {
        const client = await clientPromise
        const db = client.db();
        const data = await db.collection("products").find({}).limit(20).toArray();

        res.status(200).json({ data })

    } catch (error) {
        // return an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

async function addProduct(req, res) {
    try {

        const client = await clientPromise
        const db = client.db();
        const product =req.body;
        const data = await db.collection("products").insertOne(product);

        res.status(200).json({ data })

    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}