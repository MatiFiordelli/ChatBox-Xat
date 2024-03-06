import React from 'react'
import { render } from '@testing-library/react'
import MessagesListContainer from './index.tsx'

describe('MessagesListContainer Component', ()=>{
    let component

    test('render component', ()=>{
        component = render(<MessagesListContainer />)
        component.getByRole('textbox')
    })
})
