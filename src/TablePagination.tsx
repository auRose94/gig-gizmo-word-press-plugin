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

export default class TablePagination
	extends React.Component<TablePaginationProps> {

	get pages() {
		const { count, rowsPerPage } = this.props;
		return Math.trunc(count / rowsPerPage) + // Page count
			(count % rowsPerPage !== 0 ? 1 : 0); // Extra page
	}

	public renderRowPerPageItems() {
		return this.props.rowsPerPageOptions.map((item: number) => {
			return <option key={item.toString()} value={item}>{item}</option>;
		});
	}

	public renderPageItems() {
		const items = [];
		for (let i = 0; i < this.pages; i++) {
			items.push(
				<option key={i} value={i}>{(i + 1).toString()}</option>
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

	public render(): React.ReactElement {
		const self = this;
		const { rowsPerPage, page, onChangePage, onChangeRowsPerPage } = this.props;
		const onRowsPerPageChange =
			(event: any) => onChangeRowsPerPage(event, event.target.value);
		const onPageChange =
			(event: any) => onChangePage(event, event.target.value);
		const onNextPage = (event: any) => self.nextPage(event);
		const onLastPage = (event: any) => self.lastPage(event);
		return (
			<Pager>
				<Pager.Item previous onClick={onLastPage} disabled={0 >= page}>
					&larr; Previous Page
				</Pager.Item>
				<Form inline className="pagination-settings-container">
					<FormGroup controlId="page">
						<ControlLabel>Page</ControlLabel>
						<FormControl
							type="select"
							componentClass="select"
							value={page}
							onChange={onPageChange}>
								{this.renderPageItems()}
						</FormControl>
					</FormGroup>
					<FormGroup controlId="rowsPerPage">
						<ControlLabel>Items Per Page</ControlLabel>
						<FormControl
							type="select"
							componentClass="select"
							value={rowsPerPage}
							onChange={onRowsPerPageChange}>
								{this.renderRowPerPageItems()}
						</FormControl>
					</FormGroup>
				</Form>
				<Pager.Item next onClick={onNextPage} disabled={this.pages > page}>
					Next Page &rarr;
				</Pager.Item>
			</Pager>
		);
	}
}
