import React, { useEffect } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Visitors from './Visitors.tsx'
import { 
    ToggleWsBooleanCtx, 
    ToggleModalLoginVisibilityCtx, 
    UsersListCtx 
} from '../../Context'
import { Provider } from 'react-redux'
import store from '../../Redux/store'
import { userLocalStorage } from '../../Functions/userLocalStorage.ts'
import { useDispatch } from 'react-redux'
import { setUserName } from '../../Redux/actions'

describe('Visitors component', () => {
    let component
    const MockToggleWsBoolean = jest.fn()
    const MockUsersList = [{nickName: "UserTest2", id: "9341604557908515"}]
    const MockShowLogin = jest.fn()
    const MockSetShowLogin = jest.fn()

    beforeEach(() => {
        component = render(
            <Provider store={store}>
                <UsersListCtx.Provider value={{usersList: MockUsersList}}>
                    <ToggleModalLoginVisibilityCtx.Provider value={{showLogin: MockShowLogin, setShowLogin: MockSetShowLogin}}>
                        <ToggleWsBooleanCtx.Provider value={{toggleWsBoolean: MockShowLogin}}>
                            <Visitors>
                                {'test'}
                            </Visitors>
                        </ToggleWsBooleanCtx.Provider>
                    </ToggleModalLoginVisibilityCtx.Provider>
                </UsersListCtx.Provider>
            </Provider>
        )
    })

    test('render component', async() => {
        const element =  await screen.findByTitle('Click para modificar')
        expect(element).toBeInTheDocument()
    })

    test('testing user image to be in the document, visible', async() => {
        const element = await screen.findByTestId('myself')
        expect(element).toBeInTheDocument()
        const style = window.getComputedStyle(element)
        expect(style._values.visibility).toBe('visible')
    })

    test('testing button click', async() => {
        const element = await screen.findByTitle('Click para modificar')
        fireEvent.click(element)
        expect(MockSetShowLogin).toHaveBeenCalledTimes(1)
    })
})