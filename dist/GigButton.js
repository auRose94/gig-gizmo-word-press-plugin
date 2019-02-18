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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gig_gizmo_sdk_1 = require("gig-gizmo-sdk");
var moment_1 = __importDefault(require("moment"));
var react_1 = __importDefault(require("react"));
var Button_1 = __importDefault(require("react-bootstrap/lib/Button"));
var Glyphicon_1 = __importDefault(require("react-bootstrap/lib/Glyphicon"));
var config_1 = require("./config");
var GigButton = /** @class */ (function (_super) {
    __extends(GigButton, _super);
    function GigButton(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            gig: null
        };
        return _this;
    }
    GigButton.prototype.componentDidMount = function () {
        if (typeof window !== "undefined") {
            var self_1 = this;
            var gigId = this.props.gigId;
            var gig = this.state.gig;
            if (!gig && gigId) {
                gig_gizmo_sdk_1.Gig.findById(gigId)
                    .then(function (item) {
                    self_1.setState({
                        gig: item
                    });
                });
            }
        }
    };
    GigButton.prototype.handleClick = function (event) {
        event.preventDefault();
        var gigId = this.props.gigId;
        if (this.props.onClick) {
            this.props.onClick(event);
        }
        else if (gigId) {
            window.location.assign(config_1.server + "/gig/" + gigId);
        }
    };
    GigButton.prototype.render = function () {
        var self = this;
        var gig = this.state.gig || this.props.gig || null;
        var gigId = this.props.gigId || null;
        var onClick = function (event) { return self.handleClick(event); };
        if (gig) {
            var venueStartTime = moment_1.default(gig.startTime);
            var venueStopTime = moment_1.default(gig.stopTime);
            var time = venueStartTime.format("LLL") + " - " + venueStopTime.format("LT");
            return (react_1.default.createElement(Button_1.default, { href: config_1.server + "/gig/" + gig._id, className: "GigButton", onClick: onClick },
                react_1.default.createElement(Glyphicon_1.default, { glyph: "", className: "fa fa-calendar" }),
                time));
        }
        return (react_1.default.createElement(Button_1.default, { href: config_1.server + "/gig/" + gigId, className: "GigButton", onClick: onClick },
            react_1.default.createElement(Glyphicon_1.default, { glyph: "", className: "fa fa-calendar" }),
            gigId));
    };
    return GigButton;
}(react_1.default.Component));
exports.default = GigButton;
//# sourceMappingURL=GigButton.js.map