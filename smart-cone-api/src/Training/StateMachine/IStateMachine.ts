import { IStateMachineState } from "./IStateMachineState";

export abstract class IStateMachine {
    // List of possible states
    states: IStateMachineState[];
    currentState: IStateMachineState;
}
