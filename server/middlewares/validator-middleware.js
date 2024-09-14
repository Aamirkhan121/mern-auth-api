const validate=(schema)=>async(req,res,next)=>{

    try {
        const parseBody=await schema.parseAsync(req.body)
        req.body=parseBody
        next()
    } catch (err) {                  //error handling with error-middleware
        const status=422;
        const message="Fill the input properly"
        const extraDetails= err.errors[0].message

        const errorMessage={
            status,
            message,
            extraDetails,
        }
        console.log(errorMessage)
        // res.status(400).json({msg:message})
        next(errorMessage)
    }
}
module.exports=validate;