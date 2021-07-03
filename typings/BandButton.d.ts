import { Band, Upload } from "gig-gizmo-sdk";
import React from "react";

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
	extends React.Component<BandButtonProps, BandButtonState> {
	public constructor(props: BandButtonProps);
	public componentDidMount(): Promise<void>;
	public handleClick(event: any): void;
	public render(): JSX.Element;
}
