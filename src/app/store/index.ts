import { ActionReducerMap } from "@ngrx/store";
import { authFeatureName, AuthReducer, AuthState } from "./reducers/auth.reducers";

interface RootState {
    [authFeatureName]: AuthState

}

const RootReducer: ActionReducerMap<RootState> = {
    [authFeatureName]: AuthReducer
}

export { RootReducer }