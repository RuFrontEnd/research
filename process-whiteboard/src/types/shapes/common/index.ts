import Core from "@/shapes/core";
import Process from "@/shapes/process";
import Curve from "@/shapes/curve";

type Id = string;

type W = number;

type H = number;

type C = string;

type Vec = { x: number; y: number };

type Shapes = Core | Process | Curve;

enum Direction {
  l = "l",
  t = "t",
  r = "r",
  b = "b",
}

type Title = string;

type DataId = string;

type DataIds = DataId[];

type CurrentDataIds = { [id: DataId]: boolean };

type DataTable = { [id: DataId]: string };

export type {
  Id,
  W,
  H,
  C,
  Vec,
  Shapes,
  Title,
  DataId,
  DataIds,
  CurrentDataIds,
  DataTable,
};
export { Direction };
