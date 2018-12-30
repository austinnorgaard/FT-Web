import { expect, should } from "chai";
import { LogDto } from "./log.dto";
import { LogLevel } from "./log-levels";
import { LogWriter } from "./log-writer";
import { LogMockWriter } from "./log-mock-writer";

function getTestLogError() {
    return new LogDto("This is a log!", LogLevel.ERROR, new Date(2018, 11, 29, 4, 0, 0, 0), "FrontEnd");
}

function getTestLogError2() {
    return new LogDto("This is another log!", LogLevel.INFO, new Date(2017, 11, 29, 4, 0, 0, 0), "BackEnd");
}

describe("logging", () => {
    it("should create a log", () => {
        const log = getTestLogError();
        expect(log).to.not.be.null;
    });

    it("should construct log", () => {
        const log = getTestLogError();
        expect(log).to.include.all.keys("message", "level", "timeStamp");
    });

    it("should pretty print", () => {
        const log = getTestLogError();
        const prettyMessage = log.toString();
        expect(prettyMessage).to.equal("[FrontEnd @ 2018-12-29 12:00:00.000] [ERROR] - This is a log!");
    });

    it("should pretty print another", () => {
        const log = getTestLogError2();
        const prettyMessage = log.toString();
        expect(prettyMessage).to.equal("[BackEnd @ 2017-12-29 12:00:00.000] [INFO] - This is another log!");
    });
});

describe("log writer", () => {
    it("should write log", () => {
        const log = getTestLogError();

        const writer: LogWriter = new LogMockWriter();
        writer.write(log);
        // the mock writer exposes a fake list of logs which have been written, grab them
        // to verify our write worked
        const lastWrite = (writer as LogMockWriter).getLastWrittenlog();

        expect(lastWrite.toString() === log.toString());
    });
});
