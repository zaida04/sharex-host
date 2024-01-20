import { nanoid } from "nanoid";
import { json } from "./http";
import { logger } from "./logger";

const DOMAIN_NAME = process.env.DOMAIN_NAME ?? "http://localhost:6000";
const PORT = process.env.PORT ?? 6000;

Bun.serve({
	port: PORT,
	async fetch(req: Bun._Request) {
		const url = new URL(req.url);
		logger.info(`[${req.method}]: ${url.pathname}`);

		if (url.pathname === "/") {
			return json({ message: "Hello World" });
		}

		if (url.pathname.startsWith("/uploads/")) {
			const file = await Bun.file(url.pathname.slice(1));
			if (!file) throw new Error("File not found");

			return new Response(file, {
				headers: {
					"Content-Type": "image/jpeg",
				},
			});
		}

		if (url.pathname === "/upload") {
			const formdata = await req.formData();
			const file = formdata.get("file");
			if (!file) throw new Error("Invalid form data");

			const id = nanoid(10);
			const date: Date = new Date();
			const year: number = date.getFullYear();
			const month: number = date.getMonth() + 1;
			const day: number = date.getDate();

			await Bun.write(
				`uploads/${year}/${month}/${day}/${id}.jpg`,
				// biome-ignore lint/suspicious/noExplicitAny: Bun is acting up here
				file as any,
			);
			return json({
				success: true,
				url: `${DOMAIN_NAME}/uploads/${id}.jpg`,
				message: "File uploaded successfully",
			});
		}

		return json({
			success: false,
			message: "Route not found!",
		});
	},
});
