import { Dimensions } from "react-native";
import mediaQuery from "css-mediaquery";
import type {
  ComponentStyle,
  NamedStyles,
  WithMediaQueries,
  StyleReturn,
  StyleSheetReturn,
} from "./types";
import { isMediaQuery } from "./utils";

export namespace Style {
  export const renderSsr = () => null;

  export function style<T extends WithMediaQueries<ComponentStyle>>(
    properties: T
  ) {
    let filteredProperties: ComponentStyle = {};
    const ids: Record<string, string> = {};

    for (const [propertyName, value] of Object.entries(properties)) {
      if (isMediaQuery(propertyName)) {
        const isMatchingMediaQuery = mediaQuery.match(
          propertyName.replace("@media", ""),
          Dimensions.get("window")
        );

        if (isMatchingMediaQuery) {
          filteredProperties = { ...filteredProperties, ...value };
        }

        continue;
      }

      filteredProperties[propertyName] = value;
    }

    return { ...filteredProperties, ...ids } as StyleReturn<T>;
  }

  export function styleSheet<T extends NamedStyles<T> | NamedStyles<any>>(
    styles: T | NamedStyles<T>
  ) {
    const baseStyles: Record<string, ComponentStyle> = {};

    for (const [name, properties] of Object.entries(styles)) {
      baseStyles[name] = style(properties);
    }

    return baseStyles as StyleSheetReturn<T>;
  }
}

export const RenderSsr = Style.renderSsr;
export const style = Style.style;
export const styleSheet = Style.styleSheet;
