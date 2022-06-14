export function displayStatus(status_name) {
	if (["rejected", "canceled", "void", "unverified", "inactive", "expired", "failed"].includes(status_name)) return `<span class="tag is-danger">${status_name}</span>`;
	else if (["approved", "completed", "active", "verified", "valid", "issued"].includes(status_name)) return `<span class="tag is-success">${status_name}</span>`;
	else if (["needaction"].includes(status_name)) return `<span class="tag" style="color:white;background-color:orange;padding:6px">${status_name}</span>`;
	else return `<span class="tag">${status_name}</span>`;
}