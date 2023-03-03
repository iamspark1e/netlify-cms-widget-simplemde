# netlify-cms-widget-simplemde

### Quick Start

Add below script code after Netlify CMS script tag,

```html
<script src="https://www.unpkg.com/netlify-cms-widget-simplemde"></script>
<script>
  CMS.registerWidget("simplemde", SimpleMDEControl, SimpleMDEPreview);
</script>
```

Then, change your original `"widget": "markdown"` into `"widget": "simplemde"`.

Just so simple, I tested Chinese and works well.

Any feature or suggests are welcomed!