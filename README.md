<h1 align='center'>netlify-cms-widget-simplemde</h1>

<p align='center'>
  <a href="https://github.com/iamspark1e/netlify-cms-widget-simplemde"><img src="https://data.jsdelivr.com/v1/package/npm/netlify-cms-widget-simplemde/badge" /></a>
</p>

<p align='center'>Replacement of NetlifyCMS (Decap CMS) Markdown widget</p>
<br />

### Quick Start

Add below script code after Netlify CMS script tag,

```html
<script src="https://cdn.jsdelivr.net/npm/netlify-cms-widget-simplemde/dist/main.min.js"></script>
<!-- OR use unpkg CDN -->
<!-- <script src="https://www.unpkg.com/netlify-cms-widget-simplemde"></script> -->
<script>
  CMS.registerWidget("simplemde", SimpleMDEControl, SimpleMDEPreview);
</script>
```

Then, change your original `"widget": "markdown"` into `"widget": "simplemde"`.

Just so simple, I tested Chinese and works well. (Old markdown widget cannot input Chinese characters fluently.)

Any feature or suggests are welcomed!

### Purpose

I made this widget because the original rich-text editor is not doing well with Chinese characters (similar bugs for IME). The bug has not been solved until the CMS's name change.

> For example this, XD. ![ianstormtaylor/slate issue #5066](https://user-images.githubusercontent.com/18358438/181482462-8517f926-0f3a-4f81-9c21-034ded4fc692.gif)


Therefore, many features about rich text editing are NOT added into my editor. Markdown is the first.