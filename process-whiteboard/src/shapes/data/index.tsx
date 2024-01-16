"use client";
import Core from "@/shapes/core";
import ReactDom from "react-dom";
import ImportFrame from "@/components/importFrame";
import {
  Vec,
  Id,
  W,
  H,
  C,
  Title,
  DataIds,
  CurrentDataIds,
  DataTable,
} from "@/types/shapes/common";
import { Data as DataType } from "@/types/components/importFrame";

export default class Data extends Core {
  isFrameOpen: boolean;
  title: Title;
  dataIds: DataIds;
  currentDataIds: CurrentDataIds;
  frameOffset: number;

  constructor(id: Id, w: W, h: H, p: Vec, c: C, dataTable: DataTable) {
    super(id, w, h, p, c, dataTable);
    this.isFrameOpen = false;
    this.title = "";
    this.dataIds = [];
    this.currentDataIds = {};
    this.frameOffset = 20;
  }

  getCoordinate = () => {
    return {
      x: this.p.x + this.w / 2 + 10,
      y: this.p.y,
    };
  };

  onConfirm = (title: Title, data: DataType) => {
    this.title = title;
    this.dataIds = data.map((dataItem) => dataItem.id);
    this.dataIds.forEach((dataId) => {
      this.currentDataIds[dataId] = true;
    });

    data.forEach((dataItem) => {
      if (!this.dataTable[dataItem.id]) {
        this.dataTable[dataItem.id] = dataItem.text;
      }
    });
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

  onMouseMove(p: Vec, receivable?: boolean) {
    super.onMouseMove(p, receivable);
    const $body = document.querySelector("body");

    if (!this.checkBoundry(p) || !$body || !this.isFrameOpen) return;

    return {
      id: this.id,
      portal: ReactDom.createPortal(
        <ImportFrame
          id={this.id}
          key={this.id}
          coordinate={this.getCoordinate()}
          onConfirm={this.onConfirm}
          init={{
            title: this.title,
            data: this.getInitData(),
          }}
        />,
        $body
      ),
    };
  }

  onDoubleClick(p: Vec) {
    const $body = document.querySelector("body");

    if (!this.checkBoundry(p) || !$body) return;

    this.isFrameOpen = true;

    return {
      id: this.id,
      portal: ReactDom.createPortal(
        <ImportFrame
          id={this.id}
          key={this.id}
          coordinate={this.getCoordinate()}
          onConfirm={this.onConfirm}
          init={{
            title: this.title,
            data: this.getInitData(),
          }}
        />,
        $body
      ),
    };
  }

  drawShape(ctx: CanvasRenderingContext2D) {
    const x1 = -this.w / 2 + this.frameOffset,
      y1 = -this.h / 2,
      x2 = this.w / 2,
      y2 = -this.h / 2,
      x3 = this.w / 2 - this.frameOffset,
      y3 = this.h / 2,
      x4 = -this.w / 2,
      y4 = this.h / 2;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.closePath();
    ctx.fill();
  }
}
