import * as http from 'http';
import * as Koa from 'koa';
import * as cors from '@koa/cors';

const app = new Koa();

app.use(cors({
	origin: '*'
}));

app.use(async ctx => {
	try {
		ctx.body = {};
		ctx.set('Cache-Control', 'public, max-age=604800');
	} catch (e) {
		console.log(`error: ${e} ${ctx.query.url}`);
		ctx.status = 500;
		ctx.set('Cache-Control', 'public, max-age=3600');
	}
});

const server = http.createServer(app.callback());

const port = process.env.PORT || 3062;

server.listen(port);

console.log(`Listening on port ${port}`);
