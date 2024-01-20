export function json(content: Record<string, unknown>) {
	return new Response(JSON.stringify(content));
}
