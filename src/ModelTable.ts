import { RESTModel } from "gig-gizmo-sdk";
import Button from "react-bootstrap/lib/Button";
import Checkbox from "react-bootstrap/lib/Checkbox";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import OverlayTrigger from "react-bootstrap/lib/OverlayTrigger";
import Table from "react-bootstrap/lib/Table";
import Tooltip from "react-bootstrap/lib/Tooltip";

import Plugin from "./index";
import "./styles/table.css";
import { TablePagination } from "./TablePagination";

export interface ColumnData {
	onClick: ((event: any, item: any) => void) | null;
	id: string;
	format: ((n: any, v: any) => any) | null;
	label: string;
}

interface ModelTableProps {
	selected: string[] | null;
	columnData: ColumnData[];
	models: RESTModel[];
	order: string;
	orderBy: string;
	rowsPerPage: number;
	rowsPerPageOptions: number[];
	page: number;
	onSelect: ((event: any, selected: string[] | null) => void) | null;
	onSelectAll: ((event: any, checked: boolean) => void) | null;
	onRequestSort: (event: any, orderBy: string, dir: string) => void;
	onPageChange: (event: any, page: number) => void;
	onRowsPerPageChange: (event: any, rows: number) => void;
}

export class ModelTable
	extends Plugin.React.Component<ModelTableProps, {}> {

	public isSelected(id: string) {
		const selected = this.props.selected;
		return (Array.isArray(selected) ? selected : [])
			.includes(id);
	}

	public renderRow(item: any) {
		const isSelected = this.isSelected(item._id);
		const {
			onSelect,
			selected
		} = this.props;
		const selectable = onSelect !== null;
		const onSelectEvent = (event: any) => {
			if (selectable && onSelect) {
				if (Array.isArray(selected)) {
					const index = selected.findIndex((o: string) => item && o === item._id);
					if (index === -1 && item) {
						selected.push(item._id);
					} else {
						selected.splice(index, 1);
					}
				}
				onSelect(event, selected);
			}
		};
		const columns = this.props.columnData.map((column: ColumnData) => {
			const { onClick, id, format } = column;
			const isButton = typeof onClick === "function";
			const isFormatted = typeof format === "function";
			const value = item[id];
			const valueType = typeof value;
			const isDate =
				((valueType === "string" || valueType === "number") &&
					!isNaN(Date.parse(value))) ||
				(value instanceof Date && !isNaN(value.valueOf()));
			const key = `${item._id}${id}`;
			let content = null;
			if (isFormatted && format) {
				content = format(item, value);
			} else if (isDate) {
				const date = (value instanceof Date && !isNaN(value.valueOf())) ?
					value :
					new Date(value);
				content = date.toLocaleString();
			} else {
				content = `${value}`;
			}
			if (isButton && onClick) {
				return Plugin.React.createElement(
					"td", { key, children: [
						Plugin.React.createElement(
							Button, {
								onClick: (event: any) => onClick(event, item),
								children: content
							}
						)
					]}
				);
			}
			return Plugin.React.createElement(
				"td", { key, children: [content] }
			);
		});
		// TODO: Create classes for selected and unselected?

		return Plugin.React.createElement(
			"tr", {
				"key": item._id,
				"id": item._id,
				"aria-checked": isSelected,
				"children": [
					...(selectable ? [
						Plugin.React.createElement(
							"td", {
								children: [
									Plugin.React.createElement(
										Checkbox, {
											checked: isSelected ? isSelected : undefined,
											onClick: onSelectEvent
										}
									)
								]
							}
						)
					] : []),
					columns
				]
			}
		);
	}

	public renderTableHeader() {
		const {
			onRequestSort,
			order,
			models,
			orderBy,
			columnData,
			selected,
			onSelectAll
		} = this.props;
		const itemsLength = Array.isArray(models) ? models.length : null;
		const numSelected = Array.isArray(selected) ? selected.length : null;
		return Plugin.React.createElement(
			"thead", {
				children: [
					Plugin.React.createElement(
						"tr", {
							children: [
								...(
									typeof numSelected === "number" &&
									typeof onSelectAll === "function" ?
										[Plugin.React.createElement(
											"th", {
												children: [
													Plugin.React.createElement(
														Checkbox, {
															checked: numSelected === itemsLength,
															onChange: (
																(event: any) =>
																	onSelectAll(event, numSelected !== itemsLength)
															)
														}
													)
												]
											}
										)] : []
								),
								(
									columnData.map((column: any) => {
										const sortable =
											column.sortable !== null && column.sortable;
										let content = null;
										if (sortable) {
											const showSort = orderBy === column.id;
											const orderBool = order === "asc";
											const click = showSort && !orderBool ? "asc" : "desc";
											const glyph = orderBool ?
												"glyphicon glyphicon-arrow-up" :
												"glyphicon glyphicon-arrow-down";
											let tooltipString = "Sort descending";
											if (showSort && !orderBool) {
												tooltipString = "Sort ascending";
											}
											content = Plugin.React.createElement(
												OverlayTrigger, {
													placement: "top",
													overlay: Plugin.React.createElement(
														Tooltip, {
															id: `${column.id}SortTooltip`,
															children: tooltipString
														}
													),
													children: [
														Plugin.React.createElement(
															Button, {
																bsStyle: "default",
																onClick: (event: any) =>
																	onRequestSort(event, orderBy, click),
																children: [
																	...(showSort ? [
																		Plugin.React.createElement(
																			Glyphicon, {
																				glyph
																			}
																		)
																	] : []),
																	column.label
																]
															}
														)
													]
												}
											);
										} else {
											content = column.label;
										}
										return Plugin.React.createElement(
											"th", {
												key: column.id,
												children: [content]
											}
										);
									})
								)
							]
						}
					)
				]
			}
		);
	}

	public render(): React.ReactElement {
		const self = this;
		const {
			models,
			rowsPerPage,
			rowsPerPageOptions,
			page,
			onPageChange,
			onRowsPerPageChange
		} = this.props;

		const array = Array.from(models || []);
		const arrayLength = array.length;
		if (arrayLength === 0) {
			return Plugin.React.createElement(
				"div", {
					children: [
						Plugin.React.createElement(
							"h1", {children: ["Empty!"]}
						),
						Plugin.React.createElement(
							"p", {
								children: [
									"There's no point in showing a table if it's going to be empty."
								]
							}
						)
					]
				}
			);
		}

		const items = array.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
		const rowElements = items.map(
			(item: any) => self.renderRow(item)
		);

		const onPageChangeCallback =
			(event: any, value: number) =>
				onPageChange(event, value);
		const onRowsPerPageChangeCallback =
			(event: any, value: number) =>
				onRowsPerPageChange(event, value);
		return Plugin.React.createElement(
			Plugin.React.Fragment, {
				children: [
					Plugin.React.createElement(
						Table, {
							children: [
								this.renderTableHeader(),
								Plugin.React.createElement(
									"tbody", { children: [rowElements] }
								)
							]
						}
					),
					Plugin.React.createElement(
						TablePagination, {
							page,
							count: arrayLength,
							rowsPerPage,
							rowsPerPageOptions,
							onChangePage: onPageChangeCallback,
							onChangeRowsPerPage: onRowsPerPageChangeCallback
						}
					)
				]
			}
		);
	}
}
