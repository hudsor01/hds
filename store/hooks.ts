import {
    useDispatch,
    useSelector,
    type TypedUseSelectorHook
} from 'react-redux'
import type { RootState, AppDispatch } from './types'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> =
    useSelector

// Custom hook for auth state
export const useAuth = () => {
    const auth = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    return {
        ...auth,
        isAuthenticated: !!auth.user && !!auth.session
    }
}

// Custom hook for UI state
export const useUI = () => {
    const ui = useAppSelector(state => state.ui)
    const dispatch = useAppDispatch()

    return {
        ...ui,
        activeNotifications: ui.notifications.filter(
            n => !n.dismissed
        )
    }
}
