import { Band, Gig, Upload, Venue } from "gig-gizmo-sdk";
import * as React from "react";
import { ColumnData, default as ModelTable } from "./ModelTable";

export interface ShowTableProps {
	band: string | undefined | null;
	venue: string | undefined | null;
	array: string[] | undefined | null;
}

interface ShowTableState {
	gigs: Gig[];
	band: Band | null;
	venue: Venue | null;
	bands: Map<string, Band | null>;
	venues: Map<string, Venue | null>;
	uploads: Map<string, Upload | null>;
	gigMap: Map<string, Gig | null>;
	order: string;
	orderBy: string;
	page: number;
	rowsPerPage: number;
	promises: Array<Promise<void>>;
	ready: boolean;
}

export default class ShowTable
	extends React.Component<ShowTableProps, ShowTableState> {
	public constructor(props: ShowTableProps);
	public componentDidMount(): Promise<void>;
	public reload(): Promise<void>;
	public handleRequestSort(_event: any, orderBy: string, order: string): void;
	public handleChangePage(_event: any, page: number): void;
	public handleChangeRowsPerPage(_event: any, rowsPerPage: number): void;
	public getColumnData(): ColumnData[];
	public render(): React.ReactElement;
}
