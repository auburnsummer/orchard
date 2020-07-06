/* Setup the meilisearch index.*/

require("dotenv-defaults").config({
	path: require("find-config")(".env"),
	defaults: require("find-config")(".env.defaults")
});

const axios = require("axios");

const yaml = require("js-yaml");

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

	// next, parse our configuration file.
	const meiliConfig = require("./meili.json");
	console.log(meiliConfig);

	// put it in the settings of our index
	let c;
	try {
		c = await axios({
			method: "POST",
			url: `${process.env.MEILISEARCH_SERVER}/indexes/levels/settings`,
			data: meiliConfig
		});
		console.log(c.data);
	} catch (err) {
		console.log(err);
	}

	const uid = c.data.updateId;

	while (true) {
		const howIsItGoing = await axios({
			method: "GET",
			url: `${process.env.MEILISEARCH_SERVER}/indexes/levels/updates/${uid}`
		});
		if (howIsItGoing.data.status === "processed") {
			console.log("complete!");
			break;
		} else {
			console.log(howIsItGoing.data);
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}
	}


})();
