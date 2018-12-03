import * as React from "react";
import * as PropTypes from "prop-types";
import * as Button from "react-bootstrap/lib/Button";
import * as Glyphicon from "react-bootstrap/lib/Glyphicon";
import * as Tooltip from "react-bootstrap/lib/Tooltip";
import * as OverlayTrigger from "react-bootstrap/lib/OverlayTrigger";
import { Venue, Upload, GigGizmoPropTypes } from "gig-gizmo-sdk";

import { htmlToText } from "./shared";
import "./styles/VenueButton.css";

const packageInfo = require("../package.json");
const { server } = packageInfo.config;

type VenueButtonState = {
	icon: Upload | null,
	venue: Venue | null
};

export type VenueButtonProps = {
	venueId: string,
	icon: Upload | undefined | null,
	venue: Venue | undefined | null,
	onClick: Function | undefined | null
};


export default class VenueButton
	extends React.Component<VenueButtonProps, VenueButtonState> {

	constructor(props: VenueButtonProps) {
		super(props);
		const { venue, icon } = props;
		this.state = {
			venue,
			icon
		};
	}

	async componentDidMount() {
		if (typeof window !== "undefined") {
			let { venue, icon } = this.state;
			const { venueId } = this.props;
			try {
				if (!venue && venueId)
					venue = await Venue.findById(venueId);
				if (venue && venue.icon)
					icon = await venue.getIcon();
			} catch (e) {
				console.error(e);
			}
			this.setState({
				venue,
				icon
			});
		}
	}

	handleClick(event: any) {
		event.preventDefault();
		const { venueId, onClick } = this.props;
		if (onClick) this.props.onClick(event);
		else if (venueId) window.location.assign(`${server}/venue/${venueId}`);
	}

	render() {
		const { venueId } = this.props;
		const self = this;
		const venue = this.state.venue || this.props.venue || null;
		const icon = this.state.icon || this.props.icon || null;
		const onClick = (event: any) => self.handleClick(event);
		let buttonElement = null;
		if (venue) {
			let iconElement = null;
			if (venue.icon && icon)
				iconElement = (
					<img
						width="32"
						height="32"
						alt="⚠"
						className="VenueButtonIcon"
						src={icon.fileData}
					/>
				);
			else iconElement = <Glyphicon glyph="" className="fa fa-glass" />;

			buttonElement = (
				<Button
					className="VenueButton"
					href={`${server}/venue/${venueId}`}
					onClick={onClick}
				>
					{iconElement}
					{venue.name}
				</Button>
			);
		} else {
			buttonElement = (
				<Button
					className="VenueButton"
					href={`${server}/venue/${venueId}`}
					onClick={onClick}
				>{venueId}</Button>
			);
		}
		const description = venue && venue.description ? venue.description : "Loading...";
		const tooltip = (
			<Tooltip id={`${venueId}Tooltip`} className="VenueButtonTooltip">
				{htmlToText(description)}
			</Tooltip>
		);
		return (
			<OverlayTrigger placement="top" overlay={tooltip}>
				{buttonElement}
			</OverlayTrigger>
		);
	}
}
