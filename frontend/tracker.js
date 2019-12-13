const baseURL = 'http://localhost:8080';

//Yes I know these hard coded HTML should really be react components
function addToRecords(name, amount, reason) {
	let newRec = $(`
		<div class="record">
			${name} spent ${amount} on ${reason}
		</div>
	`).appendTo("#records");

	$(`<button>remove</button>`).appendTo(newRec).click(() => {
		newRec.remove();
		$.ajax({
			url: baseURL,
			type: 'delete',
			data: {name, amount, reason}
		});
	});
	return newRec;
}

$(() => {
	$('#submit').click(() => {
		let name = $("#person-picker option:selected").val();
		let amount = $("#amount").val();
		let reason = $("#reason").val();
		addToRecords(name, amount, reason);
		$.post(baseURL, {name, amount, reason});
	});
	$.get(baseURL).then(records => {
		for(let r of records)
			if(!r.deleted)
				addToRecords(r.name, r.amount, r.reason);
	});
});
