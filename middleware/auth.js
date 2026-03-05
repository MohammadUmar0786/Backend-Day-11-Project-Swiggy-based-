const auth = (req,res,next)=>{

    // Auth. dummy code (No logic, just magic)
    const token = "ABCDEF";
    const access = token=="ABCDEF"?1:0;
    if(!access)
        res.status(403).send("Permission denied")
    else 
        next(); // if access h toh next route handler will call
}

module.exports = {auth,}