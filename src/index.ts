import {Temporal} from "@js-temporal/polyfill"

export type FT = "one" | "two"

export interface Thing {
  name: string
  birthDate: Temporal.PlainDate
}

export interface F {
  p1: Thing
  p2: Thing
  d: Temporal.Duration
}

export class Finder {
  constructor(private p: Array<Thing>) {
  }

  public find(ft: FT) : F {
    var tr = [];
    for (let i = 0; i < this.p.length; i++) {
      for (let j = i + 1; j < this.p.length; j ++) {
        const r = Temporal.PlainDate.compare(this.p[i].birthDate, this.p[j].birthDate) === -1 ?
          {
            p1: this.p[i],
            p2: this.p[j],
            d: Temporal.Duration.from({seconds: 0})
          } :
          {
            p1: this.p[j],
            p2: this.p[i],
            d: Temporal.Duration.from({seconds: 0})
          }
        r.d = r.p2.birthDate.since(r.p1.birthDate)
        tr.push(r)
      }
    }
    if(tr.length < 1) return {p1: null as Thing, p2: null as Thing, d: Temporal.Duration.from({seconds: 0})}

    let answer = tr[0];
    for(const result of tr) {
      switch(ft) {
          case "one":
          if (Temporal.Duration.compare(result.d , answer.d) == -1)
              answer = result;
            break
          case "two":
            if (Temporal.Duration.compare(result.d , answer.d) == 1)
              answer = result
            break
      }
    }
    return answer
  }
}
