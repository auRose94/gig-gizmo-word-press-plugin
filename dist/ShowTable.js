"use strict";
/*
    Created by corynull on March 18 2018 Sun 7:25 AM
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
var react_1 = __importDefault(require("react"));
var gig_gizmo_sdk_1 = require("gig-gizmo-sdk");
var BandButton_1 = __importDefault(require("./BandButton"));
var GigButton_1 = __importDefault(require("./GigButton"));
var ModelTable_1 = __importDefault(require("./ModelTable"));
require("./styles/calendar.css");
var VenueButton_1 = __importDefault(require("./VenueButton"));
var ShowTable = /** @class */ (function (_super) {
    __extends(ShowTable, _super);
    function ShowTable(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.props = props;
        _this.state = {
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
        return _this;
    }
    ShowTable.prototype.componentDidMount = function () {
        var self = this;
        this.reload()
            .then(function () {
            var _a = self.state, orderBy = _a.orderBy, order = _a.order;
            self.handleRequestSort(null, orderBy, order);
        }, console.error);
    };
    ShowTable.prototype.reload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, bandId, venueId, idTable, _b, bands, venues, gigMap, uploads, promises, self, onError, onBand, onVenue, band, rGigs, venue, rGigs, rGigs;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, bandId = _a.band, venueId = _a.venue, idTable = _a.array;
                        _b = this.state, bands = _b.bands, venues = _b.venues, gigMap = _b.gigMap, uploads = _b.uploads, promises = _b.promises;
                        self = this;
                        onError = function (error) { return console.error(error); };
                        onBand = function (band) {
                            if (band) {
                                bands.set(band.id, band);
                                self.setState({
                                    bands: bands
                                });
                            }
                        };
                        onVenue = function (venue) {
                            if (venue) {
                                venues.set(venue.id, venue);
                                self.setState({
                                    venues: venues
                                });
                            }
                        };
                        if (!(gig_gizmo_sdk_1.RESTModel.isValidId(bandId) &&
                            bandId !== null &&
                            bandId !== undefined)) return [3 /*break*/, 4];
                        return [4 /*yield*/, gig_gizmo_sdk_1.Band.findById(bandId)];
                    case 1:
                        band = _c.sent();
                        bands.set(bandId, band);
                        return [4 /*yield*/, band.getGigs()];
                    case 2:
                        rGigs = _c.sent();
                        rGigs.forEach(function (gig) {
                            gigMap.set(gig.id, gig);
                            promises.push(gig.getVenue()
                                .then(onVenue, onError));
                        });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 3:
                        _c.sent();
                        self.setState({
                            ready: true,
                            band: band,
                            promises: promises,
                            venues: venues,
                            uploads: uploads,
                            gigMap: gigMap,
                            gigs: rGigs
                        });
                        return [3 /*break*/, 11];
                    case 4:
                        if (!(gig_gizmo_sdk_1.RESTModel.isValidId(venueId) &&
                            venueId !== null &&
                            venueId !== undefined)) return [3 /*break*/, 8];
                        return [4 /*yield*/, gig_gizmo_sdk_1.Venue.findById(venueId)];
                    case 5:
                        venue = _c.sent();
                        venues.set(venueId, venue);
                        return [4 /*yield*/, venue.getGigs()];
                    case 6:
                        rGigs = _c.sent();
                        rGigs.forEach(function (gig) {
                            gigMap.set(gig.id, gig);
                            if (gig && Array.isArray(gig.bands)) {
                                gig.bands.forEach(function (gigBandId) {
                                    if (!bands.has(gigBandId)) {
                                        var promise = gig_gizmo_sdk_1.Band.findById(gigBandId)
                                            .then(onBand, onError);
                                        promises.push(promise);
                                        bands.set(gigBandId, null);
                                    }
                                });
                            }
                        });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 7:
                        _c.sent();
                        self.setState({
                            ready: true,
                            venue: venue,
                            promises: promises,
                            uploads: uploads,
                            gigMap: gigMap,
                            gigs: rGigs
                        });
                        return [3 /*break*/, 11];
                    case 8:
                        if (!(Array.isArray(idTable) &&
                            idTable.every(gig_gizmo_sdk_1.RESTModel.isValidId))) return [3 /*break*/, 11];
                        return [4 /*yield*/, Promise.all(idTable.map(function (id) { return gig_gizmo_sdk_1.Gig.findById(id); }))];
                    case 9:
                        rGigs = _c.sent();
                        rGigs.forEach(function (gig) {
                            gigMap.set(gig.id, gig);
                            if (gig && Array.isArray(gig.bands)) {
                                gig.bands.forEach(function (gigBandId) {
                                    if (!bands.has(gigBandId)) {
                                        var promise = gig_gizmo_sdk_1.Band.findById(gigBandId)
                                            .then(onBand, onError);
                                        promises.push(promise);
                                        bands.set(gigBandId, null);
                                    }
                                });
                            }
                            promises.push(gig.getVenue()
                                .then(onVenue, onError));
                        });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 10:
                        _c.sent();
                        self.setState({
                            ready: true,
                            venues: venues,
                            promises: promises,
                            bands: bands,
                            uploads: uploads,
                            gigMap: gigMap,
                            gigs: rGigs
                        });
                        _c.label = 11;
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    ShowTable.prototype.handleRequestSort = function (_event, orderBy, order) {
        var gigs = this.state.gigs;
        if (order === "desc") {
            gigs = gigs.sort(function (a, b) {
                var bValue = b[orderBy];
                var aValue = a[orderBy];
                var maybeDateB = moment_1.default(bValue);
                var maybeDateA = moment_1.default(aValue);
                if (maybeDateB.isValid() && maybeDateA.isValid()) {
                    return maybeDateB.isBefore(maybeDateA) ? -1 : 1;
                }
                return bValue < aValue ? -1 : 1;
            });
        }
        else {
            gigs = gigs.sort(function (a, b) {
                var bValue = b[orderBy];
                var aValue = a[orderBy];
                var maybeDateB = moment_1.default(bValue);
                var maybeDateA = moment_1.default(aValue);
                if (maybeDateB.isValid() && maybeDateA.isValid()) {
                    return maybeDateB.isAfter(maybeDateA) ? -1 : 1;
                }
                return bValue > aValue ? -1 : 1;
            });
        }
        this.setState({
            gigs: gigs,
            order: order,
            orderBy: orderBy
        });
    };
    ShowTable.prototype.handleChangePage = function (_event, page) {
        this.setState({
            page: page
        });
    };
    ShowTable.prototype.handleChangeRowsPerPage = function (_event, rowsPerPage) {
        this.setState({
            rowsPerPage: rowsPerPage
        });
    };
    ShowTable.prototype.getColumnData = function () {
        var _a = this.state, bands = _a.bands, venues = _a.venues, uploads = _a.uploads;
        var _b = this.props, bandId = _b.band, venueId = _b.venue;
        var columnData = [{
                onClick: null,
                id: "startTime",
                label: "Event",
                format: function (n) {
                    return (react_1.default.createElement(GigButton_1.default, { gigId: n._id, gig: n, onClick: null }));
                }
            }];
        if (venueId || !bandId) {
            columnData.push({
                onClick: null,
                id: "bands",
                label: "Band(s)",
                format: function (n) {
                    if (Array.isArray(n.bands) && n.bands.length > 0) {
                        return n.bands.map(function (bid) { return bands.get(bid) || null; })
                            .map(function (band) {
                            if (!band) {
                                return null;
                            }
                            var icon = band.icon ? uploads.get(band.icon) : null;
                            return (react_1.default.createElement(BandButton_1.default, { band: band, key: band._id, bandId: band._id, onClick: null, icon: icon }));
                        });
                    }
                    else {
                        return (react_1.default.createElement("span", null, "TBA"));
                    }
                }
            });
        }
        if (bandId || !venueId) {
            columnData.push({
                onClick: null,
                id: "venue",
                label: "Venue",
                format: function (n) {
                    var vId = (n && n.venue) ? n.venue : "";
                    var venue = vId ? venues.get(vId) : null;
                    var icon = venue && venue.icon ? uploads.get(venue.icon || "") : null;
                    return (react_1.default.createElement(VenueButton_1.default, { venue: venue, key: vId, venueId: vId, onClick: null, icon: icon }));
                }
            });
        }
        return columnData;
    };
    ShowTable.prototype.render = function () {
        var self = this;
        var _a = this.state, gigs = _a.gigs, page = _a.page, rowsPerPage = _a.rowsPerPage, order = _a.order, orderBy = _a.orderBy, ready = _a.ready;
        var columnData = this.getColumnData();
        if (ready) {
            return (react_1.default.createElement(ModelTable_1.default, { onSelect: null, onSelectAll: null, rowsPerPageOptions: [10, 25, 50, 100], columnData: columnData, order: order, orderBy: orderBy, models: gigs, rowsPerPage: rowsPerPage, page: page, selected: null, onRequestSort: function (event, ob, o) {
                    return self.handleRequestSort(event, ob, o);
                }, onPageChange: function (event, p) {
                    return self.handleChangePage(event, p);
                }, onRowsPerPageChange: function (event, option) {
                    return self.handleChangeRowsPerPage(event, option);
                } }));
        }
        // TODO: return nothing and wait?
        return react_1.default.createElement("div", null);
    };
    return ShowTable;
}(react_1.default.Component));
exports.default = ShowTable;
//# sourceMappingURL=ShowTable.js.map