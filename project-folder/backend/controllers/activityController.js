const pool = require("../db/connect");
const queries = require("../db/queries");

const addActivity = async (req, res) => {
    const { id} = req.params;
    