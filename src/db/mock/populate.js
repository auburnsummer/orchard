/*
Create some mock data for the tables for testing purposes.
*/

const axios = require('axios');
const { Client } = require('pg');


const RD_API_URL = "https://script.google.com/macros/s/AKfycbzm3I9ENulE7uOmze53cyDuj7Igi7fmGiQ6w045fCRxs_sK3D4/exec";

( async () => {
    let data = await axios.get(RD_API_URL);
    console.log(data);
})();