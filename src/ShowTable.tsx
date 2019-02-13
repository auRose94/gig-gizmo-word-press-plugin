/*
	Created by corynull on March 18 2018 Sun 7:25 AM
*/

import moment from "moment";
import React from "react";
import Button from "react-bootstrap/lib/Button";
import Image from "react-bootstrap/lib/Image";

import {
	Band,
	Gig,
	RESTModel,
	Upload,
	Venue
} from "gig-gizmo-sdk";

import BandButton from "./BandButton";
import GigButton from "./GigButton";
import ModelTable from "./ModelTable";
import "./styles/calendar.css";
import VenueButton from "./VenueButton";

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

export default class ShowTable
	extends React.Component<ShowTableProps, ShowTableState> {

	constructor(props: ShowTableProps) {
		super(props);
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
		const onBand = (band: Band) => {
			if (band) {
				bands.set(band.id, band);
				self.setState({
					bands
				});
			}
		};
		const onVenue = (venue: Venue) => {
			if (venue) {
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
			bands.set(bandId, band);
			const rGigs = await band.getGigs();
			rGigs.forEach((gig: Gig) => {
				gigMap.set(gig.id, gig);
				promises.push(gig.getVenue()
					.then(onVenue, onError));
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
		} else if (RESTModel.isValidId(venueId) &&
			venueId !== null &&
			venueId !== undefined) {
			const venue = await Venue.findById(venueId);
			venues.set(venueId, venue);
			const rGigs = await venue.getGigs();
			rGigs.forEach((gig: Gig) => {
				gigMap.set(gig.id, gig);
				if (gig && Array.isArray(gig.bands)) {
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
		} else if (
			Array.isArray(idTable) &&
			idTable.every(RESTModel.isValidId)
		) {
			const rGigs = await Promise.all(
				idTable.map((id: string) => Gig.findById(id))
			);
			rGigs.forEach((gig: Gig) => {
				gigMap.set(gig.id, gig);
				if (gig && Array.isArray(gig.bands)) {
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

	public handleRequestSort(event: any, orderBy: string, order: string) {
		let {
			gigs
		} = this.state;
		if (order === "desc") {
			gigs = gigs.sort((a: any, b: any) => {
				const bValue = b[orderBy];
				const aValue = a[orderBy];
				const maybeDateB = moment(bValue);
				const maybeDateA = moment(aValue);
				if (maybeDateB.isValid() && maybeDateA.isValid()) {
					return maybeDateB.isBefore(maybeDateA) ? -1 : 1;
				}
				return bValue < aValue ? -1 : 1;
			});
		} else {
			gigs = gigs.sort((a: any, b: any) => {
				const bValue = b[orderBy];
				const aValue = a[orderBy];
				const maybeDateB = moment(bValue);
				const maybeDateA = moment(aValue);
				if (maybeDateB.isValid() && maybeDateA.isValid()) {
					return maybeDateB.isAfter(maybeDateA) ? -1 : 1;
				}
				return bValue > aValue ? -1 : 1;
			});
		}

		this.setState({
			gigs,
			order,
			orderBy
		});
	}

	public handleChangePage(event: any, page: number) {
		this.setState({
			page
		});
	}

	public handleChangeRowsPerPage(event: any, rowsPerPage: number) {
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
				return (
					<GigButton gigId={n._id} gig={n} onClick={null}/>
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
								if (!band) { return null; }
								const icon: Upload | undefined | null = band.icon ? uploads.get(band.icon) : null;
								return (
									<BandButton
										band={band}
										key={band._id}
										bandId={band._id}
										onClick={null}
										icon={icon}
									/>);
							});
					} else {
						return (<span>TBA</span>);
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
					return (
						<VenueButton
							venue={venue}
							key={vId}
							venueId={vId}
							onClick={null}
							icon={icon}
						/>
					);
				}
			});
		}
		return columnData;
	}

	public render() {
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
			return (
				<ModelTable
					onSelect={null}
					onSelectAll={null}
					rowsPerPageOptions={[10, 25, 50, 100]}
					columnData={columnData}
					order={order}
					orderBy={orderBy}
					models={gigs}
					rowsPerPage={rowsPerPage}
					page={page}
					selected={null}
					onRequestSort={(event: any, ob: string, o: string) =>
						self.handleRequestSort(event, ob, o)
					}
					onPageChange={(event: any, p: number) =>
						self.handleChangePage(event, p)
					}
					onRowsPerPageChange={(event: any, option: number) =>
						self.handleChangeRowsPerPage(event, option)
					}
					/>
			);
		}
		// TODO: return nothing and wait?
		return null;
	}
}
