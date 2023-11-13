import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const calculator = ["C", "<-", "(", ")", "1", "2", "3", "+", "4", "5", "6", "-", "7", "8", "9", "*", "/", "0", ".", "="]
  const keybAlternatives = ["Backspace", "Delete", "Enter"]
  const [exp, setExp] = useState<string[]>([])
  const [res, setRes] = useState<number | undefined>(0)

  const calcRes = () => {
    let expression = exp.join("")
    let result = new Function("return " + expression)
    exp.length ? setRes(result()) : console.log("Invalid expression")
  }

  const eventHandler = (key: any) => {
    try {
      switch (key) {
        case "C":
        case "Delete":
          setExp([])
          setRes(0)
          break;

        case "<-":
        case "Backspace":
          setExp(exp.slice(0, -1))
          break;

        case "=":
        case "Enter":
          calcRes()
          break;

        default:
          (exp[0] !== "0" && exp[0] !== "undefined") ? setExp([...exp, key]) : setExp([`${key}`])
          break
      }
    } catch (err) {
      setRes(undefined)
      console.log(`Invalid expression. More details: ${JSON.stringify({ err }, null)}`)
    }
  }

  if (typeof document !== "undefined") {
    document.addEventListener("keydown", ev => {
      (calculator.includes(ev.key) || keybAlternatives.includes(ev.key)) && eventHandler(ev.key)
      ev.stopPropagation()
    })
  }

  useEffect(() => {
    setExp([`${res}`])
  }, [res])

  return (
    <main className='bg-yellow-50 py-10 h-[100vh]'>
      <p className='text-center p-10 text-5xl font-bold mb-8'>CALCULATOR</p>
      <div className='mx-auto w-4/12 min-w-[300px] max-w-[400px] bg-teal-800 text-white rounded-2xl p-2'>
        <div className='text-right m-4 mb-6 p-4 bg-zinc-400 rounded-lg border-8 border-b-4 border-teal-900'>
          <p className='text-xl'>
            {
              !exp.length ? `${res}` : `${exp.join("")}`
            }
          </p>
        </div>
        <div className='mx-auto text-center font-bold text-lg'>
          <div className='grid grid-cols-4 mx-auto'>
            {calculator.map(key => <a key={key} href="#" className='mx-auto rounded-lg w-10/12 bg-sky-500 m-3 px-3 py-1.5 hover:bg-sky-600 border-b-4 active:border-b-0 active:border-t-4 active:border-t-teal-800 border-sky-700 transition-all' onClick={e => {
              e.preventDefault()
              eventHandler(key)
            }}>{key}</a>)}
          </div>
        </div>
      </div>
    </main>
  )
}
