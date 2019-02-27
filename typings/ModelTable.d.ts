import {
	RESTModel
} from "gig-gizmo-sdk";
import React from "react";

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

export class ModelTable extends React.Component<ModelTableProps, {}> {
	public isSelected(id: string): boolean;
	public renderRow(item: any): JSX.Element;
	public renderTableHeader(): JSX.Element;
	public render(): JSX.Element;
}
