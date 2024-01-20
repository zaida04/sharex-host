import { nanoid } from "nanoid";
import { json, DOMAIN_NAME, getDate } from "./util";

export function home() {
	return json(200, { message: "Hello World" });
}

export async function getUpload(url: URL) {
	const file = await Bun.file(url.pathname.slice(1));
	if (!file) throw new Error("File not found");

	return new Response(file, {
		headers: {
			"Content-Type": "image/jpeg",
		},
	});
}

export async function postUpload(url: URL, req: Bun._Request) {
	const formdata = await req.formData();
	const file = formdata.get("file");
	if (!file) throw new Error("Invalid form data");

	const id = nanoid(10);
	const { year, month, day } = getDate();
	await Bun.write(
		`uploads/${year}/${month}/${day}/${id}.jpg`,
		// biome-ignore lint/suspicious/noExplicitAny: Bun is acting up here
		file as any,
	);

	return json(200, {
		success: true,
		url: `${DOMAIN_NAME}/uploads/${id}.jpg`,
		message: "File uploaded successfully",
	});
}
