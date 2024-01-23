import { Vec, Title, Data, DataItem } from "@/types/shapes/common";

type Props = {
  id: string;
  key: string;
  coordinate: Vec;
  onConfirm: (title: Title, data: Data) => void;
  init: { title: Title; options: Data; selections: Data };
};

type Selections = { [dataId: DataItem["id"]]: boolean };

export type { Data, Props, Selections };
