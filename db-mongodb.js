const { MongoClient, ObjectId } = require('mongodb')

const url = ''

const client = new MongoClient(url)
const dbName = 'kurs-node'
const collection = db.collection('companies')

async function main() {
	await client.connect()
	console.log('polaczenie udane')

	const db = client.db(dbName)

	//tworzenie
	//companies
	// await db.collection('comapnies').insertOne({ slug: 'tworcastron', name: 'Tworca Stron' }) //nazwa bazy i kolekcji i umiescic jeden element - wywolane raz w kursie i zakomentowane

	//pobieranie po object id _id wymaga zalinkowanie objectid z mongodb
	// const res = await db.collection('companies').find({ slug: 'tworcastron' }).toArray() //find szuka wszystkich i trzbea toarray - odnajdowanie - wszystkie elementy to puste pola

	//usuwanie
	await collection.deleteOne({ slug: 'tworcastron' })

	// console.log(res)
	console.log(ObjectId().getTimestamp())
	// { slug: 'tworcastron', name: 'Tworca Stron' },
}

main()
	.catch(ex => console.log('cos poszlo nie tak')) //wylapywanie bledow
	.finally(() => client.close()) //zamykanie polaczenia
