import { diffDays, validDate, validDestination } from '../client/js/utils';


describe("diffDays function", () => {
    it ("should output the difference in days between now and a given string date", () => {
        const d = new Date();
        d.setDate(d.getDate() + 15);
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const dateStr = `${day}-${month}-${year}`;
        expect(diffDays(dateStr)).toEqual(15);
    });
});

describe("validDate function", () => {
    it ("should return true when the given date string is valid", () => {
        const d = new Date();
        const year = d.getFullYear();
        let month = d.getMonth() + 1;
        month = month < 10 ? `0${month}` : month;
        const day = d.getDate();
        const dateStr = `${day}-${month}-${year}`;
        console.log(dateStr);
        expect(validDate(dateStr)).toEqual(true);
    });
    it ("should return false when the given date string is invalid - past date ", () => {
        const d = new Date();
        d.setDate(d.getDate() - 1);
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const dateStr = `${day}-${month}-${year}`;
        expect(validDate(dateStr)).toEqual(false);
    });
    it ("should return false when the given date string is invalid - non existing date ", () => {
        const d = new Date();
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = 32;
        const dateStr = `${day}-${month}-${year}`;
        expect(validDate(dateStr)).toEqual(false);
    }); 
});

describe("validDestination function", () => {
    it ("should return true when the given destination string is valid", () => {
        const dest = "Tokyo";
        expect(validDestination(dest)).toEqual(true);
    });
    it ("should return true when the given destination string is valid", () => {
        const dest = "Salt Lake City";
        expect(validDestination(dest)).toEqual(true);
    });
    it ("should return false when the given destination string is invalid", () => {
        const dest = "Salt-Lake-City";
        expect(validDestination(dest)).toEqual(false);
    });
    it ("should return false when the given destination string is invalid", () => {
        const dest = "nn";
        expect(validDestination(dest)).toEqual(false);
    });
});
