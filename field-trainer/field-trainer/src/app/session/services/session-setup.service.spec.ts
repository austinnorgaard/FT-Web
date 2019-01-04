describe("SessionSetupService", () => {
    beforeEach(() => {
        console.log("Starting a test!");
    });
    it("should pass", () => {
        const a = true;
        console.log("hello");
        expect(a).toBeTruthy();
    });
    afterEach(() => {
        console.log("test done!");
    });
    afterAll(() => {
        console.log("Everythings done!");
    });
});
