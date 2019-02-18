"use strict";
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
var gig_gizmo_sdk_1 = require("gig-gizmo-sdk");
var react_1 = __importDefault(require("react"));
var Button_1 = __importDefault(require("react-bootstrap/lib/Button"));
var Glyphicon_1 = __importDefault(require("react-bootstrap/lib/Glyphicon"));
var OverlayTrigger_1 = __importDefault(require("react-bootstrap/lib/OverlayTrigger"));
var Tooltip_1 = __importDefault(require("react-bootstrap/lib/Tooltip"));
var config_1 = require("./config");
var shared_1 = require("./shared");
require("./styles/VenueButton.css");
var VenueButton = /** @class */ (function (_super) {
    __extends(VenueButton, _super);
    function VenueButton(props) {
        var _this = _super.call(this, props) || this;
        var venue = props.venue, icon = props.icon;
        _this.state = {
            venue: venue,
            icon: icon
        };
        return _this;
    }
    VenueButton.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, venue, icon, venueId, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(typeof window !== "undefined")) return [3 /*break*/, 8];
                        _a = this.state, venue = _a.venue, icon = _a.icon;
                        venueId = this.props.venueId;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        if (!(!venue && venueId)) return [3 /*break*/, 3];
                        return [4 /*yield*/, gig_gizmo_sdk_1.Venue.findById(venueId)];
                    case 2:
                        venue = _b.sent();
                        _b.label = 3;
                    case 3:
                        if (!(venue && venue.icon)) return [3 /*break*/, 5];
                        return [4 /*yield*/, venue.getIcon()];
                    case 4:
                        icon = _b.sent();
                        _b.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        e_1 = _b.sent();
                        console.error(e_1);
                        return [3 /*break*/, 7];
                    case 7:
                        this.setState({
                            venue: venue,
                            icon: icon
                        });
                        _b.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    VenueButton.prototype.handleClick = function (event) {
        event.preventDefault();
        var _a = this.props, venueId = _a.venueId, onClick = _a.onClick;
        if (onClick) {
            onClick(event);
        }
        else if (venueId) {
            window.location.assign(config_1.server + "/venue/" + venueId);
        }
    };
    VenueButton.prototype.render = function () {
        var venueId = this.props.venueId;
        var self = this;
        var venue = this.state.venue || this.props.venue || null;
        var icon = this.state.icon || this.props.icon || null;
        var onClick = function (event) { return self.handleClick(event); };
        var buttonElement = null;
        if (venue) {
            var iconElement = null;
            if (venue.icon && icon) {
                iconElement = (react_1.default.createElement("img", { width: "32", height: "32", alt: "\u26A0", className: "VenueButtonIcon", src: icon.fileData }));
            }
            else {
                iconElement = react_1.default.createElement(Glyphicon_1.default, { glyph: "", className: "fa fa-glass" });
            }
            buttonElement = (react_1.default.createElement(Button_1.default, { className: "VenueButton", href: config_1.server + "/venue/" + venueId, onClick: onClick },
                iconElement,
                venue.name));
        }
        else {
            buttonElement = (react_1.default.createElement(Button_1.default, { className: "VenueButton", href: config_1.server + "/venue/" + venueId, onClick: onClick }, venueId));
        }
        var description = venue && venue.description ? venue.description : "Loading...";
        var tooltip = (react_1.default.createElement(Tooltip_1.default, { id: venueId + "Tooltip", className: "VenueButtonTooltip" }, shared_1.htmlToText(description).slice(0, 256)));
        return (react_1.default.createElement(OverlayTrigger_1.default, { placement: "top", overlay: tooltip }, buttonElement));
    };
    return VenueButton;
}(react_1.default.Component));
exports.default = VenueButton;
//# sourceMappingURL=VenueButton.js.map