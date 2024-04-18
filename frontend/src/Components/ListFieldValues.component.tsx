interface props {
  fieldname: string;
  value: string;
  tab:string;
}

export default function ListFieldValues({ fieldname, value,tab }:props) {
  return <div className="flex">
    <span>{fieldname}</span>
    {
        tab === 'uploadedDocs' ?
        <a className="ms-3" href={value} target="_blank">Preview</a>
        :
    <span className="ms-3">{value}</span>
    }
  </div>;
}
