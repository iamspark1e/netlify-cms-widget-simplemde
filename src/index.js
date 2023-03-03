import Control from './Control'
import Preview from './Preview'

if (typeof window !== 'undefined') {
  window.SimpleMDEControl = Control
  window.SimpleMDEPreview = Preview
}

export { Control as SimpleMDEControl, Preview as SimpleMDEPreview }