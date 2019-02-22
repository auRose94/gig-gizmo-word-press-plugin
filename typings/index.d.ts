
import { BandButtonProps, default as BandButton } from "./BandButton.d";
import { default as GigButton, GigButtonProps } from "./GigButton.d";
import { default as ShowTable, ShowTableProps } from "./ShowTable.d";
import { default as VenueButton, VenueButtonProps } from "./VenueButton.d";

interface PluginConfig {
	showTable: ShowTableProps;
}

export default class Plugin {
	public static Config: PluginConfig;
	public static widgets: {
		ShowTable: {
			new: () => ({
				render: (id: string, args: ShowTableProps) => HTMLElement;
			});
		};
		BandButton: {
			new: () => ({
				render: (args: BandButtonProps) => HTMLElement;
			});
		};
		VenueButton: {
			new: () => ({
				render: (args: VenueButtonProps) => HTMLElement;
			});
		};
		GigButton: {
			new: () => ({
				render: (args: GigButtonProps) => HTMLElement;
			});
		};
	};
	public static config(config: PluginConfig): void;
}
