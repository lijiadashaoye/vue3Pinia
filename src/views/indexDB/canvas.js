import { SheetExtension } from '@univerjs/engine-render';
const base64 =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB2aWV3Qm94PSIwIDAgNCA0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8bWFzayBpZD0ibWFzazBfNzU5XzExMDgiIHN0eWxlPSJtYXNrLXR5cGU6YWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjAiIHk9IjAiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjRDZEOEQ5Ii8+CjwvbWFzaz4KPGcgbWFzaz0idXJsKCNtYXNrMF83NTlfMTEwOCkiPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTS0zLjY0MDAyIDMuNDQxNDFMMi4wNzM5NyAtMi4yNzI1OEwyLjc4MTA4IC0xLjU2NTQ4TC0yLjkzMjkxIDQuMTQ4NTJMLTMuNjQwMDIgMy40NDE0MVoiIGZpbGw9IiNENkQ4REIiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0tMS41MTg2OCA1LjU2Mjc1TDQuMTk1MzEgLTAuMTUxMjQ1TDQuOTAyNDIgMC41NTU4NjJMLTAuODExNTc1IDYuMjY5ODZMLTEuNTE4NjggNS41NjI3NVoiIGZpbGw9IiNENkQ4REIiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wLjYwMjY1NiA3LjY4NDAzTDYuMzE2NjUgMS45NzAwM0w3LjAyMzc2IDIuNjc3MTRMMS4zMDk3NiA4LjM5MTEzTDAuNjAyNjU2IDcuNjg0MDNaIiBmaWxsPSIjRDZEOERCIi8+CjwvZz4KPC9zdmc+';

export class ContentCanvasDraw extends SheetExtension {
  uKey = 'mainCustomExtension';
  constructor(sheet, datas) {
    super();
    // console.log(range);
  }

  get zIndex() {
    return 9;
  }

  draw(ctx, parentScale, spreadsheetSkeleton) {
    console.log(ctx, parentScale, spreadsheetSkeleton);
    let img = new Image();
    img.src = base64;
    ctx.drawImage(img, 44, 50, 100, 100);
  }
}
