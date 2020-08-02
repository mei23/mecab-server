import { promisify } from 'util';
import load from './load';
const MeCab = require('mecab-async');

const config = load();

export async function mecab(text: string): Promise<string[][]> {
	const mecab = new MeCab();
	mecab.command = config.mecabDic ? `${config.mecabBin} -d ${config.mecabDic}` : config.mecabBin;
	return await promisify(mecab.parse).bind(mecab)(text);
}
