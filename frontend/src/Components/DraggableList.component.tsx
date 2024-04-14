import update from "immutability-helper";
import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";

import { Card } from "./DraggableItem.component";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../redux/store";
import { Button } from "@mui/material";
import { updateOrder } from "../redux/reducer/version.reducer";

const style = {
  width: 400,
};

export interface Item {
  id: number;
  text: string;
}

export interface ContainerState {
  cards: string[];
}

export const Container: FC = () => {
  {
    const [cards, setCards] = useState([
      "Personal Info",
      "Education",
      "Professional Info",
    ]);
    const dispatch = useDispatch();
    const { version, loading } = useSelector(
      (state: IRootState) => state.versionReducer
    );

    useEffect(() => {
      if (version?.order) {
        setCards(version.order);
      }
    }, [version]);

    const handleSubmit = () => {
      console.log("order", cards);
      dispatch(
        updateOrder({
          templateId: version.templateId._id,
          order: cards,
          fieldsId: version.fieldsId._id,
        }) as any
      );
    };

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
      setCards((prevCards: string[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as string],
          ],
        })
      );
    }, []);

    const renderCard = useCallback((card: string, index: number) => {
      return (
        <Card
          key={card}
          index={index}
          id={card}
          text={card}
          moveCard={moveCard}
        />
      );
    }, []);

    return (
      <>
        <div className="p-5" style={style}>
          {cards.map((card, i) => renderCard(card, i))}
        </div>
        <Button
          sx={{ marginLeft: "1rem" }}
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          Update order
        </Button>
      </>
    );
  }
};
