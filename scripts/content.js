const start = () => {
  let dexItems = [];
  const items = document.querySelectorAll(
    "a.ds-dex-table-row.ds-dex-table-row-top"
  );

  for (let i = 0; i < items.length; i++) {
    if (i == 15) break;

    const poolNameSpan = items[i].querySelector(
      "img.ds-dex-table-row-dex-icon"
    );
    const poolName = poolNameSpan.title;
    const version = items[i].querySelector(
      "span.ds-dex-table-row-badge.ds-dex-table-row-badge-label"
    ).innerHTML;
    const pool =
      items[i].querySelector("span.ds-dex-table-row-base-token-symbol")
        .innerHTML +
      items[i].querySelector("span.ds-dex-table-row-token-divider").innerHTML +
      items[i].querySelector("span.ds-dex-table-row-quote-token-symbol")
        .innerHTML;
    const tokenName = items[i].querySelector(
      "span.ds-dex-table-row-base-token-name-text"
    ).innerHTML;

    let price = items[i]
      .querySelector("div.ds-table-data-cell.ds-dex-table-row-col-price")
      .innerHTML.trim();
    price = price.replace(/<!--.*?-->/g, "").trim();

    let age = items[i].querySelector(
      "div.ds-table-data-cell.ds-dex-table-row-col-pair-age span"
    ).innerHTML;

    let txns = items[i].querySelector(
      "div.ds-table-data-cell.ds-dex-table-row-col-txns"
    ).innerHTML;

    let volumes = items[i]
      .querySelector("div.ds-table-data-cell.ds-dex-table-row-col-volume")
      .innerHTML.trim();
    volumes = volumes.replace(/<!--.*?-->/g, "").trim();

    let makers = items[i].querySelector(
      "div.ds-table-data-cell.ds-dex-table-row-col-makers"
    ).innerHTML;

    let fiveM = items[i].querySelector(
      "div.ds-table-data-cell.ds-dex-table-row-col-price-change-m5 span"
    ).innerHTML;

    let oneH = items[i].querySelector(
      "div.ds-table-data-cell.ds-dex-table-row-col-price-change-h1 span"
    ).innerHTML;

    let sixH = items[i].querySelector(
      "div.ds-table-data-cell.ds-dex-table-row-col-price-change-h6 span"
    ).innerHTML;

    let twentyH = items[i].querySelector(
      "div.ds-table-data-cell.ds-dex-table-row-col-price-change-h24 span"
    ).innerHTML;

    let liquidity = items[i]
      .querySelector("div.ds-table-data-cell.ds-dex-table-row-col-liquidity")
      .innerHTML.trim();
    liquidity = liquidity.replace(/<!--.*?-->/g, "").trim();

    let mcap = items[i]
      .querySelector("div.ds-table-data-cell.ds-dex-table-row-col-market-cap")
      .innerHTML.trim();
    mcap = mcap.replace(/<!--.*?-->/g, "").trim();

    let item = {
      token: {
        poolName,
        version,
        pool,
        tokenName,
      },
      price,
      age,
      txns,
      volume: volumes,
      makers,
      fiveM,
      oneH,
      sixH,
      twentyH,
      liquidity,
      mcap,
    };

    dexItems.push(item);
  }

  chrome.runtime.sendMessage({ action: "saveJson", data: dexItems });
};

const export2JSON = (items, fileName) => {
  let blob = new Blob([json], { type: "application/json" });
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;

  document.body.appendChild(link);
  link.click();
  document.removeChild(link);
};

setInterval(start, 5000);
