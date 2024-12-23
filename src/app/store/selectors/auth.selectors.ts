import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authFeatureName, AuthState } from "../reducers/auth.reducers";

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureName)

export const selectAuthenticatedUser = createSelector(
    selectAuthState,
    (state: AuthState) => state.authenticatedUser
  );
  