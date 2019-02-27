import { Upload, Venue } from "gig-gizmo-sdk";
import React from "react";

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
	public constructor(props: VenueButtonProps);
	public componentDidMount(): Promise<void>;
	public handleClick(event: any): void;
	public render(): JSX.Element;
}
