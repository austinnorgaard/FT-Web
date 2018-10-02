import { IStateMachineState } from "./i-state-machine-state";

export abstract class IStateMachine {
    // List of possible states
    states: IStateMachineState[];
    currentState: IStateMachineState;
}
