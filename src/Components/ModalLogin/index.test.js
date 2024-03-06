import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import ModalLogin from './index.tsx'
import { ToggleModalLoginVisibilityCtx } from '../../Context'
import store from '../../Redux/store'
import { Provider } from 'react-redux'

describe('ModalLogin component', () => {
    let component

    test('rendering component', () => {
        const mockShowLogin = jest.fn()
        const mockSetShowLogin = jest.fn()
        component = render(
            <Provider store={store}>
                <ToggleModalLoginVisibilityCtx.Provider value={{showLogin: mockShowLogin, setShowLogin: mockSetShowLogin}} >
                    <ModalLogin />
                </ToggleModalLoginVisibilityCtx.Provider>
            </Provider>
        )
        const element = component.getByText('⨉')
        expect(element).toBeInTheDocument()
    })
})