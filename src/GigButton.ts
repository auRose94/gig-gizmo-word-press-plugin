import {
	Gig
} from "gig-gizmo-sdk";
import React from "react";
import Button from "react-bootstrap/lib/Button";

import { server } from "./config";

export interface GigButtonProps {
	gigId: string;
	gig: Gig | undefined | null;
	onClick: ((event: any) => void) | null;
}

export interface GigButtonState {
	gig: Gig | undefined | null;
}

export class GigButton
	extends React.Component<GigButtonProps, GigButtonState> {

	public constructor(props: GigButtonProps) {
		super(props);
		this.state = {
			gig: null
		};
	}

	public componentDidMount() {
		if (typeof window !== "undefined") {
			const self = this;
			const {
				gigId
			} = this.props;
			const { gig } = this.state;
			if (!gig && gigId) {
				Gig.findById(gigId)
					.then((item) => {
						self.setState({
							gig: item
						});
					});
			}
		}
	}

	public handleClick(event: any) {
		event.preventDefault();
		const gigId = this.props.gigId;
		if (this.props.onClick) { this.props.onClick(event); } else if (gigId) {
			window.location.assign(`${server}/gig/${gigId}`);
							}
	}

	public render(): JSX.Element {
		const self = this;
		const gig = this.state.gig || this.props.gig || null;
		const gigId = this.props.gigId || null;
		const onClick = (event: any) => self.handleClick(event);
		if (gig) {
			const venueStartTime = gig.startTime;
			const venueStopTime = gig.stopTime;
			const time = `${venueStartTime.toLocaleString()} - ${venueStopTime.toLocaleTimeString()}`;
			return React.createElement(
				Button, {
					href: `${server}/gig/${gig._id}`,
					className: "GigButton",
					onClick,
					children: [
						"📆",
						time
					]
				}
			);
		}
		return React.createElement(
			Button, {
				href: `${server}/gig/${gigId}`,
				className: "GigButton",
				onClick,
				children: [
					"📆",
					gigId
				]
			}
		);
	}
}
