type Prop = {
  exp: string[];
  res: number;
};

export default function InputComp(prop: Prop) {
  return (
    <div className="text-right m-4 mb-6 p-4 bg-zinc-400 rounded-lg border-8 border-b-4 border-teal-900">
      <p className="text-xl">
        {!prop.exp.length ? `${prop.res}` : `${prop.exp.join("")}`}
      </p>
    </div>
  );
}
