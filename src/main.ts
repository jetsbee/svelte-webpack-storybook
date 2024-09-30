import "./global.css";

import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    name: "world",
  },
});

import("./async").then(({ mockAsyncFunc }) => {
  mockAsyncFunc();
});

export default app;
