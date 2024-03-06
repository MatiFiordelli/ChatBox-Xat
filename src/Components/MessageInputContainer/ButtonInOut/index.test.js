import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ButtonInOut from './index.tsx'
import { ToggleWsBooleanCtx } from '../../../Context'

describe('ButtonInOut component', () => {
    let component
    let MockToggleWsBoolean
    let MocksetToggleWsBoolean

    test('rendering component', () => {
        MockToggleWsBoolean = jest.fn()
        MocksetToggleWsBoolean = jest.fn()

        component = render( 
            <ToggleWsBooleanCtx.Provider value={{ toggleWsBoolean: MockToggleWsBoolean, setToggleWsBoolean: MocksetToggleWsBoolean }}>
                <ButtonInOut dingdongSound={null} />
            </ToggleWsBooleanCtx.Provider>
        )
        const element = screen.getByText('Salir')
        expect(element).toBeInTheDocument()
    })

    test('clicking the button one time', () => {
        MockToggleWsBoolean = jest.fn()
        MocksetToggleWsBoolean = jest.fn()

        component = render( 
            <ToggleWsBooleanCtx.Provider value={{ toggleWsBoolean: MockToggleWsBoolean, setToggleWsBoolean: MocksetToggleWsBoolean }}>
                <ButtonInOut dingdongSound={null} />
            </ToggleWsBooleanCtx.Provider>
        )

        const button = component.getByText('Salir')
        fireEvent.click(button)
        expect(MocksetToggleWsBoolean).toHaveBeenCalledTimes(1)
    })
})