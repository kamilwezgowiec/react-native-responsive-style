import React from "react";
import createReactDOMStyle from "react-native-web/dist/exports/StyleSheet/createReactDOMStyle";
import prefixStyles from "react-native-web/dist/modules/prefixStyles";
import { hash, toKebabCase, isClient, isMediaQuery } from "./utils";
import type {
  ComponentStyle,
  NamedStyles,
  CreateReturn,
  WithMediaQueries,
} from "./types";

export namespace Style {
  const mediaQueries = {};
  const styleId = "native-media-query";
  let uniqueId = 0;

  function getStyleElement() {
    let styleElement = document.getElementById(styleId);

    if (!styleElement) {
      styleElement = document.head.appendChild(document.createElement("style"));
      styleElement.setAttribute("id", styleId);
    }

    return styleElement;
  }

  export function renderSsr() {
    return React.createElement("style", {
      id: styleId,
      dangerouslySetInnerHTML: {
        __html: Object.values(mediaQueries).join("\n"),
      },
    });
  }

  export function style<T extends WithMediaQueries<ComponentStyle>>(
    properties: T
  ) {
    const filteredProperties: ComponentStyle = {};
    const ids: Record<string, string> = {};

    for (const [propertyName, value] of Object.entries(properties)) {
      if (!isMediaQuery(propertyName)) {
        filteredProperties[propertyName] = value;
        continue;
      }

      const domStyle = prefixStyles(createReactDOMStyle(value));
      const id = `--media-query-${hash(
        `${uniqueId}-${propertyName}-${domStyle}`
      )}`;

      const styles = Object.entries(domStyle)
        .map(([property, value]) => {
          const prop = toKebabCase(property);

          if (Array.isArray(value)) {
            return value.map((v) => `${prop}:${v}`).join(";");
          } else {
            return `${prop}:${value} !important`;
          }
        })
        .join(";");
      ids[id] = "1";
      uniqueId++;

      const mediaQuery = `${propertyName} { [style*='${id}'] { ${styles} } }`;

      if (mediaQueries[id] !== mediaQuery) {
        mediaQueries[id] = mediaQuery;

        if (isClient) {
          getStyleElement().innerHTML = Object.values(mediaQueries).join("\n");
        }
      }
    }

    return { ...filteredProperties, ...ids };
  }

  export function styleSheet<T extends NamedStyles<T> | NamedStyles<any>>(
    styles: T | NamedStyles<T>
  ) {
    const baseStyles: Record<string, ComponentStyle> = {};

    for (const [name, properties] of Object.entries(styles)) {
      baseStyles[name] = style(properties);
    }

    return baseStyles as CreateReturn<T>;
  }
}

export const RenderSsr = Style.renderSsr;
export const style = Style.style;
export const styleSheet = Style.styleSheet;
