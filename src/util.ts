import pino from "pino";
export const logger = pino();

export const DOMAIN_NAME = process.env.DOMAIN_NAME ?? "http://localhost:6000";
export const PORT = process.env.PORT ?? 6000;

export function json(status: number, content: Record<string, unknown>) {
	return new Response(JSON.stringify(content), { status: status, headers: { "Content-Type": "application/json" } });
}

export function getDate() {
	const date: Date = new Date();

	return {
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		day: date.getDate(),
	};
}
