// getting-started.js
const mongoose = require('mongoose');
const container = require('./dependencyInjection');

(async function () {
	try {
		const dbConnctionURL =
			process.env.NODE_ENV !== 'production'
				? 'mongodb://localhost:27017/selfManageBot'
				: `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PW}@selfmanagebotcluster.mvecp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
		await mongoose.connect(dbConnctionURL);
		// container.cradle.logger.info('[DB] Connected to MongoDB');
	} catch (err) {
		container.cradle.logger.error(err);
	}
})();
