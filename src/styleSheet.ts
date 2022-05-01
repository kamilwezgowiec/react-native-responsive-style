import { Dimensions } from "react-native";
import mediaQuery from "css-mediaquery";
import { ComponentStyle, NamedStyles, CreateReturn } from "./types";
import { isMediaQuery } from "./utils";

export namespace StyleSheet {
  export const renderSsr = () => null;

  export function create<T extends NamedStyles<T> | NamedStyles<any>>(
    styles: T | NamedStyles<T>
  ) {
    const baseStyles: Record<string, ComponentStyle> = {};

    for (const [name, properties] of Object.entries<ComponentStyle>(styles)) {
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

      baseStyles[name] = { ...filteredProperties, ...ids };
    }

    return baseStyles as CreateReturn<T>;
  }
}
