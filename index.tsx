import * as React from "react";
import * as ReactDOM from "react-dom";
import { Band, Venue, Gig } from "gig-gizmo-sdk";
import BandButton, {BandButtonProps} from "./src/BandButton";
import VenueButton, {VenueButtonProps} from "./src/VenueButton";
import GigButton, {GigButtonProps} from "./src/GigButton";
import ShowTable, {ShowTableProps} from "./src/ShowTable";

type PluginConfig = {
	showTable: {
		band: string | null | undefined,
		venue: string | null | undefined,
		array: string[] | null | undefined
		//TODO?: Add more!
	}
};

export default class Plugin {
	static Config: PluginConfig;
	static config(config: PluginConfig) {
		Plugin.Config = config;
	}
	static widgets = {
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
					const config = Plugin.Config;
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
					const config = Plugin.Config;
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
					const config = Plugin.Config;
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
}

if (typeof window !== "undefined") {
	(window as any).GigGizmoWidget = Plugin;
}
