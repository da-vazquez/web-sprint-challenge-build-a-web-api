

function logger() {
  return (req, res, next) => {
    const time = new Date().toISOString()

    console.log(`${req.ip} made a ${req.method} request to ${req.url} at ${time}`)
      
    
  next()
}
}




module.exports = {logger}