import { ISessionSetupService } from "./session-setup-interface.service";
import { Field } from "../models/field";
import { SessionSetupService } from "./session-setup.service";
import { Course } from "../models/course";
import { Athlete } from "../../../../../../smart-cone-api/src/Athletes/athlete";

describe("SessionSetupService", () => {
    let service: ISessionSetupService = null;
    beforeEach(() => {
        // Create our test instance
        service = new SessionSetupService();
    });

    it("should be able to set field", () => {
        const f = new Field([], 20, 24, "test field");
        service.setField(f);
        expect(service.getSessionSetupData().field.name === "test field").toBeTruthy();
        expect(service.getSessionSetupData().field.height === 24 && service.getSessionSetupData().field.width === 20).toBeTruthy();
    });

    it("should be able to set a course", () => {
        const f = new Field([], 20, 24, "test field");
        const c = new Course(f, [], [], "Test Course");
        service.setCourse(c);
        expect(service.getSessionSetupData().course.field === f).toBeTruthy();
        expect(service.getSessionSetupData().course.name === "Test Course");
    });

    it("should be able to set athletes", () => {
        const athletes: Athlete[] = [
            { firstName: "Keaton", lastName: "Freude", phoneNumber: "5555555555" } as Athlete,
            { firstName: "Doug", lastName: "Flowers", phoneNumber: "4555555555" } as Athlete,
        ];

        service.setAthletes(athletes);
        expect(service.getSessionSetupData().athletes.length).toEqual(2);
        expect(service.getSessionSetupData().athletes).toEqual(athletes);
    });
});
