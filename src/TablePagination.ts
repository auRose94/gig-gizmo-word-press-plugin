import React from "react";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Form from "react-bootstrap/lib/Form";
import FormControl from "react-bootstrap/lib/FormControl";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Pager from "react-bootstrap/lib/Pager";

import "./styles/TablePagination.css";

interface TablePaginationProps {
	count: number;
	rowsPerPage: number;
	page: number;
	rowsPerPageOptions: number[];
	onChangePage: (event: any, page: number) => void;
	onChangeRowsPerPage: (event: any, rows: number) => void;
}

export class TablePagination
	extends React.Component<TablePaginationProps> {

	get pages() {
		const { count, rowsPerPage } = this.props;
		return Math.trunc(count / rowsPerPage) + // Page count
			(count % rowsPerPage !== 0 ? 1 : 0); // Extra page
	}

	public renderRowPerPageItems() {
		return this.props.rowsPerPageOptions.map((item: number) => {
			return React.createElement(
				"option", {
					key: item.toString(),
					value: item,
					children: [item]
				}
			);
		});
	}

	public renderPageItems() {
		const items = [];
		for (let i = 0; i < this.pages; i++) {
			items.push(
				React.createElement(
					"option", {
						key: i,
						value: i,
						children: [(i + 1).toString()]
					}
				)
			);
		}
		return items;
	}

	public nextPage(event: any) {
		const { onChangePage, page } = this.props;
		onChangePage(event, Math.min(this.pages, page + 1));
	}

	public lastPage(event: any) {
		const { onChangePage, page } = this.props;
		onChangePage(event, Math.max(0, page - 1));
	}

	public render(): JSX.Element {
		const self = this;
		const { rowsPerPage, page, onChangePage, onChangeRowsPerPage } = this.props;
		const onRowsPerPageChange =
			(event: any) => onChangeRowsPerPage(event, event.target.value);
		const onPageChange =
			(event: any) => onChangePage(event, event.target.value);
		const onNextPage = (event: any) => self.nextPage(event);
		const onLastPage = (event: any) => self.lastPage(event);
		return React.createElement(
			Pager, {
				children: [
					React.createElement(
						Pager.Item, {
							previous: true,
							onClick: onLastPage,
							disabled: 0 >= page,
							children: [
								"&larr; Previous Page"
							]
						}
					),
					React.createElement(
						Form, {
							inline: true,
							className: "pagination-settings-container",
							children: [
								React.createElement(
									FormGroup, {
										controlId: "page",
										children: [
											React.createElement(
												ControlLabel, {
													children: [
														"Page"
													]
												}
											),
											React.createElement(
												FormControl, {
													type: "select",
													componentClass: "select",
													value: page,
													onChange: onPageChange,
													children: this.renderPageItems()
												}
											)
										]
									}
								),
								React.createElement(
									FormGroup, {
										controlId: "rowsPerPage",
										children: [
											React.createElement(
												ControlLabel, {
													children: [
														"Items Per Page"
													]
												}
											),
											React.createElement(
												FormControl, {
													type: "select",
													componentClass: "select",
													value: rowsPerPage,
													onChange: onRowsPerPageChange,
													children: this.renderRowPerPageItems()
												}
											)
										]
									}
								)
							]
						}
					),
					React.createElement(
						Pager.Item, {
							next: true,
							onClick: onNextPage,
							disabled: this.pages > page,
							children: [
								"Next Page &rarr;"
							]
						}
					)
				]
			}
		);
	}
}
