import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFields } from "../redux/reducer/field.reducer";
import { IRootState } from "../redux/store";

export default function Fields() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFields() as any);
  }, []);

  const { fields } = useSelector((state: IRootState) => state.fieldReducer);
  useEffect(() => {
    console.log("fields on useEffect", fields);
  }, [fields]);

  return <>
    
  </>;
}
