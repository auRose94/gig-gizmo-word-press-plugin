import * as React from "react";
import * as PropTypes from "prop-types";
import * as moment from "moment";
import * as Table from "react-bootstrap/lib/Table";
import * as Button from "react-bootstrap/lib/Button";
import * as Checkbox from "react-bootstrap/lib/Checkbox";
import * as OverlayTrigger from "react-bootstrap/lib/OverlayTrigger";
import * as Tooltip from "react-bootstrap/lib/Tooltip";
import * as Glyphicon from "react-bootstrap/lib/Glyphicon";
import { RESTModel } from "gig-gizmo-sdk";

import TablePagination from "./TablePagination";
import "./ColumnData";
import "./styles/table.css";

type ModelTableProps = {
	selected: string[],
	columnData: ColumnData[],
	models: RESTModel[],
	order: string,
	orderBy: string,
	rowsPerPage: number,
	rowsPerPageOptions: number[],
	page: number,
	onSelect: Function | null,
	onSelectAll: Function | null,
	onPageChange: Function,
	onRowsPerPageChange: Function,
	onRequestSort: Function
};

export default class ModelTable
	extends React.Component<ModelTableProps> {

	isSelected(id: string) {
		const selected = this.props.selected;
		return (Array.isArray(selected) ? selected : [])
			.includes(id);
	}

	renderRow(item: any) {
		const isSelected = this.isSelected(item._id);
		const {
			onSelect,
			selected
		} = this.props;
		const selectable = onSelect !== null;
		const onSelectEvent = (event: any) => {
			if (selectable) {
				const index = selected.findIndex((o: string) => o === item._id);
				if (index === -1)
					selected.push(item._id);
				else
					selected.splice(index, 1);
				onSelect(event, selected);
			}
		};
		const columns = this.props.columnData.map((column: ColumnData) => {
			const { onClick, id, format } = column;
			const isButton = typeof onClick === "function";
			const isFormatted = typeof format === "function";
			const value = item[id];
			let isDate =
				(
					(typeof value === "string" && !isNaN(Date.parse(value))) ||
					(typeof value === "number")
				) && moment(value)
				.isValid();
			const key = `${item._id}${id}`;
			let content = null;
			if (isFormatted) {
				content = format(item, value);
			} else if (isDate) {
				content = moment(value)
					.format("LLL");
			} else {
				content = `${value}`;
			}
			if (isButton)
				return (
					<td key={key}>
						<Button onClick={event => onClick(event, item)}>
							{content}
						</Button>
					</td>
				);
			return (
				<td key={key}>
					{content}
				</td>
			);
		});
		//TODO: Create classes for selected and unselected?

		return (
			<tr
				key={item._id}
				id={item._id}
				aria-checked={isSelected}
				>
				{selectable && (
					<td>
						<Checkbox
							checked={isSelected ? isSelected : undefined}
							onClick={onSelectEvent}/>
					</td>
				)}
				{columns}
			</tr>
		);
	}

	renderTableHeader() {
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
		return (
			<thead>
				<tr>
					{(
						typeof numSelected === "number" &&
						typeof onSelectAll === "function"
					) && (
						<th>
							<Checkbox
								checked={numSelected === itemsLength}
								onChange={event =>
									onSelectAll(event, numSelected !== itemsLength)
								}
							/>
						</th>
					)}
					{columnData.map(
						(column: any) => {
							const sortable = column.sortable !== null && column.sortable;
							let content = null;
							if(sortable) {
								const showSort = orderBy === column.id;
								const orderBool = order === "asc";
								const click = showSort && !orderBool ? "asc" : "desc";
								const glyph = orderBool ? "glyphicon glyphicon-arrow-up" : "glyphicon glyphicon-arrow-down";
								let tooltipString = "Sort descending";
								if(showSort && !orderBool) tooltipString = "Sort ascending";
								content = (
									<OverlayTrigger
										placement="top"
										overlay={(
											<Tooltip id={`${column.id}SortTooltip`}>
												{tooltipString}
											</Tooltip>
										)}>
										<Button
											bsStyle="default"
											onClick={event =>
												onRequestSort(event, orderBy, click)
											}>
												{showSort && <Glyphicon glyph={glyph}/>}
												{column.label}
										</Button>
									</OverlayTrigger>
								);
							}
							else
								content = column.label;
							return (
								<th key={column.id}>
									{content}
								</th>
							);
						}
					)}
				</tr>
			</thead>
		);
	}

	render() {
		const self = this;
		const {
			selected,
			models,
			order,
			orderBy,
			rowsPerPage,
			rowsPerPageOptions,
			onSelectAll,
			page,
			columnData,
			onPageChange,
			onRowsPerPageChange,
			onRequestSort
		} = this.props;

		const array = Array.from(models || []);
		const arrayLength = array.length;
		if (arrayLength == 0) {
			return (
				<div>
					<h1>{ `Empty!` }</h1>
					<p>{
							`There's no point in showing a table if it's going to be empty.`
						}</p>
				</div>
			);
		}

		const items = array.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
		const rowElements = items.map((item: RESTModel) => self.renderRow(item));
		const numSelected = Array.isArray(selected) ? selected.length : null;

		const onPageChangeCallback =
			(event: any, value: number) =>
				onPageChange(event, value);
		const onRequestSortCallback =
			(event: any, orderBy: string, order: string) =>
				onRequestSort(event, orderBy, order);
		const onRowsPerPageChangeCallback =
			(event: any, value: number) =>
				onRowsPerPageChange(event, value);
		return (
			<React.Fragment>
				<Table>
					{this.renderTableHeader()}
					<tbody>{rowElements}</tbody>
				</Table>
				<TablePagination
					page={page}
					count={arrayLength}
					rowsPerPage={rowsPerPage}
					rowsPerPageOptions={rowsPerPageOptions}
					onChangePage={onPageChangeCallback}
					onChangeRowsPerPage={onRowsPerPageChangeCallback}
				/>
			</React.Fragment>
		);
	}
}
