import { Upload, Venue } from "gig-gizmo-sdk";
import React from "react";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import OverlayTrigger from "react-bootstrap/lib/OverlayTrigger";
import Tooltip from "react-bootstrap/lib/Tooltip";

import { server } from "./config";
import { htmlToText } from "./shared";
import "./styles/VenueButton.css";

interface VenueButtonState {
	icon: Upload | undefined | null;
	venue: Venue | undefined | null;
}

export interface VenueButtonProps {
	venueId: string;
	icon: Upload | undefined | null;
	venue: Venue | undefined | null;
	onClick: ((event: any) => void) | null;
}

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

	public async componentDidMount() {
		if (typeof window !== "undefined") {
			let { venue, icon } = this.state;
			const { venueId } = this.props;
			try {
				if (!venue && venueId) {
					venue = await Venue.findById(venueId);
				}
				if (venue && venue.icon) {
					icon = await venue.getIcon();
				}
			} catch (e) {
				console.error(e);
			}
			this.setState({
				venue,
				icon
			});
		}
	}

	public handleClick(event: any) {
		event.preventDefault();
		const { venueId, onClick } = this.props;
		if (onClick) {
			onClick(event);
		} else if (venueId) {
			window.location.assign(`${server}/venue/${venueId}`);
		}
	}

	public render() {
		const { venueId } = this.props;
		const self = this;
		const venue = this.state.venue || this.props.venue || null;
		const icon = this.state.icon || this.props.icon || null;
		const onClick = (event: any) => self.handleClick(event);
		let buttonElement = null;
		if (venue) {
			let iconElement = null;
			if (venue.icon && icon) {
				iconElement = (
					<img
						width="32"
						height="32"
						alt="⚠"
						className="VenueButtonIcon"
						src={icon.fileData}
					/>
				);
			} else { iconElement = <Glyphicon glyph="" className="fa fa-glass" />; }

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
