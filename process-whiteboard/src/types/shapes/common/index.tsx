import Core from "@/shapes/core";
import Process from "@/shapes/process";
import Curve from "@/shapes/curve";

type Shapes = Core | Process | Curve;

type Direction = "l" | "t" | "r" | "b";

export type { Direction, Shapes };
