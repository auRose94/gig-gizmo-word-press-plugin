import Axios from "axios";
import { API } from "gig-gizmo-sdk";
import React from "react";
import ReactDOM from "react-dom";
import SocketIOClient from "socket.io-client";
import { BandButton, BandButtonProps } from "./BandButton";
import { dev, port, server } from "./config";
import { GigButton, GigButtonProps } from "./GigButton";
import { ShowTable, ShowTableProps } from "./ShowTable";
import { VenueButton, VenueButtonProps } from "./VenueButton";

API.dev = dev;
API.secure = !dev;
API.Axios = Axios;
API.SocketIO = SocketIOClient;
API.hostname = server;
API.port = port;

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
					const component = React.createElement(ShowTable, args);
					ReactDOM.render(component, element);
					return element;
				}
			})
		},
		BandButton: {
			new: () => ({
				render: (args: BandButtonProps) => {
					const element = document.createElement("div");
					const component = React.createElement(BandButton, args);
					ReactDOM.render(component, element);
					return element;
				}
			})
		},
		VenueButton: {
			new: () => ({
				render: (args: VenueButtonProps) => {
					const element = document.createElement("div");
					const component = React.createElement(VenueButton, args);
					ReactDOM.render(component, element);
					return element;
				}
			})
		},
		GigButton: {
			new: () => ({
				render: (args: GigButtonProps) => {
					const element = document.createElement("div");
					const component = React.createElement(GigButton, args);
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
