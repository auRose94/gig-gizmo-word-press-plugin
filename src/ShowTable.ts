/*
	Created by corynull on March 18 2018 Sun 7:25 AM
*/

import {
	Band,
	Gig,
	RESTModel,
	Upload,
	Venue
} from "gig-gizmo-sdk";

import React from "react";
import { BandButton } from "./BandButton";
import { GigButton } from "./GigButton";
import { ColumnData, ModelTable } from "./ModelTable";
import "./styles/calendar.css";
import { VenueButton } from "./VenueButton";

export interface ShowTableProps {
	band: string | undefined | null;
	venue: string | undefined | null;
	array: string[] | undefined | null;
}

interface ShowTableState {
	gigs: Gig[];
	band: Band | null;
	venue: Venue | null;
	bands: Map<string, Band | null>;
	venues: Map<string, Venue | null>;
	uploads: Map<string, Upload | null>;
	gigMap: Map<string, Gig | null>;
	order: string;
	orderBy: string;
	page: number;
	rowsPerPage: number;
	promises: Array<Promise<void>>;
	ready: boolean;
}

export class ShowTable
	extends React.Component<ShowTableProps, ShowTableState> {
	public props: ShowTableProps;
	public state: ShowTableState;

	public constructor(props: ShowTableProps, context?: any) {
		super(props, context);
		this.props = props;
		this.state = {
			band: null,
			venue: null,
			gigs: [],
			bands: new Map(),
			venues: new Map(),
			uploads: new Map(),
			gigMap: new Map(),
			order: "desc",
			orderBy: "startTime",
			page: 0,
			rowsPerPage: 5,
			promises: [],
			ready: false
		};
	}

	public componentDidMount() {
		const self = this;
		this.reload()
			.then(() => {
				const {
					orderBy,
					order
				} = self.state;
				self.handleRequestSort(null, orderBy, order);
			},    console.error);
	}

	public async reload() {
		const {
			band: bandId,
			venue: venueId,
			array: idTable
		} = this.props;
		const {
			bands,
			venues,
			gigMap,
			uploads,
			promises
		} = this.state;
		const self = this;
		const onError = (error: any) => console.error(error);
		const onBand = (band: Band | null) => {
			if (band && band.id) {
				bands.set(band.id, band);
				self.setState({
					bands
				});
			}
		};
		const onVenue = (venue: Venue | null) => {
			if (venue && venue.id) {
				venues.set(venue.id, venue);
				self.setState({
					venues
				});
			}
		};
		if (RESTModel.isValidId(bandId) &&
			bandId !== null &&
			bandId !== undefined) {
			const band = await Band.findById(bandId);
			if (band) {
				bands.set(bandId, band);
				const rGigs = await band.getGigs();
				rGigs.forEach((gig: Gig) => {
					if (gig && gig.id) {
						gigMap.set(gig.id, gig);
						promises.push(gig.getVenue()
							.then(onVenue, onError));
					}
				});
				await Promise.all(promises);
				self.setState({
					ready: true,
					band,
					promises,
					venues,
					uploads,
					gigMap,
					gigs: rGigs
				});
			}
		} else if (RESTModel.isValidId(venueId) &&
			venueId !== null &&
			venueId !== undefined) {
			const venue = await Venue.findById(venueId);
			if (venue) {
				venues.set(venueId, venue);
				const rGigs: Gig[] = await venue.getGigs();
				rGigs.forEach((gig: Gig) => {
					if (gig && gig.id && Array.isArray(gig.bands)) {
						gigMap.set(gig.id, gig);
						gig.bands.forEach((gigBandId: string) => {
							if (!bands.has(gigBandId)) {
								const promise = Band.findById(gigBandId)
									.then(
										onBand,
										onError
									);
								promises.push(promise);
								bands.set(gigBandId, null);
							}
						});
					}
				});
				await Promise.all(promises);
				self.setState({
					ready: true,
					venue,
					promises,
					uploads,
					gigMap,
					gigs: rGigs
				});
			}
		} else if (
			Array.isArray(idTable) &&
			idTable.every(RESTModel.isValidId)
		) {
			const rGigs: Gig[] = (await Promise.all(
				idTable.map((id: string) => Gig.findById(id))
			)).filter((v) => v !== null) as Gig[];
			rGigs.forEach((gig: Gig) => {
				if (gig && gig.id && Array.isArray(gig.bands)) {
					gigMap.set(gig.id, gig);
					gig.bands.forEach((gigBandId: string) => {
						if (!bands.has(gigBandId)) {
							const promise = Band.findById(gigBandId)
								.then(
									onBand,
									onError
								);
							promises.push(promise);
							bands.set(gigBandId, null);
						}
					});
				}
				promises.push(gig.getVenue()
					.then(onVenue, onError));
			});
			await Promise.all(promises);
			self.setState({
				ready: true,
				venues,
				promises,
				bands,
				uploads,
				gigMap,
				gigs: rGigs
			});
		}
	}

	public handleRequestSort(_event: any, orderBy: string, order: string) {
		let {
			gigs
		} = this.state;
		if (order === "desc") {
			gigs = gigs.sort((a, b) => {
				const bValue = b[orderBy];
				const aValue = a[orderBy];
				return bValue < aValue ? -1 : 1;
			});
		} else {
			gigs = gigs.sort((a, b) => {
				const bValue = b[orderBy];
				const aValue = a[orderBy];
				return bValue > aValue ? -1 : 1;
			});
		}

		this.setState({
			gigs,
			order,
			orderBy
		});
	}

	public handleChangePage(_event: any, page: number) {
		this.setState({
			page
		});
	}

	public handleChangeRowsPerPage(_event: any, rowsPerPage: number) {
		this.setState({
			rowsPerPage
		});
	}

	public getColumnData(): ColumnData[] {
		const { bands, venues, uploads } = this.state;
		const {
			band: bandId,
			venue: venueId
		} = this.props;
		const columnData: ColumnData[] = [{
			onClick: null,
			id: "startTime",
			label: "Event",
			format: (n: Gig): any => {
				return React.createElement(
					GigButton, {
						gigId: n._id || "",
						gig: n,
						onClick: null
					}
				);
			}
		}];
		if (venueId || !bandId) {
			columnData.push({
				onClick: null,
				id: "bands",
				label: "Band(s)",
				format: (n: Gig): any => {
					if (Array.isArray(n.bands) && n.bands.length > 0) {
						return n.bands.map(
								(bid: string) => bands.get(bid) || null
							)
							.map((band: Band | null) => {
								if (!band || !band._id) { return null; }
								const icon: Upload | undefined | null = band.icon ? uploads.get(band.icon) : null;
								return React.createElement(
									BandButton, {
										band,
										key: band._id,
										bandId: band._id,
										onClick: null,
										icon
									}
								);
							});
					} else {
						return React.createElement("span", { content: ["TBA"] });
					}
				}
			});
		}
		if (bandId || !venueId) {
			columnData.push({
				onClick: null,
				id: "venue",
				label: "Venue",
				format: (n: Gig): any => {
					const vId: string = (n && n.venue) ? n.venue : "";
					const venue: Venue | undefined | null =
						vId ? venues.get(vId) : null;
					const icon: Upload | undefined | null =
						venue && venue.icon ? uploads.get(venue.icon || "") : null;
					return React.createElement(
						VenueButton, {
							venue,
							key: vId,
							venueId: vId,
							onClick: null,
							icon
						}
					);
				}
			});
		}
		return columnData;
	}

	public render(): JSX.Element {
		const self = this;
		const {
			gigs,
			page,
			rowsPerPage,
			order,
			orderBy,
			ready
		} = this.state;

		const columnData = this.getColumnData();

		if (ready) {
			return React.createElement(
				ModelTable, {
					onSelect: null,
					onSelectAll: null,
					rowsPerPageOptions: [10, 25, 50, 100],
					columnData,
					order,
					orderBy,
					models: gigs,
					rowsPerPage,
					page,
					selected: null,
					onRequestSort: (event: any, ob: string, o: string) =>
						self.handleRequestSort(event, ob, o),
					onPageChange: (event: any, p: number) =>
						self.handleChangePage(event, p),
					onRowsPerPageChange: (event: any, option: number) =>
						self.handleChangeRowsPerPage(event, option)
				}
			);
		}
		// TODO: return nothing and wait?
		return React.createElement("div");
	}
}
