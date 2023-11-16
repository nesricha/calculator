import { useState } from "react";
import InputComp from "./InputComp";
import KeyboardComp from "./KeyboardComp";
import * as math from "mathjs"

export default function CalcComp() {
  const calculator = [
    "C",
    "<-",
    "(",
    ")",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "/",
    "0",
    ".",
    "=",
  ];
  // const keybAlternatives = ["Backspace", "Delete", "Enter"];
  const firstPress = ["(", ".", "-"];
  const [exp, setExp] = useState<string[]>([]);
  const [res, setRes] = useState<number>(0);
  const [err, setErr] = useState<boolean>(false)

  const calcRes = () => {
    // let expression = exp.join("");
    let result = math.evaluate(exp.join(""));
    // let newRes = result();
    if (exp.length) {
      try {
        setRes(result);
        setExp([`${result}`]);
      } catch (err) {
        setErr(true)
        console.log(`Invalid result: ${JSON.stringify({ err }, null, 4)}`);
      }
    } else {
      setErr(true)
      console.log("Your input is not a valid expression")
    }
  };

  const eventHandler = (key: any) => {
    try {
      setErr(false)

      switch (key) {
        case "C":
        case "Delete":
          setExp([]);
          setRes(0);
          break;

        case "<-":
        case "Backspace":
          setExp(exp.slice(0, -1));
          break;

        case "=":
        case "Enter":
          calcRes();
          break;

        default:
          /^-?[1-9]\d*$/.test(exp[0]) || firstPress.includes(exp[0])
            ? setExp([...exp, key])
            : setExp([`${key}`]);
          break;
      }
    } catch (err) {
      setErr(true)
      setRes(NaN);
      setExp(["Syntax ERROR"]);
      console.log(
        `Invalid expression. More details: ${JSON.stringify({ err }, null)}`
      );
    }
  };

  // if (typeof document !== "undefined") {
  //   let keyPressed = false;
  //   document.addEventListener("keydown", (ev) => {
  //     if (!keyPressed) {

  //       keyPressed = true;

  //       keyPressed &&
  //       (calculator.includes(ev.key) || keybAlternatives.includes(ev.key))
  //         ? eventHandler(ev.key)
  //         : console.log("Invalid key");

  //       console.log(ev.key);
  //     }

  //     ev.stopPropagation();
  //   });
  //   document.addEventListener("keyup", () => {
  //     keyPressed = false;
  //   });
  // }

  return (
    <>
      <div className="mx-auto my-16 w-3/12 min-w-[300px] max-w-[400px] bg-teal-800 border-b-8 border-b-teal-900 border-x-4 border-x-teal-950 text-white rounded-2xl p-2">
        <InputComp exp={exp} res={res} />
        <KeyboardComp calculator={calculator} eventHandler={eventHandler} />
      </div>
      {err && <p className="w-8/12 p-6 mx-auto text-2xl font-bold text-center text-white bg-red-700 min-w-[280px] shadow-2xl">ERROR! Check your input.</p>}
    </>
  );
}
