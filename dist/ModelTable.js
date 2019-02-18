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
var moment_1 = __importDefault(require("moment"));
var react_1 = __importDefault(require("react"));
var Button_1 = __importDefault(require("react-bootstrap/lib/Button"));
var Checkbox_1 = __importDefault(require("react-bootstrap/lib/Checkbox"));
var Glyphicon_1 = __importDefault(require("react-bootstrap/lib/Glyphicon"));
var OverlayTrigger_1 = __importDefault(require("react-bootstrap/lib/OverlayTrigger"));
var Table_1 = __importDefault(require("react-bootstrap/lib/Table"));
var Tooltip_1 = __importDefault(require("react-bootstrap/lib/Tooltip"));
require("./styles/table.css");
var TablePagination_1 = __importDefault(require("./TablePagination"));
var ModelTable = /** @class */ (function (_super) {
    __extends(ModelTable, _super);
    function ModelTable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ModelTable.prototype.isSelected = function (id) {
        var selected = this.props.selected;
        return (Array.isArray(selected) ? selected : [])
            .includes(id);
    };
    ModelTable.prototype.renderRow = function (item) {
        var isSelected = this.isSelected(item._id);
        var _a = this.props, onSelect = _a.onSelect, selected = _a.selected;
        var selectable = onSelect !== null;
        var onSelectEvent = function (event) {
            if (selectable && onSelect) {
                if (Array.isArray(selected)) {
                    var index = selected.findIndex(function (o) { return item && o === item._id; });
                    if (index === -1 && item) {
                        selected.push(item._id);
                    }
                    else {
                        selected.splice(index, 1);
                    }
                }
                onSelect(event, selected);
            }
        };
        var columns = this.props.columnData.map(function (column) {
            var onClick = column.onClick, id = column.id, format = column.format;
            var isButton = typeof onClick === "function";
            var isFormatted = typeof format === "function";
            var value = item[id];
            var isDate = ((typeof value === "string" && !isNaN(Date.parse(value))) ||
                (typeof value === "number")) && moment_1.default(value)
                .isValid();
            var key = "" + item._id + id;
            var content = null;
            if (isFormatted && format) {
                content = format(item, value);
            }
            else if (isDate) {
                content = moment_1.default(value)
                    .format("LLL");
            }
            else {
                content = "" + value;
            }
            if (isButton && onClick) {
                return (react_1.default.createElement("td", { key: key },
                    react_1.default.createElement(Button_1.default, { onClick: function (event) { return onClick(event, item); } }, content)));
            }
            return (react_1.default.createElement("td", { key: key }, content));
        });
        // TODO: Create classes for selected and unselected?
        return (react_1.default.createElement("tr", { key: item._id, id: item._id, "aria-checked": isSelected },
            selectable && (react_1.default.createElement("td", null,
                react_1.default.createElement(Checkbox_1.default, { checked: isSelected ? isSelected : undefined, onClick: onSelectEvent }))),
            columns));
    };
    ModelTable.prototype.renderTableHeader = function () {
        var _a = this.props, onRequestSort = _a.onRequestSort, order = _a.order, models = _a.models, orderBy = _a.orderBy, columnData = _a.columnData, selected = _a.selected, onSelectAll = _a.onSelectAll;
        var itemsLength = Array.isArray(models) ? models.length : null;
        var numSelected = Array.isArray(selected) ? selected.length : null;
        return (react_1.default.createElement("thead", null,
            react_1.default.createElement("tr", null,
                (typeof numSelected === "number" &&
                    typeof onSelectAll === "function") && (react_1.default.createElement("th", null,
                    react_1.default.createElement(Checkbox_1.default, { checked: numSelected === itemsLength, onChange: function (event) {
                            return onSelectAll(event, numSelected !== itemsLength);
                        } }))),
                columnData.map(function (column) {
                    var sortable = column.sortable !== null && column.sortable;
                    var content = null;
                    if (sortable) {
                        var showSort = orderBy === column.id;
                        var orderBool = order === "asc";
                        var click_1 = showSort && !orderBool ? "asc" : "desc";
                        var glyph = orderBool ? "glyphicon glyphicon-arrow-up" : "glyphicon glyphicon-arrow-down";
                        var tooltipString = "Sort descending";
                        if (showSort && !orderBool) {
                            tooltipString = "Sort ascending";
                        }
                        content = (react_1.default.createElement(OverlayTrigger_1.default, { placement: "top", overlay: (react_1.default.createElement(Tooltip_1.default, { id: column.id + "SortTooltip" }, tooltipString)) },
                            react_1.default.createElement(Button_1.default, { bsStyle: "default", onClick: function (event) {
                                    return onRequestSort(event, orderBy, click_1);
                                } },
                                showSort && react_1.default.createElement(Glyphicon_1.default, { glyph: glyph }),
                                column.label)));
                    }
                    else {
                        content = column.label;
                    }
                    return (react_1.default.createElement("th", { key: column.id }, content));
                }))));
    };
    ModelTable.prototype.render = function () {
        var self = this;
        var _a = this.props, models = _a.models, rowsPerPage = _a.rowsPerPage, rowsPerPageOptions = _a.rowsPerPageOptions, page = _a.page, onPageChange = _a.onPageChange, onRowsPerPageChange = _a.onRowsPerPageChange;
        var array = Array.from(models || []);
        var arrayLength = array.length;
        if (arrayLength === 0) {
            return (react_1.default.createElement("div", null,
                react_1.default.createElement("h1", null, "Empty!"),
                react_1.default.createElement("p", null, "There's no point in showing a table if it's going to be empty.")));
        }
        var items = array.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        var rowElements = items.map(function (item) { return self.renderRow(item); });
        var onPageChangeCallback = function (event, value) {
            return onPageChange(event, value);
        };
        var onRowsPerPageChangeCallback = function (event, value) {
            return onRowsPerPageChange(event, value);
        };
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Table_1.default, null,
                this.renderTableHeader(),
                react_1.default.createElement("tbody", null, rowElements)),
            react_1.default.createElement(TablePagination_1.default, { page: page, count: arrayLength, rowsPerPage: rowsPerPage, rowsPerPageOptions: rowsPerPageOptions, onChangePage: onPageChangeCallback, onChangeRowsPerPage: onRowsPerPageChangeCallback })));
    };
    return ModelTable;
}(react_1.default.Component));
exports.default = ModelTable;
//# sourceMappingURL=ModelTable.js.map