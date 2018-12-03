import * as moment from "moment";
import * as React from "react";
import * as PropTypes from "prop-types";
import * as Button from "react-bootstrap/lib/Button";
import * as Glyphicon from "react-bootstrap/lib/Glyphicon";
import {
	Gig,
	GigGizmoPropTypes
} from "gig-gizmo-sdk";

const packageInfo = require("../package.json");
const { server } = packageInfo.config;

export type GigButtonProps = {
	gigId: string,
	gig: Gig | undefined | null,
	onClick: Function | undefined | null
};

export type GigButtonState = {
	gig:  | undefined | null,
};

export default class GigButton
	extends React.Component<GigButtonProps, GigButtonState> {

	constructor(props: GigButtonProps) {
		super(props);
		this.state = {
			gig: null
		};
	}

	componentDidMount() {
		if (typeof window !== "undefined") {
			const self = this;
			const {
				gigId
			} = this.props;
			const { gig } = this.state;
			if (!gig && gigId) {
				Gig.findById(gigId)
					.then(item => {
						self.setState({
							gig: item
						});
					});
			}
		}
	}

	handleClick(event: any) {
		event.preventDefault();
		const gigId = this.props.gigId;
		if (this.props.onClick) this.props.onClick(event);
		else if (gigId)
			window.location.assign(`${server}/gig/${gigId}`);
	}

	render() {
		const self = this;
		const gig = this.state.gig || this.props.gig || null;
		const gigId = this.props.gigId || null;
		const venueStartTime = moment(gig.startTime);
		const venueStopTime = moment(gig.stopTime);
		const onClick = (event: any) => self.handleClick(event);
		if (gig) {
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
				href={`${server}/gig/${gig._id}`}
				className="GigButton"
				onClick={onClick}
			>
				<Glyphicon glyph="" className="fa fa-calendar" />
				{gigId}
			</Button>
		);
	}
}
