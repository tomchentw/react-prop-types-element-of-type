"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _expect = require("expect");

var _expect2 = _interopRequireDefault(_expect);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactLibReactPropTypeLocations = require("react/lib/ReactPropTypeLocations");

var _reactLibReactPropTypeLocations2 = _interopRequireDefault(_reactLibReactPropTypeLocations);

var _index = require("../index");

var _index2 = _interopRequireDefault(_index);

describe("propTypesElementOfType", function () {
  var domEl = undefined;
  var ChildComponent = undefined;
  var WrapperComponent = undefined;
  var consoleErrorSpy = undefined;

  beforeEach(function () {
    domEl = document.createElement("div");

    ChildComponent = (function (_Component) {
      _inherits(C, _Component);

      function C() {
        _classCallCheck(this, C);

        _get(Object.getPrototypeOf(C.prototype), "constructor", this).apply(this, arguments);
      }

      _createClass(C, [{
        key: "render",
        value: function render() {
          return _react2["default"].createElement(
            "div",
            null,
            "Child"
          );
        }
      }]);

      return C;
    })(_react.Component);

    WrapperComponent = _react2["default"].createClass({
      displayName: "WrapperComponent",

      propTypes: {
        childElement: (0, _index2["default"])(ChildComponent).isRequired
      },

      render: function render() {
        return _react2["default"].createElement(
          "div",
          null,
          this.props.childElement
        );
      }
    });

    consoleErrorSpy = _expect2["default"].spyOn(console, "error");
  });

  afterEach(function () {
    consoleErrorSpy.restore();
    (0, _reactDom.unmountComponentAtNode)(domEl);
    domEl = null;
  });

  it("should warn for invalid element", function () {
    var component = (0, _reactDom.render)(_react2["default"].createElement(WrapperComponent, { childElement: _react2["default"].createElement("div", null) }), domEl);

    (0, _expect2["default"])(consoleErrorSpy.calls.length).toBe(1);
  });

  it("should warn when passing no element and isRequired is set", function () {
    var component = (0, _reactDom.render)(_react2["default"].createElement(WrapperComponent, null), domEl);

    (0, _expect2["default"])(consoleErrorSpy.calls.length).toBe(1);
  });

  it("should not warn for valid element", function () {
    var component = (0, _reactDom.render)(_react2["default"].createElement(WrapperComponent, { childElement: _react2["default"].createElement(ChildComponent, null) }), domEl);

    (0, _expect2["default"])(consoleErrorSpy.calls.length).toBe(0);
  });

  it("should be implicitly optional and not warn without values", function () {
    typeCheckPass((0, _index2["default"])(ChildComponent), null);
    typeCheckPass((0, _index2["default"])(ChildComponent), undefined);
  });

  describe("component inheritance", function () {
    it("should warn that", function () {
      var XGrandChildComponent = (function (_ChildComponent) {
        _inherits(XGrandChildComponent, _ChildComponent);

        function XGrandChildComponent() {
          _classCallCheck(this, XGrandChildComponent);

          _get(Object.getPrototypeOf(XGrandChildComponent.prototype), "constructor", this).apply(this, arguments);
        }

        _createClass(XGrandChildComponent, [{
          key: "render",
          value: function render() {
            return _react2["default"].createElement(
              "div",
              null,
              "GrandChild"
            );
          }
        }]);

        return XGrandChildComponent;
      })(ChildComponent);

      var component = (0, _reactDom.render)(_react2["default"].createElement(WrapperComponent, { childElement: _react2["default"].createElement(XGrandChildComponent, null) }), domEl);

      (0, _expect2["default"])(consoleErrorSpy.calls.length).toBe(1);
    });

    it("should contains message that points back to GitHub issue thread", function () {
      var YGrandChildComponent = (function (_ChildComponent2) {
        _inherits(YGrandChildComponent, _ChildComponent2);

        function YGrandChildComponent() {
          _classCallCheck(this, YGrandChildComponent);

          _get(Object.getPrototypeOf(YGrandChildComponent.prototype), "constructor", this).apply(this, arguments);
        }

        _createClass(YGrandChildComponent, [{
          key: "render",
          value: function render() {
            return _react2["default"].createElement(
              "div",
              null,
              "GrandChild"
            );
          }
        }]);

        return YGrandChildComponent;
      })(ChildComponent);

      var component = (0, _reactDom.render)(_react2["default"].createElement(WrapperComponent, { childElement: _react2["default"].createElement(YGrandChildComponent, null) }), domEl);

      (0, _expect2["default"])(consoleErrorSpy.calls[0].arguments[0]).toInclude("facebook/react/pull/4716");
    });
  });
});

// copy from facebook/react@0.14-stable: http://git.io/v4pv5
function typeCheckPass(declaration, value) {
  var props = { testProp: value };
  var error = declaration(props, "testProp", "testComponent", _reactLibReactPropTypeLocations2["default"].prop);
  (0, _expect2["default"])(error).toBe(null);
}