import { EventEmitter } from 'events';
import axios from 'axios';

export interface Article {
  id: string;
  title: string;
  content: string;
  abstract: string;
  source: string;
  url: string;
  category: string;
  isHot: boolean;
  isVisual: boolean;
  createTime: string;
  modifyTime: string;
  times: string;
}

function getCurrentTimeParam(): string {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  return `${date} ${time}`;
}

export class LookOnChainScraper extends EventEmitter {
  #isRunning: boolean = false;
  #interval: NodeJS.Timeout | null = null;
  #articles: Article[] = [];
  #apiUrl: string =
    process.env.LOOKONCHAIN_API_URL || 'https://www.lookonchain.com/ashx/index.ashx';

  constructor(intervalMs: number = 5000) {
    super();
    this.start(intervalMs);
  }

  public getRunningStatus(): boolean {
    return this.#isRunning;
  }

  public async getLatestArticles(): Promise<Article[]> {
    if (this.#articles.length === 0) {
      await this.#fetchArticles();
    }
    return this.#articles;
  }

  async #fetchArticles(): Promise<Article[]> {
    try {
      const params = {
        max_time: getCurrentTimeParam(),
        protype: '',
        page: 1,
        count: 10,
      };

      const headers = {
        Accept: 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'en-US,en;q=0.9',
        Connection: 'keep-alive',
        Host: 'www.lookonchain.com',
        Referer: process.env.LOOKONCHAIN_REFERER || 'https://www.lookonchain.com/',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
      };

      const response = await axios.get(this.#apiUrl, {
        params,
        headers,
        timeout: 10000,
      });

      if (!response.data) {
        throw new Error('Invalid response: Response is empty');
      }

      let dataToParse = response.data;
      if (typeof dataToParse === 'string') {
        // Attempt to fix invalid escape sequences by removing the offending backslash.
        // An offending backslash is one that is not part of a valid JSON escape
        // sequence (e.g., \", \\, \/, \b, \f, \n, \r, \t, or \uXXXX).
        dataToParse = dataToParse.replace(/\\(?!["\\/bfnrt]|u[0-9a-fA-F]{4})/g, '');
      }

      const data = JSON.parse(dataToParse);

      if (data.success !== 'Y') {
        throw new Error(`API returned error: ${data.message || 'Unknown error'}`);
      }

      if (!Array.isArray(data.content)) {
        throw new Error('Invalid response: content is not an array');
      }

      const articles = data.content.map((article: any) => ({
        id: article.nnewflash_id,
        title: article.stitle,
        content: article.scontent,
        abstract: article.sabstract,
        source: article.ssource,
        url: article.surl,
        category: article.scata_name,
        isHot: article.is_hot === 'Y',
        isVisual: article.is_visual === 'Y',
        createTime: article.dcreate_time,
        modifyTime: article.dmodi_time,
        times: article.times,
      }));

      this.#articles = articles;
      this.emit('fetchedArticles', articles);
      return articles;
    } catch (error) {
      console.error('Scraper error:', error);
      this.emit('error', error);
      throw error;
    }
  }

  public start(intervalMs: number = 5000): void {
    if (this.#isRunning) return;
    this.#isRunning = true;
    this.#interval = setInterval(() => this.#fetchArticles(), intervalMs);
  }

  public stop(): void {
    if (!this.#isRunning) return;
    this.#isRunning = false;
    if (this.#interval) {
      clearInterval(this.#interval);
      this.#interval = null;
    }
  }
}
