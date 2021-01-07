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
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n(function ($) {\n    var indexMap = new Map();\n    function getUnusedID() {\n        var current = 0;\n        for (var ind in indexMap.keys()) {\n            var int = Number.parseInt(ind);\n            if (current == int)\n                current = int + 1;\n            if (!indexMap.has(current))\n                break;\n        }\n        return current;\n    }\n    function registerID(id) {\n        indexMap.set(id, true);\n    }\n    function removeButtonPress(event, el) {\n        event.preventDefault();\n        $(el).parent().remove();\n        $(\".sub-button\").prop(\"disabled\", $(\".date-time\").length <= 1);\n    }\n    function addButtonPress(event, el) {\n        var currentIndex = getUnusedID();\n        registerID(currentIndex);\n        event.preventDefault();\n        $(el).parent().after(\"\\n\\t\\t<div class=\\\"date-time form-group\\\">\\n\\t\\t\\t<label for=\\\"date\\\">Date</label>\\n\\t\\t\\t<input name=\\\"date-\" + currentIndex + \"\\\" id=\\\"date\\\" type=\\\"date\\\" />\\n\\t\\t\\t<label for=\\\"time-start\\\">Start Time</label>\\n\\t\\t\\t<input name=\\\"time-start-\" + currentIndex + \"\\\" id=\\\"time-start\\\" type=\\\"time\\\" />\\n\\t\\t\\t<label for=\\\"time-stop\\\">Stop Time</label>\\n\\t\\t\\t<input name=\\\"time-stop-\" + currentIndex + \"\\\" id=\\\"time-stop\\\" type=\\\"time\\\" />\\n\\t\\t\\t<button id=\\\"add-button\\\" type=\\\"button\\\" class=\\\"add-button btn btn-outline-primary btn-sm\\\"><span class=\\\"add-icon dashicons dashicons-plus\\\"></span></button>\\n\\t\\t\\t<button id=\\\"sub-button\\\" type=\\\"button\\\" class=\\\"sub-button btn btn-outline-primary btn-sm\\\"><span class=\\\"sub-icon dashicons dashicons-minus\\\"></span></button>\\n\\t\\t</div>\");\n        $(\".add-button\").on(\"click\", addButtonPress);\n        $(\".sub-button\").on(\"click\", removeButtonPress);\n        $(\".sub-button\").prop(\"disabled\", $(\".date-time\").length <= 1);\n    }\n    $(function () {\n        'use strict';\n        $(\"#sub-button\").prop(\"disabled\", true);\n        $(\"#add-button\").on(\"click\", addButtonPress);\n    });\n})(jQuery);\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXNob3dzLmpzIiwic291cmNlUm9vdCI6Ii4vanMvc3JjLyIsInNvdXJjZXMiOlsiY3JlYXRlLXNob3dzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsQ0FBQyxVQUFVLENBQWU7SUFFekIsSUFBSSxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQW1CLENBQUM7SUFFMUMsU0FBUyxXQUFXO1FBQ25CLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNoQixLQUFLLElBQUksR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNoQyxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQy9CLElBQUksT0FBTyxJQUFJLEdBQUc7Z0JBQ2pCLE9BQU8sR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztnQkFDekIsTUFBTTtTQUNQO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDaEIsQ0FBQztJQUVELFNBQVMsVUFBVSxDQUFDLEVBQVU7UUFDN0IsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELFNBQVMsaUJBQWlCLENBQUMsS0FBbUIsRUFBRSxFQUFlO1FBQzlELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDeEIsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FDcEIsVUFBVSxFQUNWLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUMzQixDQUFDO0lBQ0gsQ0FBQztJQUVELFNBQVMsY0FBYyxDQUFDLEtBQW1CLEVBQUUsRUFBZTtRQUMzRCxJQUFJLFlBQVksR0FBRyxXQUFXLEVBQUUsQ0FBQztRQUNqQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDekIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsa0hBR0EsWUFBWSw0SEFFTixZQUFZLCtIQUViLFlBQVksc1lBRy9CLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FDcEIsVUFBVSxFQUNWLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUMzQixDQUFDO0lBQ0gsQ0FBQztJQUVELENBQUMsQ0FBQztRQUNELFlBQVksQ0FBQztRQUNiLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBRTlDLENBQUMsQ0FBQyxDQUFDO0FBRUosQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZWZhdWx0IGFzICQgfSBmcm9tIFwianF1ZXJ5XCI7XHJcblxyXG4oZnVuY3Rpb24gKCQ6IEpRdWVyeVN0YXRpYykge1xyXG5cclxuXHR2YXIgaW5kZXhNYXAgPSBuZXcgTWFwPE51bWJlciwgYm9vbGVhbj4oKTtcclxuXHJcblx0ZnVuY3Rpb24gZ2V0VW51c2VkSUQoKSB7XHJcblx0XHRsZXQgY3VycmVudCA9IDA7XHJcblx0XHRmb3IgKGxldCBpbmQgaW4gaW5kZXhNYXAua2V5cygpKSB7XHJcblx0XHRcdGxldCBpbnQgPSBOdW1iZXIucGFyc2VJbnQoaW5kKTtcclxuXHRcdFx0aWYgKGN1cnJlbnQgPT0gaW50KVxyXG5cdFx0XHRcdGN1cnJlbnQgPSBpbnQgKyAxO1xyXG5cdFx0XHRpZiAoIWluZGV4TWFwLmhhcyhjdXJyZW50KSlcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHRcdHJldHVybiBjdXJyZW50O1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gcmVnaXN0ZXJJRChpZDogTnVtYmVyKSB7XHJcblx0XHRpbmRleE1hcC5zZXQoaWQsIHRydWUpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gcmVtb3ZlQnV0dG9uUHJlc3MoZXZlbnQ6IEpRdWVyeS5FdmVudCwgZWw6IEhUTUxFbGVtZW50KSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0JChlbCkucGFyZW50KCkucmVtb3ZlKCk7XHJcblx0XHQkKFwiLnN1Yi1idXR0b25cIikucHJvcChcclxuXHRcdFx0XCJkaXNhYmxlZFwiLFxyXG5cdFx0XHQkKFwiLmRhdGUtdGltZVwiKS5sZW5ndGggPD0gMVxyXG5cdFx0KTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGFkZEJ1dHRvblByZXNzKGV2ZW50OiBKUXVlcnkuRXZlbnQsIGVsOiBIVE1MRWxlbWVudCkge1xyXG5cdFx0bGV0IGN1cnJlbnRJbmRleCA9IGdldFVudXNlZElEKCk7XHJcblx0XHRyZWdpc3RlcklEKGN1cnJlbnRJbmRleCk7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0JChlbCkucGFyZW50KCkuYWZ0ZXIoYFxyXG5cdFx0PGRpdiBjbGFzcz1cImRhdGUtdGltZSBmb3JtLWdyb3VwXCI+XHJcblx0XHRcdDxsYWJlbCBmb3I9XCJkYXRlXCI+RGF0ZTwvbGFiZWw+XHJcblx0XHRcdDxpbnB1dCBuYW1lPVwiZGF0ZS0ke2N1cnJlbnRJbmRleH1cIiBpZD1cImRhdGVcIiB0eXBlPVwiZGF0ZVwiIC8+XHJcblx0XHRcdDxsYWJlbCBmb3I9XCJ0aW1lLXN0YXJ0XCI+U3RhcnQgVGltZTwvbGFiZWw+XHJcblx0XHRcdDxpbnB1dCBuYW1lPVwidGltZS1zdGFydC0ke2N1cnJlbnRJbmRleH1cIiBpZD1cInRpbWUtc3RhcnRcIiB0eXBlPVwidGltZVwiIC8+XHJcblx0XHRcdDxsYWJlbCBmb3I9XCJ0aW1lLXN0b3BcIj5TdG9wIFRpbWU8L2xhYmVsPlxyXG5cdFx0XHQ8aW5wdXQgbmFtZT1cInRpbWUtc3RvcC0ke2N1cnJlbnRJbmRleH1cIiBpZD1cInRpbWUtc3RvcFwiIHR5cGU9XCJ0aW1lXCIgLz5cclxuXHRcdFx0PGJ1dHRvbiBpZD1cImFkZC1idXR0b25cIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJhZGQtYnV0dG9uIGJ0biBidG4tb3V0bGluZS1wcmltYXJ5IGJ0bi1zbVwiPjxzcGFuIGNsYXNzPVwiYWRkLWljb24gZGFzaGljb25zIGRhc2hpY29ucy1wbHVzXCI+PC9zcGFuPjwvYnV0dG9uPlxyXG5cdFx0XHQ8YnV0dG9uIGlkPVwic3ViLWJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInN1Yi1idXR0b24gYnRuIGJ0bi1vdXRsaW5lLXByaW1hcnkgYnRuLXNtXCI+PHNwYW4gY2xhc3M9XCJzdWItaWNvbiBkYXNoaWNvbnMgZGFzaGljb25zLW1pbnVzXCI+PC9zcGFuPjwvYnV0dG9uPlxyXG5cdFx0PC9kaXY+YCk7XHJcblx0XHQkKFwiLmFkZC1idXR0b25cIikub24oXCJjbGlja1wiLCBhZGRCdXR0b25QcmVzcyk7XHJcblx0XHQkKFwiLnN1Yi1idXR0b25cIikub24oXCJjbGlja1wiLCByZW1vdmVCdXR0b25QcmVzcyk7XHJcblx0XHQkKFwiLnN1Yi1idXR0b25cIikucHJvcChcclxuXHRcdFx0XCJkaXNhYmxlZFwiLFxyXG5cdFx0XHQkKFwiLmRhdGUtdGltZVwiKS5sZW5ndGggPD0gMVxyXG5cdFx0KTtcclxuXHR9XHJcblxyXG5cdCQoZnVuY3Rpb24gKCkge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cdFx0JChcIiNzdWItYnV0dG9uXCIpLnByb3AoXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuXHRcdCQoXCIjYWRkLWJ1dHRvblwiKS5vbihcImNsaWNrXCIsIGFkZEJ1dHRvblByZXNzKTtcclxuXHJcblx0fSk7XHJcblxyXG59KShqUXVlcnkpO1xyXG4iXX0=\n\n//# sourceURL=webpack:///./js/src/create-shows.ts?");

/***/ })

/******/ });