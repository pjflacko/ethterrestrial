/**
 * Application Config
 */
export interface AppConfig {
  bot: BotConfig;
  ethereum: EthereumConfig;
  discord: DiscordConfig;
  twitter: TwitterConfig;
  // collection config
  collection: CollectionConfig;
}

/**
 * Bot config options
 */
export interface BotConfig {
  salesCheckCron: string;
  salesLookbackSeconds: number;
  openSeaApiKey: string;
  looksRareApi: string;
  nftxApi: string;
  forgottenApi: string;
  redisUri: string;
  salesIcon: string;
}

/**
 * Ethereum node config options
 */
export interface EthereumConfig {
  url: string;
  network: string;
}

/**
 * Wizards configuration
 */
export interface CollectionConfig {
  tokenContract: string;
  tokenAbi: string;
  nftxVaultContract?: string;
  openSeaSlug: string;
  dataURI?: string;
  imageURI?: string;
  openSeaBaseURI?: string;
  forgottenSlug?: string;
}

/**
 * Discord configuration
 */
export interface DiscordConfig {
  token: string;
  salesChannelIds: Array<string>;
  prefix: string;
}

/**
 * Twitter api credentials
 */
export interface TwitterConfig {
  consumerKey: string;
  consumerSecret: string;
  accessTokenKey: string;
  accessTokenSecret: string;
}
