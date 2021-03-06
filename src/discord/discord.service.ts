import { Injectable, Logger } from '@nestjs/common';
import { AppConfigService } from '../config';
import { EthereumService } from 'src/ethereum';
import Discord, { TextChannel, MessageEmbed } from 'discord.js';
import toRegexRange from 'to-regex-range';
import { CollectionConfig, Sale, Item } from 'src/types';
import {
  OpenSeaMarketService,
  LooksRareMarketService,
} from 'src/markets';
import { DataStoreService } from '../datastore';
import { CacheService } from 'src/cache';

@Injectable()
export class DiscordService {
  private readonly _logger = new Logger(DiscordService.name);
  private readonly _client = new Discord.Client();
  private readonly _rangeRegex = new RegExp(`^${toRegexRange('1', '10000')}$`);

  protected _salesChannels: Array<TextChannel>;
  protected _recentTransactions: Array<string>;

  get name(): string {
    return 'DiscordService';
  }

  constructor(
    protected readonly configService: AppConfigService,
    protected readonly etherService: EthereumService,
    protected readonly dataStoreService: DataStoreService,
    protected readonly cacheService: CacheService,
    protected readonly openSeaMarket: OpenSeaMarketService,
    protected readonly looksRareMarket: LooksRareMarketService,
  ) {
    const { token, salesChannelIds } = this.configService.discord;
    this._client.login(token);
    this._client.on('ready', async () => {
      this._salesChannels = [];
      for (const channelId of salesChannelIds) {
        this._salesChannels.push(
          (await this._client.channels.fetch(channelId)) as TextChannel,
        );
      }
      this._recentTransactions = [];
    });
    this.channelWatcher();
  }

  /**
   * Check for Sales
   */
  public async checkSales(cs: CollectionConfig[]): Promise<void> {
    for (const c of cs) {
      //await this.etherService.writeImages(c);
      await this.postSales(await this.openSeaMarket.getSales(c));
      await this.postSales(await this.looksRareMarket.getSales(c));
    }
  }

  /**
   * Post a sale
   */
  public async postSale(embed: MessageEmbed): Promise<void> {
    for (const channel of this._salesChannels) {
      try {
        await channel.send(embed);
      } catch (err) {
        this._logger.error(err);
      }
    }
  }

  /**
   * Post Sales
   */

  public async postSales(sales: Sale[]): Promise<void> {
    for (const sale of sales) {
      const embed = new MessageEmbed()
        .setColor(sale.backgroundColor)
        .setTitle(sale.title)
        .setURL(sale.permalink)
        .setThumbnail(sale.thumbnail)
        .addFields(this.getStandardFields(sale))
        .setFooter(sale.market, sale.marketIcon)

      await this.postSale(embed);
      await this.cacheService.cacheSale(sale.cacheKey);
    }
  }

  /*
   * get standard fields for each sale
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public getStandardFields(sale: Sale): any[] {
    return [
      {
        name: 'Amount',
        value: `${sale.tokenPrice.toFixed(2)} ${sale.tokenSymbol} ${
          sale.usdPrice
        }`,
        inline: false,
      },
      {
        name: 'Buyer',
        value: `[${sale.buyerAddr.slice(0, -34)}](https://opensea.io/accounts/${
          sale.buyerAddr
        }) ${sale.buyerName}`,
        inline: true,
      },
      {
        name: 'Seller',
        value: `[${sale.sellerAddr.slice(
          0,
          -34,
        )}](https://opensea.io/accounts/${sale.sellerAddr}) ${sale.sellerName}`,
        inline: true,
      },
    ];
  }

  /*
   * watch channel for requests for data
   */
  public async channelWatcher(): Promise<void> {
    const { prefix } = this.configService.discord;
    this._client.on('message', async message => {
      if (message.author.bot) return;
      if (!message.content.startsWith(prefix)) return;
      if (this.configService.isDevelopment) {
        if (message.channel.id != '843121547358109700') return;
      }

      const commandBody = message.content.slice(prefix.length);
      const args = commandBody.split(' ');
      const id = args[0].toLowerCase();
      if (!this._rangeRegex.test(id)) {
        this._logger.log(`Item out of range`);
        return;
      }

      const collection = args[1];
      let embed: MessageEmbed;

      switch (collection) {
        //case 'pony':
        //  embed = await this.getEmbed(
        //    await this.dataStoreService.getPony(id),
        //    this.configService.pony,
        //  );
        //  break;
        default:
          embed = await this.getEmbed(
            await this.dataStoreService.getItem(id),
            this.configService.collection,
          );
          break;
      }
      if (embed === undefined) {
        return;
      }
      try {
        this._logger.log(`Posting ${collection} (${id})`);
        message.reply({ embed: embed });
      } catch (error) {
        this._logger.error(`error posting wizard ${id}, ${error}`);
        return;
      }
    });
  }

  public async sleep(ms: number): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public async getEmbed(i: Item, c: CollectionConfig): Promise<MessageEmbed> {
    if (i === undefined) {
      return;
    }
    return new MessageEmbed()
      .setColor(i.backgroundColor)
      .setAuthor(
        `${i.name}`,
        this.configService.bot.salesIcon,
        `${c.openSeaBaseURI}/${i.serial}`,
      )
      .setURL(`${c.openSeaBaseURI}/${i.serial}`)
      .setThumbnail(i.image)
      .addFields(i.traits);
  }
}
