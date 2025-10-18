export default function formatDate(iso) {
	if (!iso) return "";
	const d = new Date(iso);
	return isNaN(d)
		? ""
		: d.toLocaleDateString(undefined, {
				year: "numeric",
				month: "long",
				day: "numeric",
		  });
}
