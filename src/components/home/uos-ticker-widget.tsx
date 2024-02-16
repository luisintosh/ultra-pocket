import { useEffect, useRef } from "react";

function UOSTicketWidget() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "symbol": "KUCOIN:UOSUSDT",
          "width": "100%",
          "isTransparent": true,
          "colorTheme": "dark",
          "locale": "en"
        }
      `;
    const widgetTag = document.createElement("div");
    widgetTag.className = "tradingview-widget-container__widget";

    container.current?.replaceChildren();
    container.current?.appendChild(widgetTag);
    container.current?.appendChild(script);
  }, []);

  return <div ref={container} className="tradingview-widget-container"></div>;
}

export default UOSTicketWidget;
