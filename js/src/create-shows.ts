import { default as $ } from "jquery";

(function ($: JQueryStatic) {

	var indexMap = new Map<Number, boolean>();

	function getUnusedID() {
		let current = 0;
		for(let ind in indexMap.keys()) {
			let int = Number.parseInt(ind);
			if(current == int)
				current = int + 1;
			if(!indexMap.has(current))
				break;
		}
		return current;
	}

	function registerID(id: Number) {
		indexMap.set(id, true);
	}

	function removeButtonPress(event: JQuery.Event, el: HTMLElement) {
		event.preventDefault();
		$(el).parent().remove();
		$(".sub-button").prop(
			"disabled",
			$(".date-time").length <= 1
		);
	}

	function addButtonPress(event: JQuery.Event, el: HTMLElement) {
		let currentIndex = getUnusedID();
		registerID(currentIndex);
		event.preventDefault();
		$(el).parent().after(`
		<div class="date-time form-group">
			<label for="date">Date</label>
			<input name="date-${currentIndex}" id="date" type="date" />
			<label for="time-start">Start Time</label>
			<input name="time-start-${currentIndex}" id="time-start" type="time" />
			<label for="time-stop">Stop Time</label>
			<input name="time-stop-${currentIndex}" id="time-stop" type="time" />
			<button id="add-button" type="button" class="add-button btn btn-outline-primary btn-sm"><span class="add-icon dashicons dashicons-plus"></span></button>
			<button id="sub-button" type="button" class="sub-button btn btn-outline-primary btn-sm"><span class="sub-icon dashicons dashicons-minus"></span></button>
		</div>`);
		$(".add-button").one("click", addButtonPress);
		$(".sub-button").one("click", removeButtonPress);
		$(".sub-button").prop(
			"disabled",
			$(".date-time").length <= 1
		);
	}

	$(function () {
		'use strict';
		$("#sub-button").prop("disabled", true);
		$("#add-button").one("click", addButtonPress);

	});

})(jQuery);
