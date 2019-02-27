import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import OverlayTrigger from "react-bootstrap/lib/OverlayTrigger";
import Tooltip from "react-bootstrap/lib/Tooltip";

import { Band, Upload } from "gig-gizmo-sdk";

import { server } from "./config";
import Plugin from "./index";
import { htmlToText } from "./shared";
import "./styles/BandButton.css";

interface BandButtonState {
	icon: Upload  | undefined | null;
	band: Band  | undefined | null;
}

export interface BandButtonProps {
	bandId: string;
	icon: Upload | undefined | null;
	band: Band | undefined | null;
	onClick: ((event: any) => void) | null;
}

export class BandButton
	extends Plugin.React.Component<BandButtonProps, BandButtonState> {

	public constructor(props: BandButtonProps) {
		super(props);
		const { icon, band } = props;
		this.state = {
			icon,
			band
		};
	}

	public async componentDidMount() {
		if (typeof window !== "undefined") {
			let { band, icon } = this.state;
			const { bandId } = this.props;
			try {
				if (!band && bandId) {
					band = await Band.findById(bandId);
				}
				if (band && band.icon) {
					icon = await band.getIcon();
				}
			} catch (e) {
				console.error(e);
			}
			this.setState({
				band,
				icon
			});
		}
	}

	public handleClick(event: any) {
		event.preventDefault();
		const { bandId, onClick } = this.props;
		if (onClick) {
			onClick(event);
		} else if (bandId) {
			window.location.assign(`${server}/band/${bandId}`);
		}
	}

	public render(): React.ReactElement {
		const { bandId } = this.props;
		const band = this.state.band || this.props.band || null;
		const icon = this.state.icon || this.props.icon || null;

		const self = this;
		const onClick = (event: any) => self.handleClick(event);
		let buttonElement = null;
		if (band) {
			let iconElement = null;
			if (band.icon && icon) {
				iconElement = Plugin.React.createElement(
					"img", {
						width: "32",
						height: "32",
						alt: "⚠",
						className: "bandIcon",
						src: icon.fileData
					});
			} else {
				iconElement = Plugin.React.createElement(
					Glyphicon, {
						glyph: "",
						className: "fa fa-music"
					}
				);
			}
			buttonElement = Plugin.React.createElement(
				Button, {
					href: `${server}/band/${bandId}`,
					className: "bandButton",
					onClick,
					children: [iconElement, band.name]
				}
			);
		} else {
			buttonElement = Plugin.React.createElement(
				Button, {
					href: `${server}/band/${bandId}`,
					className: "bandButton",
					onClick,
					children: [bandId]
				}
			);
		}
		const description = band && band.description ? band.description : "Loading...";
		const tooltip = Plugin.React.createElement(
			Tooltip, {
				id: `${bandId}Tooltip`,
				className: "bandTooltip",
				children: htmlToText(description).slice(0, 256)
			}
		);
		return Plugin.React.createElement(
			OverlayTrigger, {
				placement: "top",
				overlay: tooltip,
				children: buttonElement
			}
		);
	}
}
