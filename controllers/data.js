let Parks = require("../StateParks")


const getAllParks = (req,res) => {
    res.json(Parks)
}

module.exports = {getAllParks}

