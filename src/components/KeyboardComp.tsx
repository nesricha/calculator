type Prop = {
  calculator: string[];
  eventHandler(key: any): void;
};
export default function KeyboardComp(prop: Prop) {
  return (
    <div className="mx-auto text-center font-bold text-lg">
      <div className="grid grid-cols-4 mx-auto">
        {prop.calculator.map((key) => (
          <a
            key={key}
            href="#"
            className={`${
              /^[0-9]*$/.test(key)
                ? `bg-blue-500 hover:bg-blue-600 border-b-4 border-blue-700`
                : `bg-sky-500 hover:bg-sky-600 border-b-4 border-sky-700`
            } mx-auto rounded-lg w-10/12 m-3 px-3 py-1.5 transition-all active:border-b-0 active:border-t-4 active:border-teal-800`}
            onClick={(e) => {
              e.preventDefault();
              prop.eventHandler(key);
            }}
          >
            {key}
          </a>
        ))}
      </div>
    </div>
  );
}
