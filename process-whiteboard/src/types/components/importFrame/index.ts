import { Vec } from "@/types/shapes/common";

type Title = string;

type Data = string[];

type Props = { coordinate: Vec, onConfirm: (title: Title, data: Data) => void, init?: { title: Title, data: Data } };

export type { Title, Data, Props };
