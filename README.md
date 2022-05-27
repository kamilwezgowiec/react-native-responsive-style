# React Native Responsive Style

## Table of contents

- [Introduction](#introduction)
- [Installation](#installation)
  - [npm](#npm)
  - [yarn](#yarn)
- [Usage](#usage)
  - [Style sheet](#style-sheet)
  - [Inline styles](#inline-styles)
  - [SSR with Next.js](#ssr-with-nextjs)
- [Changelog](#changelog)

## Introduction

React Native Responsive Style is a TypeScript-first responsive stylesheet compatible with React Native, React Native Web and Next.js (including SSR).

Inspired and based on [react-native-media-query](https://github.com/kasinskas/react-native-media-query), this package removes the requirement of using
a 2nd prop (dataSet) when applying styles to components. In addition, this allows us now to pass arrays of styles into components like in the [example](#usage).

## Installation

### npm

```
npm install react-native-responsive-style
```

### yarn

```
yarn add react-native-responsive-style
```

## Usage

### Style sheet

```ts
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { styleSheet } from "react-native-responsive-style";

const styles = styleSheet({
  container: {
    width: "100%",
    backgroundColor: "brown",

    "@media (min-width: 400px) and (max-width: 600px)": {
      backgroundColor: "yellow",
    },
    "@media (min-width: 600px)": {
      backgroundColor: "red",
    },
  },
  anotherContainer: {
    height: 300,

    "@media (min-width: 400px) and (max-width: 600px)": {
      height: 400,
    },
    "@media (min-width: 600px)": {
      height: 500,
    },
  },
  text: {
    color: "red",

    "@media (min-width: 500px)": {
      color: "blue",
    },
  },
});

export default function App() {
  const [state, setState] = useState(true);

  return (
    <View style={[styles.container, styles.anotherContainer]}>
      <Text>Welcome to Expo + Next.js 👋</Text>

      <Pressable onPress={() => setState(!state)}>
        <Text>click me ;)</Text>
      </Pressable>

      {state && (
        <Text style={styles.text}>Hi there, I am a secret message</Text>
      )}
    </View>
  );
}
```

### Inline styles

```ts
import React from "react";
import { Text, View } from "react-native";
import { style } from "react-native-responsive-style";

export default function App() {
  const textStyles = style({
    color: "blue",

    "@media (min-width: 550px)": {
      color: "orange",
    },
  });

  return (
    <View>
      <Text style={textStyles}>Hi there ;)</Text>
    </View>
  );
}
```

### SSR with Next.js

In order to have server side rendering enabled, we need to use `<RenderSsr />` by rendering media queries in our website's `<head>` section.

```ts
import Document, { Html, Head, Main, NextScript } from "next/document";
import { RenderSsr } from "react-native-responsive-style";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <RenderSsr />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

## Changelog

### v1.1.1

- fixed types
- minified JS bundle

### v1.1.0

- add support for inlined responsive styles

### v1.0.0

- initial release
