import { IStateMachineState } from "./StateMachine/i-state-machine-state";
import { Course } from "./course";
import { Athlete } from "../Athletes/athlete";

/*
 * Represents the pre-session state, during a training session. In this state, we need
 * to receive all necessary data required for the session. Once this is done and the state
 * is triggered to start the session, the machine will move us into the PerformSessionState
 */
export class PreSessionState implements IStateMachineState {
    private course: Course = null;
    private athletes: Array<Athlete>;
}
