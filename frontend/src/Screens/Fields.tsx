import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFields } from "../redux/reducer/field.reducer";

export default function Fields() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFields() as any);
  }, []);

  return <div>  
    
  </div>;
}
