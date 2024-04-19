interface props {
  index: number;
  name: string;
  handleRemove: (index: number) => void;
  editable: boolean;
}

export default function Option({ index, name, handleRemove,editable }: props) {
  return (
    <div className="flex border-2 py-2 px-3 justify-center items-center mt-3 ms-3 rounded-md">
      {editable ? (
        <span className="cursor-pointer" onClick={() => handleRemove(index)}>
          x
        </span>
      ) : (
        ""
      )}
      <span className="ms-3">{name}</span>
    </div>
  );
}
