import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "src/app/features/dashboard/models";


export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        'Set Authenticated User' : props<{ user: User }>(),
        'Unset Authenticated User' : emptyProps()
    }
})
