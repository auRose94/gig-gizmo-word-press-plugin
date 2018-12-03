
type ColumnData = {
  onClick: Function | null,
	id: string,
	format: ((n: any, v: any) => any) | null,
  label: string
};
