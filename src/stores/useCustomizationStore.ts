import { Content } from "@prismicio/client";
import { create } from "zustand";

type State = {
  selectedWheel?: Content.BoardCustomizerDocumentDataWheelsItem;
  setWheel: (wheel: Content.BoardCustomizerDocumentDataWheelsItem) => void;
  selectedDeck?: Content.BoardCustomizerDocumentDataDecksItem;
  setDeck: (deck: Content.BoardCustomizerDocumentDataDecksItem) => void;
  selectedTruck?: Content.BoardCustomizerDocumentDataMetalsItem;
  setTruck: (metal: Content.BoardCustomizerDocumentDataMetalsItem) => void;
  selectedBolt?: Content.BoardCustomizerDocumentDataMetalsItem;
  setBolt: (bolt: Content.BoardCustomizerDocumentDataMetalsItem) => void;

};

export default create<State>((set) => ({
  selectedWheel: undefined,
  setWheel: (wheel) => set({ selectedWheel: wheel }),
  selectedDeck: undefined,
  setDeck: (deck) => set({ selectedDeck: deck }),
  selectedTruck: undefined,
  setTruck: (truck) => set({ selectedTruck: truck }),
  selectedBolt: undefined,
  setBolt: (bolt) => set({ selectedBolt: bolt }),
}));
