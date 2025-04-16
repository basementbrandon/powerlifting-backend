
import fetch from "node-fetch";
import * as cheerio from "cheerio";

export async function scrapeWRPF() {
  const url = "https://wrpffed.com/meet-calendar/";
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const meets = [];

  $("table.tribe-events-calendar tbody tr").each((index, element) => {
    const columns = $(element).find("td");
    const date = $(columns[0]).text().trim();
    const name = $(columns[1]).text().trim();
    const location = $(columns[2]).text().trim();
    const link = $(columns[1]).find("a").attr("href");

    if (date && name) {
      meets.push({
        name,
        date: new Date(date).toISOString(),
        location: location || "TBD",
        federation: "WRPF",
        link: link || "https://wrpffed.com/meet-calendar/",
        logo: "https://wrpffed.com/wp-content/uploads/2021/05/WRPF-black-red.png"
      });
    }
  });

  return meets;
}
