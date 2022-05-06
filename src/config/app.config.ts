import { AppConfig } from '../types';

export default (): AppConfig => ({
  bot: {
    salesCheckCron: process.env.SALES_CHECK_CRON || '*/1 * * * *',
    openSeaApiKey: process.env.OPENSEA_API_KEY,
    salesLookbackSeconds: Number(process.env.SALES_LOOKBACK) || 900,
    redisUri: process.env.REDIS_URI || 'redis://localhost:6379',
    looksRareApi: 'https://api.looksrare.org/api/v1/events',
    forgottenApi: 'https://mainnet-api-v4.reservoir.tools/sales',
    nftxApi:
      'https://gateway.thegraph.com/api/690cf8d6987a151008c2536454bd3d7a/subgraphs/id/4gZf3atMXjYDh4g48Zr83NFX3rkvZED86VqMNhgEXgLc',
    salesIcon: 'https://raw.githubusercontent.com/ajcrowe/ethterrestrial/master/assets/img/bot.png',
  },
  collection: {
    tokenContract: '0xd65c5d035a35f41f31570887e3ddf8c3289eb920',
    tokenAbi: 'abis/ethterrestrials.json',
    nftxVaultContract: '',
    openSeaSlug: 'ethterrestrials',
    dataURI:
      '',
    imageURI:
      'https://raw.githubusercontent.com/ajcrowe/ethterrestrial/master/assets/img',
    openSeaBaseURI:
      'https://opensea.io/assets/0xd65c5d035a35f41f31570887e3ddf8c3289eb920',
  },
  discord: {
    token: process.env.DISCORD_BOT_TOKEN,
    salesChannelIds: process.env.DISCORD_SALES_CHANNEL_IDS.split(',') || [],
    prefix: process.env.DISCORD_PREFIX || '#',
  },
  ethereum: {
    network: process.env.ETHEREUM_NETWORK,
    url: process.env.ETHEREUM_URL,
  },
  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessTokenKey: process.env.TWITTER_ACCESS_KEY,
    accessTokenSecret: process.env.TWITTER_ACCESS_SECRET,
  },
});
