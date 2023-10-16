import prisma from "../db";

export const getOneUpdate = async (req, res) =>{
    const update = await prisma.update.findUnique({
        where:{
            id: req.params.id
        }
    })
    res.json({data: update})
}



export const getUpdates = async (req, res) =>{
    const products = await prisma.product.findMany({
        where:{
            belongsToId: req.user.id
        },
        include:{
            updates: true
        }
    })
    console.log(products)
  
    const updates = products.reduce((alUpdates, product)=>{
        return [...alUpdates, ...product.updates]
    }, [])
    res.json({data: updates})
}


export const createUpdate = async (req, res)=>{
    const product = await prisma.product.findUnique({
        where:{
            id: req.body.productId
        }
    })
    if(!product){
        return res.json({data: 'there are no products for this user'})
    }
    const created = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            product: {connect: {id: product.id}}
        }
    })
    res.json({data: created})
}

export const updateUpdate = async (req, res) =>{ 
    // product returns a collection of product matching specific user id
    const product = await prisma.product.findMany({
        where:{
            belongsToId: req.user.id
        },
        include:{
            updates: true
        }
    })
    // updates takes these collection from products and returns a concatenated array of updates
    const updates = product.reduce((allUpdates, product)=>{
        return [...allUpdates, ...product.updates]
    }, []) 

    // match is checking through the updates to find the params id if it exists
    const match = updates.find((update)=> update.id === req.params.id)

    // if there's no match throw an error 
    if (!match){
        return res.json({data: 'no match'})
    }
    
    // else there's a match, then create the update

    const updatedUpdate = await prisma.update.update({
        where:{
            id: req.params.id
        },
        data: req.body
    })

    res.json({data: updatedUpdate})
}

export const deleteUpdate = async (req,res)=>{

    const product = await prisma.product.findMany({
        where:{
            belongsToId: req.user.id
        },
        include:{
            updates: true
        }
    })

    const updates = product.reduce((allUpdates, product)=>{
        return [...allUpdates, ...product.updates]
    }, [])

    const match = updates.find((update)=> update.id === req.params.id)

    if(!match){
        res.json({data: 'no match'})
    }
    const deleted= await prisma.update.delete({
        where:{
            id: req.params.id
        }
    })

    res.json({data: deleted})

}
