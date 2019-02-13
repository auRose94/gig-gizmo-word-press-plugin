
interface ColumnData {
	onClick: ((event: any, item: any) => void) | null;
	id: string;
	format: ((n: any, v: any) => any) | null;
	label: string;
}
