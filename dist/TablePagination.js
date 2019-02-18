"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var ControlLabel_1 = __importDefault(require("react-bootstrap/lib/ControlLabel"));
var Form_1 = __importDefault(require("react-bootstrap/lib/Form"));
var FormControl_1 = __importDefault(require("react-bootstrap/lib/FormControl"));
var FormGroup_1 = __importDefault(require("react-bootstrap/lib/FormGroup"));
var Pager_1 = __importDefault(require("react-bootstrap/lib/Pager"));
require("./styles/TablePagination.css");
var TablePagination = /** @class */ (function (_super) {
    __extends(TablePagination, _super);
    function TablePagination() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TablePagination.prototype, "pages", {
        get: function () {
            var _a = this.props, count = _a.count, rowsPerPage = _a.rowsPerPage;
            return Math.trunc(count / rowsPerPage) + // Page count
                (count % rowsPerPage !== 0 ? 1 : 0); // Extra page
        },
        enumerable: true,
        configurable: true
    });
    TablePagination.prototype.renderRowPerPageItems = function () {
        return this.props.rowsPerPageOptions.map(function (item) {
            return react_1.default.createElement("option", { key: item.toString(), value: item }, item);
        });
    };
    TablePagination.prototype.renderPageItems = function () {
        var items = [];
        for (var i = 0; i < this.pages; i++) {
            items.push(react_1.default.createElement("option", { key: i, value: i }, (i + 1).toString()));
        }
        return items;
    };
    TablePagination.prototype.nextPage = function (event) {
        var _a = this.props, onChangePage = _a.onChangePage, page = _a.page;
        onChangePage(event, Math.min(this.pages, page + 1));
    };
    TablePagination.prototype.lastPage = function (event) {
        var _a = this.props, onChangePage = _a.onChangePage, page = _a.page;
        onChangePage(event, Math.max(0, page - 1));
    };
    TablePagination.prototype.render = function () {
        var self = this;
        var _a = this.props, rowsPerPage = _a.rowsPerPage, page = _a.page, onChangePage = _a.onChangePage, onChangeRowsPerPage = _a.onChangeRowsPerPage;
        var onRowsPerPageChange = function (event) { return onChangeRowsPerPage(event, event.target.value); };
        var onPageChange = function (event) { return onChangePage(event, event.target.value); };
        var onNextPage = function (event) { return self.nextPage(event); };
        var onLastPage = function (event) { return self.lastPage(event); };
        return (react_1.default.createElement(Pager_1.default, null,
            react_1.default.createElement(Pager_1.default.Item, { previous: true, onClick: onLastPage, disabled: 0 >= page }, "\u2190 Previous Page"),
            react_1.default.createElement(Form_1.default, { inline: true, className: "pagination-settings-container" },
                react_1.default.createElement(FormGroup_1.default, { controlId: "page" },
                    react_1.default.createElement(ControlLabel_1.default, null, "Page"),
                    react_1.default.createElement(FormControl_1.default, { type: "select", componentClass: "select", value: page, onChange: onPageChange }, this.renderPageItems())),
                react_1.default.createElement(FormGroup_1.default, { controlId: "rowsPerPage" },
                    react_1.default.createElement(ControlLabel_1.default, null, "Items Per Page"),
                    react_1.default.createElement(FormControl_1.default, { type: "select", componentClass: "select", value: rowsPerPage, onChange: onRowsPerPageChange }, this.renderRowPerPageItems()))),
            react_1.default.createElement(Pager_1.default.Item, { next: true, onClick: onNextPage, disabled: this.pages > page }, "Next Page \u2192")));
    };
    return TablePagination;
}(react_1.default.Component));
exports.default = TablePagination;
//# sourceMappingURL=TablePagination.js.map