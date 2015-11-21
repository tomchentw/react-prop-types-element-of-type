import {default as ReactElement} from "react/lib/ReactElement";
import {default as ReactPropTypeLocationNames} from "react/lib/ReactPropTypeLocationNames";

const ANONYMOUS = '<<anonymous>>';

export default function createComponentTypeChecker(expectedComponent) {
  function validate(isRequired, props, propName, componentName, location, propFullName) {
    const locationName = ReactPropTypeLocationNames[location];
    if (null == props[propName]) {
      if (isRequired) {
        return new Error(
          `Required ${locationName} \`${propFullName}\` was not specified in ` +
          `\`${componentName}\`.`
        );
      } else {
        return null;
      }
    }

    if (!ReactElement.isValidElement(props[propName]) || props[propName].type !== expectedComponent) {
      const expectedComponentName = getComponentName(expectedComponent);
      const actualComponentName = getComponentName(props[propName].type);

      return new Error(
        `Invalid ${locationName} \`${propFullName}\` of element type ` +
        `\`${actualComponentName}\` supplied to \`${componentName}\`, expected ` +
        `element type \`${expectedComponentName}\`.`
      );
    }
    return null;
  }

  const validator = validate.bind(null, false);
  validator.isRequired = validate.bind(null, true);
  return validator;
}

// Returns class name of the object, if any.
function getComponentName(componentClass) {
  return componentClass && componentClass.name || ANONYMOUS;
}
