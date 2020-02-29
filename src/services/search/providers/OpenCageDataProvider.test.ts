import request from "request-promise";
import * as Provider from "./OpenCageDataProvider";

// unit test
// jest.mock("request-promise");


describe("OpenCageDataProvider", () => {

    test('always true', ()=> {
        expect(true).toEqual(true);
    })

    test("simple query for paris", async () => {
        // (request as any).mockImplementation(() => '{"features": []}');
        const result = await Provider.getPlaces("Paris");
        expect(result.features.length >= 1);
    });

    // test("an invalid non-json response", async () => {
    //     (request as any).mockImplementation(() => "Service Unavailable.");
    //     await expect(Provider.getPlaces("Chamonix")).rejects.toThrow(SyntaxError);
    // });
});
