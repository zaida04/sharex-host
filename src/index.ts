import { getUpload, home, postUpload } from "./route";
import { PORT, logger, json } from "./util";

Bun.serve({
	port: PORT,
	async fetch(req: Bun._Request) {
		const url = new URL(req.url);
		logger.info(`[${req.method}]: ${url.pathname}`);

		if (url.pathname === "/") {
			return home();
		}

		if (url.pathname.startsWith("/uploads/")) {
			return await getUpload(url);
		}

		if (url.pathname === "/upload") {
			return await postUpload(url, req);
		}

		return json(404, {
			success: false,
			message: "Route not found!",
		});
	},
});
