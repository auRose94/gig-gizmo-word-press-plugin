import {
	Gig
} from "gig-gizmo-sdk";
import moment from "moment";
import React from "react";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import { server } from "./config";

export interface GigButtonProps {
	gigId: string;
	gig: Gig | undefined | null;
	onClick: ((event: any) => void) | null;
}

export interface GigButtonState {
	gig: Gig | undefined | null;
}

export default class GigButton
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

	public render(): React.ReactElement {
		const self = this;
		const gig = this.state.gig || this.props.gig || null;
		const gigId = this.props.gigId || null;
		const onClick = (event: any) => self.handleClick(event);
		if (gig) {
			const venueStartTime = moment(gig.startTime);
			const venueStopTime = moment(gig.stopTime);
			const time = `${venueStartTime.format("LLL")} - ${venueStopTime.format("LT")}`;
			return (
					<Button
						href={`${server}/gig/${gig._id}`}
						className="GigButton"
						onClick={onClick}
					>
						<Glyphicon glyph="" className="fa fa-calendar" />
						{time}
					</Button>
				);
		}
		return (
			<Button
				href={`${server}/gig/${gigId}`}
				className="GigButton"
				onClick={onClick}
			>
				<Glyphicon glyph="" className="fa fa-calendar" />
				{gigId}
			</Button>
		);
	}
}
