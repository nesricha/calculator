import { useState } from "react";
import InputComp from "./InputComp";
import KeyboardComp from "./KeyboardComp";

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
  // const keybAlternatives = ["Backspace", "Delete", "Enter"]
  const firstPress = ["(", ".", "-"];
  const [exp, setExp] = useState<string[]>([]);
  const [res, setRes] = useState<number>(0);

  const calcRes = () => {
    let expression = exp.join("");
    let result = new Function("return " + expression);
    let newRes = result();
    if (exp.length) {
      setRes(newRes);
      setExp([`${newRes}`]);
    } else {
      console.log("Invalid expression");
    }
  };

  const eventHandler = (key: any) => {
    try {
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
      setRes(NaN);
      setExp(["Syntax ERROR"])
      console.log(
        `Invalid expression. More details: ${JSON.stringify({ err }, null)}`
      );
    }
  };

  // if (typeof document !== "undefined") {
  //   document.addEventListener("keydown", ev => {
  //     (calculator.includes(ev.key) || keybAlternatives.includes(ev.key)) && eventHandler(ev.key)
  //     ev.stopPropagation()
  //   })
  // }

  return (
    <div className="mx-auto w-4/12 min-w-[300px] max-w-[400px] bg-teal-800 border-b-8 border-b-teal-900 border-x-4 border-x-teal-950 text-white rounded-2xl p-2">
      <InputComp exp={exp} res={res} />
      <KeyboardComp calculator={calculator} eventHandler={eventHandler} />
    </div>
  );
}
