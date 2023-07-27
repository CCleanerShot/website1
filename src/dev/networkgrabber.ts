import utils from "./common/utils";

const networkgrabber = {
    getPrice: function(url: string, cssSelector: string) {},
}

networkgrabber.getPrice = (url: string, cssSelector: string) => {
    const item: any = utils.getContents(url, cssSelector);
    const price = item.attr("value");
}