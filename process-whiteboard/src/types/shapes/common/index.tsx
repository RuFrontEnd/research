import Core from "@/shapes/core";
import Process from "@/shapes/process";
import Curve from "@/shapes/curve";


type Vec = { x: number; y: number };

type Shapes = Core | Process | Curve;

type Direction = "l" | "t" | "r" | "b";

export type { Vec, Direction, Shapes };
