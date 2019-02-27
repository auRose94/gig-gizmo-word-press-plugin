import { Gig } from "gig-gizmo-sdk";
import React from "react";

interface GigButtonState {
	gig: Gig | undefined | null;
}

export interface GigButtonProps {
	gigId: string;
	gig: Gig | undefined | null;
	onClick: ((event: any) => void) | null;
}

export class GigButton
	extends React.Component<GigButtonProps, GigButtonState> {
	public constructor(props: GigButtonProps);
	public componentDidMount(): Promise<void>;
	public handleClick(event: any): void;
	public render(): JSX.Element;
}
