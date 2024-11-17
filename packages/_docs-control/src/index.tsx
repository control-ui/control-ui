import './index.scss'
import { createRoot } from 'react-dom/client'
import { themes } from './theme'
import { AppLoader } from '@control-ui/app/AppLoader'

const onError = (error: any): void => console.log(error)
const App = AppLoader(
    {themes},
    () => import('./App'),
    'Loading',
    'Error loading App component',
    onError,
)

createRoot(document.querySelector('#root')!)
    .render(<App/>)
