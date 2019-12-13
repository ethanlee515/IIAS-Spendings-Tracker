import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as fs from 'fs'

let records = require('./records.json');

const app = express();
const port = 8080;

app.use(cors());
app.options('/', cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.json(records);
});

app.post('/', (req, res) => {
	let newRec = req.body;
	newRec.deleted = false;
	records.push(newRec);
	fs.writeFile('records.json', JSON.stringify(records), () => {});
	res.end();
});

app.delete('/', (req, res) => {
	let to_delete = req.body;
	for(let record of records) {
		if(record.name == to_delete.name &&
				record.reason == to_delete.reason &&
				record.amount == to_delete.amount &&
				!record.deleted) {
			record.deleted = true;
			fs.writeFile('records.json', JSON.stringify(records), () => {});
			res.end();
			return;
		}
	}
	res.end();
});

app.listen(8080, () => {});
