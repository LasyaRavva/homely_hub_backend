const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE || process.env.DATABASE_LOCAL;

if (!DB) {
	console.error("No database URI found. Set DATABASE or DATABASE_LOCAL.");
	process.exit(1);
}

mongoose
	.connect(DB)
	.then(() => {
		console.log("DB connection successful");
	})
	.catch((error) => {
		console.error("DB connection failed:", error.message);
		process.exit(1);
	});

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`App running on port: ${port}`);
});