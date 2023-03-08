import './bootstrap.js'
import CMS, { init } from 'netlify-cms'
import 'netlify-cms/dist/cms.css'
import { SimpleMDEControl, SimpleMDEPreview } from '../src'

const config = {
backend: {
 name: 'test-repo',
 login: false,
},
media_folder: 'assets',
collections: [{
 name: 'test',
 label: 'Test',
 files: [{
   file: 'test.yml',
   name: 'test',
   label: 'Test',
   fields: [
     { name: 'test_widget', label: 'Test Widget', widget: 'test'},
   ],
 }],
}],
}

CMS.registerWidget('test', SimpleMDEControl, SimpleMDEPreview)

init({ config })