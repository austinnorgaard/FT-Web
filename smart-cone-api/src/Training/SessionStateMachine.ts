import { IStateMachine } from "./StateMachine/IStateMachine";
import { PreSessionState } from "./PreSessionState";
import { IStateMachineState } from "./StateMachine/IStateMachineState";

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
