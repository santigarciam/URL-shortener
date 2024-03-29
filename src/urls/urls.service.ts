import { Injectable } from '@nestjs/common';
import { urlDto } from './urls.dto';
import { Url_entity, UserUrl } from './urls.schema';
import { UserUrlRepository } from './urls.repository';
import { updateUrlDto } from './updateUrl.dto';

@Injectable()
export class UserUrlService {
  constructor(private readonly userUrlRepository: UserUrlRepository) {}

  async getUserUrlsById(userId: number): Promise<UserUrl> {
    return this.userUrlRepository.findById({ _id: userId });
  }

  async createUserUrl(userId: number): Promise<UserUrl> {
    return this.userUrlRepository.create({
      _id: userId,
      urls: [],
    });
  }

  async addUrlToUser(userId: number, urlDto: urlDto): Promise<UserUrl> {
    const url = new Url_entity();
    url.long_link = urlDto.long_link;
    url.short_link = urlDto.short_link;
    url.title = urlDto.title;
    url.tags = [];
    return this.userUrlRepository.findOneAndAddUrl({ _id: userId }, url);
  }

  async deleteUrlFromUser(
    userId: number,
    short_link: string,
  ): Promise<boolean> {
    return this.userUrlRepository.deleteUrlFromUser(
      { _id: userId },
      short_link,
    );
  }

  async updateUrl(
    userId: number,
    urlDto: updateUrlDto,
    url: Url_entity,
  ): Promise<UserUrl> {
    url.long_link = urlDto.long_link;
    url.title = urlDto.title;
    url.tags = url.tags.concat(urlDto.tags);
    return this.userUrlRepository.findOneAndAddUrl({ _id: userId }, url);
  }
}
