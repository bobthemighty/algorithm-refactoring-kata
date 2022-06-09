import { Finder } from ".";
import {Temporal} from "@js-temporal/polyfill"

const sue = {name: "Sue", birthDate: Temporal.PlainDate.from("1950-01-01")}
const greg = {name: "Greg", birthDate: Temporal.PlainDate.from("1952-06-01")}
const sarah = {name: "Sarah", birthDate: Temporal.PlainDate.from("1982-01-01")}
const mike = {name: "Mike", birthDate: Temporal.PlainDate.from("1979-01-01")}

describe("Finder", () => {

  it("should return empty result for an empty list", () => {
    const finder = new Finder([]);
    expect(finder.find("one")).toEqual({
      p1: null,
      p2: null,
      d: Temporal.Duration.from({seconds: 0})
    })
  });

  it("should return an empty result when there's only one person", ()=> {
    const finder = new Finder([sue]);
    expect(finder.find("one")).toEqual({
      p1: null,
      p2: null,
      d: Temporal.Duration.from({seconds: 0})
    })
  });

  it("should return closest two for two people", () => {
    const finder = new Finder([sue, greg]);
    const result = finder.find("one");

    expect(result.p1).toEqual(sue)
    expect(result.p2).toEqual(greg)
  })

  it("should return furthest two for two people", () => {
    const finder = new Finder([greg, mike]);
    const result = finder.find("two");
    expect(result.p1).toEqual(greg)
    expect(result.p2).toEqual(mike)
  })

  it("should return furthest two for four people", () => {
    const finder = new Finder([greg, mike, sarah, sue]);
    const result = finder.find("two");
    expect(result.p1).toEqual(sue)
    expect(result.p2).toEqual(sarah)
  })

  it("should return closest two for four people", () => {
    const finder = new Finder([greg, mike, sarah, sue]);
    const result = finder.find("one");
    expect(result.p1).toEqual(sue)
    expect(result.p2).toEqual(greg)

  })
});
