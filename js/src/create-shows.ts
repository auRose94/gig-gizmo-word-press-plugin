import { default as $ } from "jquery";

(function ($: JQueryStatic) {

	var indexMap = new Map<Number, boolean>();

	function getUnusedID() {
		let current = 0;
		for (; current < indexMap.size; current++)
			if (indexMap.get(current) !== true) return current;
		return current;
	}

	function removeButtonPress(event: JQuery.Event) {
		event.preventDefault();
		let el = (event as any)["target"] as HTMLElement;
		let root = $(el).parent();
		while (root && !root.hasClass("date-time"))
			root = root.parent()
		let id = Number(root[0].id.replace("time-", ""));
		indexMap.set(id, false);
		root.remove();
		$(".sub-button").prop(
			"disabled",
			$(".date-time").length <= 1
		);
	}

	function addButtonPress(event: JQuery.Event) {
		let currentIndex = getUnusedID();
		let el = (event as any)["target"] as HTMLElement;
		indexMap.set(currentIndex, true);
		event.preventDefault();
		let root = $(el).parent();
		while (root && !root.hasClass("date-time"))
			root = root.parent()
		root.after(`
		<div class="date-time form-group" id="time-${currentIndex}">
			<label for="date">Date</label>
			<input name="date-${currentIndex}" id="date" type="date" />
			<label for="time-start">Start Time</label>
			<input name="time-start-${currentIndex}" id="time-start" type="time" />
			<label for="time-stop">Stop Time</label>
			<input name="time-stop-${currentIndex}" id="time-stop" type="time" />
			<button id="add-button-${currentIndex}" type="button" class="add-button btn btn-outline-primary btn-sm"><span class="add-icon dashicons dashicons-plus"></span></button>
			<button id="sub-button-${currentIndex}" type="button" class="sub-button btn btn-outline-primary btn-sm"><span class="sub-icon dashicons dashicons-minus"></span></button>
		</div>`);
		$(`#add-button-${currentIndex}`).on("click.gg.addButtonPress", addButtonPress);
		$(`#sub-button-${currentIndex}`).on("click.gg.removeButtonPress", removeButtonPress);
		$(".sub-button").prop(
			"disabled",
			$(".date-time").length <= 1
		);
	}

	$(function () {
		'use strict';
		indexMap.set(0, true);
		$("#sub-button-0").prop("disabled", true);
		$("#add-button-0").on("click.gg.addButtonPress", addButtonPress);

	});

})(jQuery);
