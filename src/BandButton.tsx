import * as React from "react";
import * as PropTypes from "prop-types";
import * as Button from "react-bootstrap/lib/Button";
import * as Glyphicon from "react-bootstrap/lib/Glyphicon";
import * as Tooltip from "react-bootstrap/lib/Tooltip";
import * as OverlayTrigger from "react-bootstrap/lib/OverlayTrigger";
import { Band, Upload, GigGizmoPropTypes } from "gig-gizmo-sdk";

import { htmlToText } from "./shared";
import "./styles/BandButton.css";

const packageInfo = require("../package.json");
const { server } = packageInfo.config;

type BandButtonState = {
	icon: Upload  | undefined | null,
	band: Band  | undefined | null
};

export type BandButtonProps = {
	bandId: string,
	icon: Upload | undefined | null,
	band: Band | undefined | null,
	onClick: Function | undefined | null
};

export default class BandButton
	extends React.Component<BandButtonProps, BandButtonState> {

	constructor(props: BandButtonProps) {
		super(props);
		const { icon, band } = props;
		this.state = {
			icon,
			band
		};
	}

	async componentDidMount() {
		if (typeof window !== "undefined") {
			let { band, icon } = this.state;
			const { bandId } = this.props;
			try {
				if (!band && bandId)
					band = await Band.findById(bandId);
				if (band && band.icon)
					icon = await band.getIcon();
			} catch (e) {
				console.error(e);
			}
			this.setState({
				band,
				icon
			});
		}
	}

	handleClick(event: any) {
		event.preventDefault();
		const { bandId, onClick } = this.props;
		if (onClick) this.props.onClick(event);
		else if(bandId) window.location.assign(`${server}/band/${bandId}`);
	}

	render() {
		const { bandId } = this.props;
		const band = this.state.band || this.props.band || null;
		const icon = this.state.icon || this.props.icon || null;

		const self = this;
		const onClick = (event: any) => self.handleClick(event);
		let buttonElement = null;
		if (band) {
			let iconElement = null;
			if (band.icon && icon)
				iconElement = (
					<img
						width="32"
						height="32"
						alt="⚠"
						className="bandIcon"
						src={icon.fileData}
					/>
				);
			else iconElement = <Glyphicon glyph="" className="fa fa-music" />;
			buttonElement = (
				<Button
					href={`${server}/band/${bandId}`}
					className="bandButton"
					onClick={onClick}
				>
					{iconElement}
					{band.name}
				</Button>
			);
		} else {
			buttonElement = (
				<Button
					href={`${server}/band/${bandId}`}
					className="bandButton"
					onClick={onClick}
				>
					{bandId}
				</Button>
			);
		}
		const description = band && band.description ? band.description : "Loading...";
		const tooltip = (
			<Tooltip id={`${bandId}Tooltip`} className="bandTooltip">
				{htmlToText(description).slice(0, 256)}
			</Tooltip>
		);
		return (
			<OverlayTrigger placement="top" overlay={tooltip}>
				{buttonElement}
			</OverlayTrigger>
		);
	}
}
