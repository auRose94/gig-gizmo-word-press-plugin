import * as React from "react";
import * as ReactDOM from "react-dom";
import { BandButtonProps, default as BandButton } from "./BandButton";
import { default as GigButton, GigButtonProps } from "./GigButton";
import { default as ShowTable, ShowTableProps } from "./ShowTable";
import { default as VenueButton, VenueButtonProps } from "./VenueButton";

interface PluginConfig {
	showTable: ShowTableProps;
}

export default class Plugin {
	public static Config: PluginConfig = {
		showTable: {
			band: null,
			venue: null,
			array: null
		}
	};
	public static widgets = {
		ShowTable: {
			new: () => ({
				render: (id: string, args: ShowTableProps) => {
					const element = id ?
						document.getElementById(id) :
						null;
					const component =
						<ShowTable {...args} />;
					ReactDOM.render(component, element);
					return element;
				}
			})
		},
		BandButton: {
			new: () => ({
				render: (args: BandButtonProps) => {
					const element = document.createElement("div");
					const component =
						<BandButton {...args} />;
					ReactDOM.render(component, element);
					return element;
				}
			})
		},
		VenueButton: {
			new: () => ({
				render: (args: VenueButtonProps) => {
					const element = document.createElement("div");
					const component =
						<VenueButton {...args} />;
					ReactDOM.render(component, element);
					return element;
				}
			})
		},
		GigButton: {
			new: () => ({
				render: (args: GigButtonProps) => {
					const element = document.createElement("div");
					const component: React.ReactElement =
						<GigButton {...args} />;
					ReactDOM.render(component, element);
					return element;
				}
			})
		},

	};
	public static config(config: PluginConfig) {
		Plugin.Config = config;
	}
}

if (typeof window !== "undefined") {
	(window as any).WordPressPlugin = Plugin;
}
