import { Vec, Title, DataId } from "@/types/shapes/common";

type Data = { id: DataId; text: string }[];

type Props = {
  id: string;
  key: string;
  coordinate: Vec;
  onConfirm: (title: Title, data: Data) => void;
  init?: { title: Title; data: Data };
};

export type { Data, Props };
