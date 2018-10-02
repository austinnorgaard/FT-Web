import { IStateMachine } from "./StateMachine/i-state-machine";
import { PreSessionState } from "./pre-session-state";
import { IStateMachineState } from "./StateMachine/i-state-machine-state";

export enum SessionStateMachineStates {
    Pre = 0,
    Perform = 1,
    Post = 2,
}

export class SessionStateMachine extends IStateMachine {
    constructor() {
        // Construct our state machine
        super();
        this.states = new Array<IStateMachineState>(3);
        this.states[SessionStateMachineStates.Pre] = new PreSessionState();
        this.currentState = this.states[SessionStateMachineStates.Pre];
    }
}
