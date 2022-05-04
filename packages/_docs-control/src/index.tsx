import React from 'react'
import './index.scss'
import ReactDOM from 'react-dom'
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

ReactDOM.render(<App/>, document.getElementById('root'))
