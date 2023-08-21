import Control from './Control.jsx'
import Preview from './Preview.jsx'

if (typeof window !== 'undefined') {
  window.SimpleMDEControl = Control
  window.SimpleMDEPreview = Preview
}

export { Control as SimpleMDEControl, Preview as SimpleMDEPreview }