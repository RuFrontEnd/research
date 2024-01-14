import { Vec, Title, Data } from "@/types/shapes/common";

type Props = { coordinate: Vec, onConfirm: (title: Title, data: Data) => void, init?: { title: Title, data: Data } };

export type { Props };
