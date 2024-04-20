import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Container } from "../Components/DraggableList.component";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getVersion } from "../redux/reducer/version.reducer";

export default function Order() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVersion() as any);
  }, [dispatch]);

  return (
    <>
      <h1 className="font-bold text-lg ms-3 mt-3 mb-3">Order</h1>
      <DndProvider backend={HTML5Backend}>
        <Container />
      </DndProvider>
    </>
  );
}
