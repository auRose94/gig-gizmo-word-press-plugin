import React from "react";
import ReactDOM from "react-dom";
import { BandButton, BandButtonProps } from "./BandButton";
import { GigButton, GigButtonProps } from "./GigButton";
import { ShowTable, ShowTableProps } from "./ShowTable";
import { VenueButton, VenueButtonProps } from "./VenueButton";

interface PluginConfig {
	showTable: ShowTableProps;
}

export default class Plugin {
	public static React: any = React;
	public static ReactDOM: any = ReactDOM;
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
					const component = Plugin.React.createElement(ShowTable, args);
					Plugin.ReactDOM.render(component, element);
					return element;
				}
			})
		},
		BandButton: {
			new: () => ({
				render: (args: BandButtonProps) => {
					const element = document.createElement("div");
					const component = Plugin.React.createElement(BandButton, args);
					Plugin.ReactDOM.render(component, element);
					return element;
				}
			})
		},
		VenueButton: {
			new: () => ({
				render: (args: VenueButtonProps) => {
					const element = document.createElement("div");
					const component = Plugin.React.createElement(VenueButton, args);
					Plugin.ReactDOM.render(component, element);
					return element;
				}
			})
		},
		GigButton: {
			new: () => ({
				render: (args: GigButtonProps) => {
					const element = document.createElement("div");
					const component = Plugin.React.createElement(GigButton, args);
					Plugin.ReactDOM.render(component, element);
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
