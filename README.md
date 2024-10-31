## Steps to reproduce the error

Install packages by running the following command:

```bash
npm install
```

Run the development server:

```bash
npm run local
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

Click the `Navigate to a Different Page` button to go to the next page.

Attempt to scroll within the table on this new page.

## Expected result

The table should scroll smoothly, allowing you to access all data within the table.

## Actual result

The scroll bar moves, but the table data itself does not move as expected when scrolling.
This error is shown in the console:

```
perspective-viewer.inline.js:7 Uncaught (in promise) x
    at n.wbg.__wbg_new_09b5236f2fcfe2c2 (webpack://rustic-ui/./node_modules/@finos/perspective-viewer/dist/esm/perspective-viewer.inline.js?:7:20655)
    at wasm://wasm/0095a752:wasm-function[1719]:0x1016ff
    at wasm://wasm/0095a752:wasm-function[452]:0x75f49
    at wasm://wasm/0095a752:wasm-function[583]:0x97e77
    at wasm://wasm/0095a752:wasm-function[759]:0xb4b67
    at wasm://wasm/0095a752:wasm-function[5807]:0x185028
    at Oe (webpack://rustic-ui/./node_modules/@finos/perspective-viewer/dist/esm/perspective-viewer.inline.js?:7:1144)
    at s (webpack://rustic-ui/./node_modules/@finos/perspective-viewer/dist/esm/perspective-viewer.inline.js?:7:258)
```
