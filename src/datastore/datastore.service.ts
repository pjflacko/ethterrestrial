import { Injectable, Logger } from '@nestjs/common';
import { EthereumService } from 'src/ethereum';
import {
  Item,
  ItemTrait,
} from 'src/types';
import { AppConfigService } from '../config';

@Injectable()
export class DataStoreService {
  private readonly _logger = new Logger(DataStoreService.name);

  get name(): string {
    return 'DataStoreService';
  }

  constructor(
    protected readonly configService: AppConfigService,
    protected readonly ethereumService: EthereumService,
  ) {}

  /*
   * get soul
   */
  public async getItem(id: string): Promise<Item> {
    try {
      const json = await this.ethereumService.getTokenData(id, this.configService.collection);

      const attrs: Array<ItemTrait> = json.attributes;
      const traits = [];
      for (const attr of attrs) {
        traits.push({ name: attr.trait_type, value: attr.value , inline: true });
      }
      return {
        serial: id,
        name: json.name,
        backgroundColor: '000000',
        traits: traits,
        image: json.image,
      };
    } catch (err) {
      this._logger.error(err);
    }
  }
}
