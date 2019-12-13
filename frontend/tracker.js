//Yes I know these hard coded HTML should really be react components
function addToRecords(name, amount, reason) {
	let newRec = $(`
		<div class="record">
			${name} spent ${amount} on ${reason}
		</div>
	`).appendTo("#records");

	$(`<button>remove</button>`).appendTo(newRec).click(() => {
		newRec.remove();
	});
}

$(() => {
	$('#submit').click(() => {
		let name = $("#person-picker option:selected").val();
		let amount = $("#amount").val();
		let reason = $("#reason").val();
		addToRecords(name, amount, reason);
	});
});
