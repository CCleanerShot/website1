import utils from "./common/utils";

const url = "https://www.amazon.com/Anker-PowerCore-Technology-High-Capacity-Compatible/dp/B07S829LBX/ref=sr_1_4?crid=1A9378Y50Y1TX&keywords=battery%2Bpacks%2Banker&qid=1690219592&sprefix=battery%2Bpacks%2Banker%2Caps%2C107&sr=8-4&th=1"
const url2 = "https://osu-pps.com/#/osu/maps"
const url3 = "https://toiletbril.github.io/cookiezi-clicker/"
const url4 = "https://www.youtube.com/watch?v=4ty0VzIagW4";
const url5 = "";
const cssSelector = "#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2)";
utils.getContents(url, cssSelector);