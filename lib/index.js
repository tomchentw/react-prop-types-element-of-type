"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createComponentTypeChecker;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _reactLibReactElement = require("react/lib/ReactElement");

var _reactLibReactElement2 = _interopRequireDefault(_reactLibReactElement);

var _reactLibReactPropTypeLocationNames = require("react/lib/ReactPropTypeLocationNames");

var _reactLibReactPropTypeLocationNames2 = _interopRequireDefault(_reactLibReactPropTypeLocationNames);

var ANONYMOUS = "<<anonymous>>";

/* Check if the given element is created by specific Component. i.e.,
 * `element = React.createElement(Component, {})`
 *
 * @author: @cassiozen
 * @origin: https://github.com/facebook/react/pull/4716
 */

function createComponentTypeChecker(expectedComponent) {
  function validate(isRequired, props, propName, componentName, location) {
    var propFullName = arguments.length <= 5 || arguments[5] === undefined ? propName : arguments[5];
    return (function () {
      var locationName = _reactLibReactPropTypeLocationNames2["default"][location];
      if (null == props[propName]) {
        if (isRequired) {
          return new Error("Required " + locationName + " `" + propFullName + "` was not specified in " + ("`" + componentName + "`."));
        } else {
          return null;
        }
      }

      var actualComponent = props[propName].type;
      if (!_reactLibReactElement2["default"].isValidElement(props[propName]) || actualComponent !== expectedComponent) {
        var expectedComponentName = getComponentName(expectedComponent);
        var actualComponentName = getComponentName(actualComponent);

        var extraMessage = getExtraMessage(expectedComponent, actualComponent);

        return new Error("Invalid " + locationName + " `" + propFullName + "` of element type " + ("`" + actualComponentName + "` supplied to `" + componentName + "`, expected ") + ("element type `" + expectedComponentName + "`." + extraMessage));
      }
      return null;
    })();
  }

  var validator = validate.bind(null, false);
  validator.isRequired = validate.bind(null, true);
  return validator;
}

// Returns class name of the object, if any.
function getComponentName(componentClass) {
  return componentClass && componentClass.name || ANONYMOUS;
}

function getExtraMessage(expectedComponent, actualComponent) {
  if (expectedComponent.prototype.isPrototypeOf(actualComponent.prototype)) {
    return " " + ("Notice that component inheritance is discouraged in React. " + "See discussions here: " + "https://github.com/facebook/react/pull/4716#issuecomment-135145263");
  }
  return "";
}
module.exports = exports["default"];