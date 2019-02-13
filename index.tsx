import { Band, Gig, Venue } from "gig-gizmo-sdk";
import * as React from "react";
import * as ReactDOM from "react-dom";
import BandButton, { BandButtonProps } from "./src/BandButton";
import GigButton, { GigButtonProps } from "./src/GigButton";
import ShowTable, { ShowTableProps } from "./src/ShowTable";
import VenueButton, { VenueButtonProps } from "./src/VenueButton";

interface PluginConfig {
	showTable: {
		band: string | null | undefined;
		venue: string | null | undefined;
		array: string[] | null | undefined;
		// TODO?: Add more!
	};
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
					const config = Plugin.Config;
					const element = id ?
						document.getElementById(id) :
						null;
					ReactDOM.render(
						<ShowTable
							band={args.band || config.showTable.band}
							venue={args.venue || config.showTable.venue}
							array={args.array || config.showTable.array}
						/>,
						element
					);
					return element;
				}
			})
		},
		BandButton: {
			new: () => ({
				render: (id: string, args: BandButtonProps) => {
					const element = document.createElement("div");
					ReactDOM.render(
						<BandButton
							band={args.band}
							bandId={id}
							icon={args.icon}
							onClick={args.onClick}
						/>,
						element
					);
					return element;
				}
			})
		},
		VenueButton: {
			new: () => ({
				render: (id: string, args: VenueButtonProps) => {
					const element = document.createElement("div");
					ReactDOM.render(
						<VenueButton
							venue={args.venue}
							venueId={id}
							icon={args.icon}
							onClick={args.onClick}
						/>,
						element
					);
					return element;
				}
			})
		},
		GigButton: {
			new: () => ({
				render: (id: string, args: GigButtonProps) => {
					const element = document.createElement("div");
					ReactDOM.render(
						<GigButton
							gig={args.gig}
							gigId={id}
							onClick={args.onClick}
						/>,
						element
					);
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
