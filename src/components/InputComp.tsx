type Prop = {
  exp: string[];
  res: number;
};

export default function InputComp(prop: Prop) {
  return (
    <div className="p-4 m-4 mb-6 text-right border-8 border-b-4 border-teal-900 rounded-lg bg-zinc-400">
      <p className="text-xl truncate">
        {!prop.exp.length ? `${prop.res}` : `${prop.exp.join("")}`}
      </p>
    </div>
  );
}
