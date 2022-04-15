import React from "react";
import type { ViewStyle, TextStyle, ImageStyle } from "react-native";

type WithMediaQueries<Type> = Type extends any
  ? Type & { [key: `@media${string}`]: Type }
  : never;

export type ComponentStyle = ViewStyle | TextStyle | ImageStyle;

export type NamedStyles<T> = {
  [P in keyof T]: WithMediaQueries<ComponentStyle>;
};

type AllKeysOf<T> = T extends any ? keyof T : never;

type Get<T, K extends keyof any> = T extends Record<K, any> ? T[K] : never;

type ValueOf<Obj> = Obj[keyof Obj];

type GetBaseStyles<Obj> = {
  [K in keyof Obj as K extends `@media${string}` ? never : K]: Obj[K];
};

type GetMediaQueryStyles<Obj> = ValueOf<{
  [K in keyof Obj as K extends `@media${string}` ? K : never]: Obj[K];
}>;

type Styles<
  Style,
  BaseStyles = GetBaseStyles<Style>,
  MediaQueryStyles = GetMediaQueryStyles<Style>
> = {
  [K in AllKeysOf<BaseStyles | MediaQueryStyles>]:
    | Get<BaseStyles | MediaQueryStyles, K>
    | (K extends keyof BaseStyles ? never : undefined);
};

export type CreateReturn<T> = { [K in keyof T]: Styles<T[K]> };
