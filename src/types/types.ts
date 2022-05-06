/**
 * Soul
 */
export interface Item {
  name: string;
  serial?: string;
  traits: any[];
  backgroundColor: string;
  image: string;
}

export interface TokenData {
  name: string
  description: string
  attributes: ItemTrait[]
  image: string
}

/**
 * Trait
 */
export interface ItemTrait {
  trait_type: string;
  value: string;
}

/**
 * Traits
 */
export interface Trait {
  trait_type: string;
  value: string;
}

/**
 * Daily Tweet status data
 */
export interface DailyTweet {
  status: string;
}

/**
 * Cronjob names
 */
export enum CronJobs {
  SALES_CHECKER = 'Sales Checker',
}

/**
 * Sale type
 */
export interface Sale {
  id: string;
  title: string;
  tokenSymbol: string;
  tokenPrice: number;
  usdPrice?: string;
  buyerAddr: string;
  buyerName?: string;
  sellerAddr: string;
  sellerName?: string;
  txHash: string;
  cacheKey: string;
  permalink: string;
  thumbnail: string;
  backgroundColor: string;
  market: string;
  marketIcon: string;
}

export enum Market {
  OPENSEA = 'OpenSea',
  LOOKSRARE = 'Looks Rare',
  NFTX = 'NFTX',
}

export enum MarketIcons {
  OPENSEA = 'https://raw.githubusercontent.com/ajcrowe/runebot/master/assets/os.png',
  LOOKSRARE = 'https://raw.githubusercontent.com/ajcrowe/runebot/master/assets/lr.png',
  NFTX = 'https://raw.githubusercontent.com/ajcrowe/runebot/master/assets/nft-x.png',
}

/**
 * Token Currency to Symbols
 */
export enum TokenSymbols {
  WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
}
