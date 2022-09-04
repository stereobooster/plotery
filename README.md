# Plotery

[![npm](https://img.shields.io/npm/v/@shelacek/plotery.svg)](https://www.npmjs.com/package/@shelacek/plotery)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/@shelacek/plotery.svg)](https://bundlephobia.com/result?p=@shelacek/plotery)

*Fast and lightweight plotting library for Preact without fuss.*

![Screenshot of some Plotery graph](https://bitbucket.org/shelacek/plotery/raw/master/screenshot.png)

See documentation on [shelacek.bitbucket.io/plotery](https://shelacek.bitbucket.io/plotery).

```jsx
<Chart data={data}>
	<LinearAxis type="x" min={0} max={100} />
	<LinearAxis type="y" min={-10} max={10} />
	<LinearLine />
</Chart>
```


## Features

- Plotery generate SVG markup and let the browser do the rest
- Declarative configuration: It's Preact library, so why not use JSX?
- Small footprint: don't burn bits for sporadically used features
- Easily extensible
- Styled with CSS


[Changelog] | [Create an issue]

[Changelog]: https://bitbucket.org/shelacek/plotery/src/master/CHANGELOG.md
[Create an issue]: https://bitbucket.org/shelacek/plotery/issues
