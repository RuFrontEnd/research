import Core from "@/shapes/core";
import Process from "@/shapes/process";
import Curve from "@/shapes/curve";

type Id = string;

type W = number;

type H = number;

type C = string;

type Vec = { x: number; y: number };

type Shapes = Core | Process | Curve;

type Direction = "l" | "t" | "r" | "b";

type Title = string;

export type { Id, W, H, C, Vec, Shapes, Direction, Title };
