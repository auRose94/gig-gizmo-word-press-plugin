import { BandButton, BandButtonProps } from "./BandButton";
import { GigButton, GigButtonProps } from "./GigButton";
import { ShowTable, ShowTableProps } from "./ShowTable";
import { VenueButton, VenueButtonProps } from "./VenueButton";

interface PluginConfig {
	showTable: ShowTableProps;
}

export default class Plugin {
	public static React: any;
	public static ReactDOM: any;
	public static Config: PluginConfig;
	public static widgets: {
		ShowTable: {
			new: () => ({
				render: (id: string, args: ShowTableProps) => JSX.Element;
			});
		};
		BandButton: {
			new: () => ({
				render: (args: BandButtonProps) => JSX.Element;
			});
		};
		VenueButton: {
			new: () => ({
				render: (args: VenueButtonProps) => JSX.Element;
			});
		};
		GigButton: {
			new: () => ({
				render: (args: GigButtonProps) => JSX.Element;
			});
		};
	};
	public static config(config: PluginConfig): void;
}
