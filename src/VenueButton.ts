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

export class VenueButton
	extends React.Component<VenueButtonProps, VenueButtonState> {

	public constructor(props: VenueButtonProps) {
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

	public render(): JSX.Element {
		const { venueId } = this.props;
		const self = this;
		const venue = this.state.venue || this.props.venue || null;
		const icon = this.state.icon || this.props.icon || null;
		const onClick = (event: any) => self.handleClick(event);
		let buttonElement = null;
		if (venue) {
			let iconElement = null;
			if (venue.icon && icon) {
				iconElement = React.createElement(
					"img", {
						width: "32",
						height: "32",
						alt: "⚠",
						className: "VenueButtonIcon",
						src: `/cropped/${icon.croppedFileData}`
					}
				);
			} else {
				iconElement = React.createElement(
					Glyphicon, {
						glyph: "",
						className: "fa fa-glass"
					}
				);
			}

			buttonElement = React.createElement(
				Button, {
					className: "VenueButton",
					href: `${server}/venue/${venueId}`,
					onClick,
					children: [
						iconElement,
						venue.name
					]
				}
			);
		} else {
			buttonElement = React.createElement(
				Button, {
					className: "VenueButton",
					href: `${server}/venue/${venueId}`,
					onClick,
					children: [venueId]
				}
			);
		}
		const description =
			venue && venue.description ? venue.description : "Loading...";
		const tooltip = React.createElement(
			Tooltip, {
				id: `${venueId}Tooltip`,
				className: "VenueButtonTooltip",
				children: [htmlToText(description).slice(0, 256)]
			}
		);
		return React.createElement(
			OverlayTrigger, {
				placement: "top",
				overlay: tooltip,
				children: [buttonElement]
			}
		);
	}
}
