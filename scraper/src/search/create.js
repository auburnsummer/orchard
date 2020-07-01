/* Setup the meilisearch index.*/

require("dotenv-defaults").config({
	path: require("find-config")(".env"),
	defaults: require("find-config")(".env.defaults")
});

const axios = require('axios');

( async () => {
    // is the index already there?
    let a;
    try {
        a = await axios({
            method: "GET",
            url: `${process.env.MEILISEARCH_SERVER}/indexes/levels`
        });
    } catch (err) {
        // make it ourselves first.
        a = await axios({
            method: "POST",
            url: `${process.env.MEILISEARCH_SERVER}/indexes`,
            data: {
                uid: "levels"
            }
        });
    }
    console.log(a);
    // is the PK of the index correct?
    if (a.data.primaryKey !== "sha256") {
        b = await axios({
            method: "PUT",
            url: `${process.env.MEILISEARCH_SERVER}/indexes/levels`,
            data: {
                primaryKey: "sha256"
            }
        });
        console.log(b);
    }

})();