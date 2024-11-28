## Steps to reproduce the error

Install packages by running the following command:

```bash
npm install
```

Build the project by running the following command:

```bash
npm run build
```

Start the Application in Production Mode:

```bash
npm run start:prod
```

Open [http://127.0.0.1:8080/](http://127.0.0.1:8080/) with your browser.

## Expected result

- Table rows should be collapsed by default.

## Actual result

- Initially, table rows are not collapsed.
- After scrolling, the rows collapse as expected.
