"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const PLANS = [
  { id: "maison", name: "Maison", price: 490 },
  { id: "forma", name: "Forma", price: 590 },
  { id: "orbit", name: "Orbit", price: 690 },
];
// ponytail: mid-range of the $15k-$35k agency quote and ~$150/mo hosting from the comparison table
const AGENCY_UPFRONT = 25000;
const AGENCY_MONTHLY = 150;

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

function useTween(target: number) {
  const [v, setV] = useState(target);
  const cur = useRef({ v: target });
  useEffect(() => {
    const t = gsap.to(cur.current, { v: target, duration: 0.6, ease: "power2.out", onUpdate: () => setV(cur.current.v) });
    return () => { t.kill(); };
  }, [target]);
  return v;
}

/** Interactive cost comparison: agency build vs monthly rental. */
export function RentCalculator() {
  const [months, setMonths] = useState(12);
  const [plan, setPlan] = useState(PLANS[1]);

  const agency = AGENCY_UPFRONT + AGENCY_MONTHLY * months;
  const rental = plan.price * months;
  const saved = agency - rental;
  const max = Math.max(agency, rental);

  const agencyShown = useTween(agency);
  const rentalShown = useTween(rental);
  const savedShown = useTween(saved);

  return (
    <section className="section rent-calc-section" aria-labelledby="calc-title">
      <div className="wrap">
        <div className="rent-calc">
          <div className="rent-calc-controls">
            <span className="service-paths-kicker">COST CALCULATOR</span>
            <h2 id="calc-title" className="h2" style={{ marginTop: 8 }}>See what you keep.</h2>

            <div className="rent-calc-plans" role="radiogroup" aria-label="Flagship">
              {PLANS.map((p) => (
                <button key={p.id} type="button" role="radio" aria-checked={plan.id === p.id}
                  className={`rent-calc-plan ${plan.id === p.id ? "on" : ""}`} onClick={() => setPlan(p)}>
                  {p.name}<small>${p.price}/mo</small>
                </button>
              ))}
            </div>

            <label className="rent-calc-range">
              <span>Time horizon <b>{months} month{months === 1 ? "" : "s"}</b></span>
              <input type="range" min={1} max={36} value={months} onChange={(e) => setMonths(+e.target.value)}
                style={{ ["--p" as string]: `${((months - 1) / 35) * 100}%` }} />
            </label>
            <p className="rent-calc-note">Illustrative: agency build at $25k plus $150/mo hosting vs the {plan.name} rental.</p>
          </div>

          <div className="rent-calc-out">
            <div className="rent-calc-row">
              <span>Agency build</span><b>{usd(agencyShown)}</b>
              <div className="rent-calc-bar"><i style={{ width: `${(agency / max) * 100}%` }} /></div>
            </div>
            <div className="rent-calc-row win">
              <span>{plan.name} rental</span><b>{usd(rentalShown)}</b>
              <div className="rent-calc-bar"><i style={{ width: `${(rental / max) * 100}%` }} /></div>
            </div>
            <div className={`rent-calc-saved ${saved < 0 ? "neg" : ""}`}>
              <span>{saved >= 0 ? "You keep" : "Agency is cheaper by"}</span>
              <strong>{usd(Math.abs(savedShown))}</strong>
            </div>

            <ul className="rent-calc-vs" aria-label="Agency build versus rental">
              <li className="h">
                <span>Agency build</span>
                <span>Rental</span>
              </li>
              <li>
                <span className="a">8 to 16 weeks to launch</span>
                <span className="b">Live in 48 hours</span>
              </li>
              <li>
                <span className="a">Browser and GPU fixes are billed</span>
                <span className="b">Shader upkeep included</span>
              </li>
              <li>
                <span className="a">Locked-in contract</span>
                <span className="b">Cancel with 30 days notice</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
