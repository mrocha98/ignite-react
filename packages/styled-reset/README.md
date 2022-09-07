# StyledReset

A Styled Components' global style implementing [Andy Bell's Modern CSS Reset](https://piccalil.li/blog/a-modern-css-reset/).

## Installing

Add these in depencencies:

```json
"@ignite-react/styled-reset": "workspace:*",
```

Then run `pnpm i`.

## Usage

In your root component (e.g., App.tsx):

```tsx
// other imports
import { StyledReset } from '@ignite-react/styled-reset';

function App() {
  // logic

  return (
    <>
      {/* other components */}
      <StyledReset />
    </>
  );
}
```

## License

This project is licensed under [The Clear BSD License](https://github.com/mrocha98/ignite-react/blob/main/LICENSE).
