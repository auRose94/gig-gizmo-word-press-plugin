/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/src/create-shows.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/src/create-shows.ts":
/*!********************************!*\
  !*** ./js/src/create-shows.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n(function ($) {\n    var indexMap = new Map();\n    function getUnusedID() {\n        var current = 0;\n        for (; current < indexMap.size; current++)\n            if (indexMap.get(current) !== true)\n                return current;\n        return current;\n    }\n    function removeButtonPress(event) {\n        event.preventDefault();\n        var el = event[\"target\"];\n        var root = $(el).parent();\n        while (root && !root.hasClass(\"date-time\"))\n            root = root.parent();\n        var id = Number(root[0].id.replace(\"time-\", \"\"));\n        indexMap.set(id, false);\n        root.remove();\n        $(\".sub-button\").prop(\"disabled\", $(\".date-time\").length <= 1);\n    }\n    function addButtonPress(event) {\n        var currentIndex = getUnusedID();\n        indexMap.set(currentIndex, true);\n        event.preventDefault();\n        var root = $(\"#submit\");\n        root.before(\"\\n\\t\\t<div class=\\\"date-time form-group\\\" id=\\\"time-\" + currentIndex + \"\\\">\\n\\t\\t\\t<label for=\\\"date\\\">Date</label>\\n\\t\\t\\t<input name=\\\"date-\" + currentIndex + \"\\\" id=\\\"date\\\" type=\\\"date\\\" />\\n\\t\\t\\t<label for=\\\"time-start\\\">Start Time</label>\\n\\t\\t\\t<input name=\\\"time-start-\" + currentIndex + \"\\\" id=\\\"time-start\\\" type=\\\"time\\\" />\\n\\t\\t\\t<label for=\\\"time-stop\\\">Stop Time</label>\\n\\t\\t\\t<input name=\\\"time-stop-\" + currentIndex + \"\\\" id=\\\"time-stop\\\" type=\\\"time\\\" />\\n\\t\\t\\t<button id=\\\"add-button-\" + currentIndex + \"\\\" type=\\\"button\\\" class=\\\"add-button btn btn-outline-primary btn-sm\\\"><span class=\\\"add-icon dashicons dashicons-plus\\\"></span></button>\\n\\t\\t\\t<button id=\\\"sub-button-\" + currentIndex + \"\\\" type=\\\"button\\\" class=\\\"sub-button btn btn-outline-primary btn-sm\\\"><span class=\\\"sub-icon dashicons dashicons-minus\\\"></span></button>\\n\\t\\t</div>\");\n        $(\"#add-button-\" + currentIndex).on(\"click.gg.addButtonPress\", addButtonPress);\n        $(\"#sub-button-\" + currentIndex).on(\"click.gg.removeButtonPress\", removeButtonPress);\n        $(\".sub-button\").prop(\"disabled\", $(\".date-time\").length <= 1);\n    }\n    $(function () {\n        'use strict';\n        addButtonPress(jQuery.Event(\"load\"));\n    });\n})(jQuery);\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXNob3dzLmpzIiwic291cmNlUm9vdCI6Ii4vanMvc3JjLyIsInNvdXJjZXMiOlsiY3JlYXRlLXNob3dzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsQ0FBQyxVQUFVLENBQWU7SUFFekIsSUFBSSxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQW1CLENBQUM7SUFFMUMsU0FBUyxXQUFXO1FBQ25CLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNoQixPQUFPLE9BQU8sR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRTtZQUN4QyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSTtnQkFBRSxPQUFPLE9BQU8sQ0FBQztRQUNwRCxPQUFPLE9BQU8sQ0FBQztJQUNoQixDQUFDO0lBRUQsU0FBUyxpQkFBaUIsQ0FBQyxLQUFtQjtRQUM3QyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsSUFBSSxFQUFFLEdBQUksS0FBYSxDQUFDLFFBQVEsQ0FBZ0IsQ0FBQztRQUNqRCxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDMUIsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQztZQUN6QyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ3JCLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqRCxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUNwQixVQUFVLEVBQ1YsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQzNCLENBQUM7SUFDSCxDQUFDO0lBRUQsU0FBUyxjQUFjLENBQUMsS0FBbUI7UUFDMUMsSUFBSSxZQUFZLEdBQUcsV0FBVyxFQUFFLENBQUM7UUFDakMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLHlEQUNpQyxZQUFZLDhFQUVwQyxZQUFZLDRIQUVOLFlBQVksK0hBRWIsWUFBWSw0RUFDWixZQUFZLGlMQUNaLFlBQVksMkpBQy9CLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxpQkFBZSxZQUFjLENBQUMsQ0FBQyxFQUFFLENBQUMseUJBQXlCLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDL0UsQ0FBQyxDQUFDLGlCQUFlLFlBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3JGLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQ3BCLFVBQVUsRUFDVixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FDM0IsQ0FBQztJQUNILENBQUM7SUFFRCxDQUFDLENBQUM7UUFDRCxZQUFZLENBQUM7UUFDYixjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQyxDQUFDO0FBRUosQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZWZhdWx0IGFzICQgfSBmcm9tIFwianF1ZXJ5XCI7XHJcblxyXG4oZnVuY3Rpb24gKCQ6IEpRdWVyeVN0YXRpYykge1xyXG5cclxuXHR2YXIgaW5kZXhNYXAgPSBuZXcgTWFwPE51bWJlciwgYm9vbGVhbj4oKTtcclxuXHJcblx0ZnVuY3Rpb24gZ2V0VW51c2VkSUQoKSB7XHJcblx0XHRsZXQgY3VycmVudCA9IDA7XHJcblx0XHRmb3IgKDsgY3VycmVudCA8IGluZGV4TWFwLnNpemU7IGN1cnJlbnQrKylcclxuXHRcdFx0aWYgKGluZGV4TWFwLmdldChjdXJyZW50KSAhPT0gdHJ1ZSkgcmV0dXJuIGN1cnJlbnQ7XHJcblx0XHRyZXR1cm4gY3VycmVudDtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHJlbW92ZUJ1dHRvblByZXNzKGV2ZW50OiBKUXVlcnkuRXZlbnQpIHtcclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRsZXQgZWwgPSAoZXZlbnQgYXMgYW55KVtcInRhcmdldFwiXSBhcyBIVE1MRWxlbWVudDtcclxuXHRcdGxldCByb290ID0gJChlbCkucGFyZW50KCk7XHJcblx0XHR3aGlsZSAocm9vdCAmJiAhcm9vdC5oYXNDbGFzcyhcImRhdGUtdGltZVwiKSlcclxuXHRcdFx0cm9vdCA9IHJvb3QucGFyZW50KClcclxuXHRcdGxldCBpZCA9IE51bWJlcihyb290WzBdLmlkLnJlcGxhY2UoXCJ0aW1lLVwiLCBcIlwiKSk7XHJcblx0XHRpbmRleE1hcC5zZXQoaWQsIGZhbHNlKTtcclxuXHRcdHJvb3QucmVtb3ZlKCk7XHJcblx0XHQkKFwiLnN1Yi1idXR0b25cIikucHJvcChcclxuXHRcdFx0XCJkaXNhYmxlZFwiLFxyXG5cdFx0XHQkKFwiLmRhdGUtdGltZVwiKS5sZW5ndGggPD0gMVxyXG5cdFx0KTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGFkZEJ1dHRvblByZXNzKGV2ZW50OiBKUXVlcnkuRXZlbnQpIHtcclxuXHRcdGxldCBjdXJyZW50SW5kZXggPSBnZXRVbnVzZWRJRCgpO1xyXG5cdFx0aW5kZXhNYXAuc2V0KGN1cnJlbnRJbmRleCwgdHJ1ZSk7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0bGV0IHJvb3QgPSAkKFwiI3N1Ym1pdFwiKTtcclxuXHRcdHJvb3QuYmVmb3JlKGBcclxuXHRcdDxkaXYgY2xhc3M9XCJkYXRlLXRpbWUgZm9ybS1ncm91cFwiIGlkPVwidGltZS0ke2N1cnJlbnRJbmRleH1cIj5cclxuXHRcdFx0PGxhYmVsIGZvcj1cImRhdGVcIj5EYXRlPC9sYWJlbD5cclxuXHRcdFx0PGlucHV0IG5hbWU9XCJkYXRlLSR7Y3VycmVudEluZGV4fVwiIGlkPVwiZGF0ZVwiIHR5cGU9XCJkYXRlXCIgLz5cclxuXHRcdFx0PGxhYmVsIGZvcj1cInRpbWUtc3RhcnRcIj5TdGFydCBUaW1lPC9sYWJlbD5cclxuXHRcdFx0PGlucHV0IG5hbWU9XCJ0aW1lLXN0YXJ0LSR7Y3VycmVudEluZGV4fVwiIGlkPVwidGltZS1zdGFydFwiIHR5cGU9XCJ0aW1lXCIgLz5cclxuXHRcdFx0PGxhYmVsIGZvcj1cInRpbWUtc3RvcFwiPlN0b3AgVGltZTwvbGFiZWw+XHJcblx0XHRcdDxpbnB1dCBuYW1lPVwidGltZS1zdG9wLSR7Y3VycmVudEluZGV4fVwiIGlkPVwidGltZS1zdG9wXCIgdHlwZT1cInRpbWVcIiAvPlxyXG5cdFx0XHQ8YnV0dG9uIGlkPVwiYWRkLWJ1dHRvbi0ke2N1cnJlbnRJbmRleH1cIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJhZGQtYnV0dG9uIGJ0biBidG4tb3V0bGluZS1wcmltYXJ5IGJ0bi1zbVwiPjxzcGFuIGNsYXNzPVwiYWRkLWljb24gZGFzaGljb25zIGRhc2hpY29ucy1wbHVzXCI+PC9zcGFuPjwvYnV0dG9uPlxyXG5cdFx0XHQ8YnV0dG9uIGlkPVwic3ViLWJ1dHRvbi0ke2N1cnJlbnRJbmRleH1cIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzdWItYnV0dG9uIGJ0biBidG4tb3V0bGluZS1wcmltYXJ5IGJ0bi1zbVwiPjxzcGFuIGNsYXNzPVwic3ViLWljb24gZGFzaGljb25zIGRhc2hpY29ucy1taW51c1wiPjwvc3Bhbj48L2J1dHRvbj5cclxuXHRcdDwvZGl2PmApO1xyXG5cdFx0JChgI2FkZC1idXR0b24tJHtjdXJyZW50SW5kZXh9YCkub24oXCJjbGljay5nZy5hZGRCdXR0b25QcmVzc1wiLCBhZGRCdXR0b25QcmVzcyk7XHJcblx0XHQkKGAjc3ViLWJ1dHRvbi0ke2N1cnJlbnRJbmRleH1gKS5vbihcImNsaWNrLmdnLnJlbW92ZUJ1dHRvblByZXNzXCIsIHJlbW92ZUJ1dHRvblByZXNzKTtcclxuXHRcdCQoXCIuc3ViLWJ1dHRvblwiKS5wcm9wKFxyXG5cdFx0XHRcImRpc2FibGVkXCIsXHJcblx0XHRcdCQoXCIuZGF0ZS10aW1lXCIpLmxlbmd0aCA8PSAxXHJcblx0XHQpO1xyXG5cdH1cclxuXHJcblx0JChmdW5jdGlvbiAoKSB7XHJcblx0XHQndXNlIHN0cmljdCc7XHJcblx0XHRhZGRCdXR0b25QcmVzcyhqUXVlcnkuRXZlbnQoXCJsb2FkXCIpKTtcclxuXHR9KTtcclxuXHJcbn0pKGpRdWVyeSk7XHJcbiJdfQ==\n\n//# sourceURL=webpack:///./js/src/create-shows.ts?");

/***/ })

/******/ });