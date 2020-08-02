import * as http from 'http';
import * as Koa from 'koa';
import * as cors from '@koa/cors';
import * as bodyParser from 'koa-bodyparser';
import { mecab } from './mecab';

const app = new Koa();

app.use(cors({
	origin: '*'
}));

app.use(bodyParser({
}));

app.use(async ctx => {
	try {
		const text = ctx.query.text || ctx.request.body?.text;

		if (text == null) {
			ctx.status = 400;
			ctx.set('Cache-Control', 'public, max-age=3600');
			return;
		}

		const result = await mecab(text);

		ctx.body = {
			result
		};

		ctx.set('Cache-Control', 'private, max-age=3600');
	} catch (e) {
		console.log(`error: ${e} ${ctx.query.url}`);
		ctx.status = 500;
		ctx.set('Cache-Control', 'private, max-age=3600');
	}
});

const server = http.createServer(app.callback());

const port = process.env.PORT || 3062;

server.listen(port);

console.log(`Listening on port ${port}`);
