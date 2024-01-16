"use client";
import Core from "@/shapes/core";
import ReactDom from "react-dom";
import SelectDataFrame from "@/components/selectDataFrame";
import {
  Vec,
  Id,
  W,
  H,
  C,
  Title,
  DataIds,
  DataTable,
} from "@/types/shapes/common";
import { Data as DataType } from "@/types/components/importFrame";

export default class Process extends Core {
  isFrameOpen: boolean;
  title: Title;
  dataIds: DataIds;
  frameOffset: number;

  constructor(id: Id, w: W, h: H, p: Vec, c: C, dataTable: DataTable) {
    super(id, w, h, p, c, dataTable);
    this.isFrameOpen = false;
    this.title = "";
    this.dataIds = [];
    this.frameOffset = 20;
  }

  getCoordinate = () => {
    return {
      x: this.p.x + this.w / 2 + 10,
      y: this.p.y,
    };
  };

  getInitData = () => {
    const initData: DataType = [];

    this.dataIds.forEach((dataId) => {
      if (this.dataTable[dataId]) {
        initData.push({
          id: dataId,
          text: this.dataTable[dataId],
        });
      }
    });

    return initData;
  };

  onConfirm = (title: Title, data: DataType) => {
    this.title = title;
    this.dataIds = data.map((dataItem) => dataItem.id);

    data.forEach((dataItem) => {
      if (!this.dataTable[dataItem.id]) {
        this.dataTable[dataItem.id] = dataItem.text;
      }
    });
  };

  onDoubleClick(p: Vec) {
    const $body = document.querySelector("body");

    if (!this.checkBoundry(p) || !$body) return;

    this.isFrameOpen = true;

    return ReactDom.createPortal(
      <SelectDataFrame
        coordinate={this.getCoordinate()}
        onConfirm={this.onConfirm}
        init={{
          title: this.title,
          data: this.getInitData(),
        }}
      />,
      $body
    );
  }

  onMouseMove(p: Vec, receivable?: boolean) {
    super.onMouseMove(p, receivable);
    const $body = document.querySelector("body");

    if (!this.checkBoundry(p) || !$body || !this.isFrameOpen) return;

    return ReactDom.createPortal(
      <SelectDataFrame
        coordinate={this.getCoordinate()}
        onConfirm={this.onConfirm}
        init={{
          title: this.title,
          data: this.getInitData(),
        }}
      />,
      $body
    );
  }

  drawShape(ctx: CanvasRenderingContext2D) {
    const edge = this.getEdge();

    ctx.beginPath();
    ctx.fillRect(edge.l - this.p.x, edge.t - this.p.y, this.w, this.h);
    ctx.closePath();
  }
}
