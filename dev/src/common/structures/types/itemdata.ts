/**
 * startDate: start of when this item was first logged
 * url: url of the item
 * name: name of the item
 * prices: list of prices logged since the start of the first day
 */
export type ItemData = {
    startDate: number,
    url: string,
    name: string,
    prices: number[],
} 