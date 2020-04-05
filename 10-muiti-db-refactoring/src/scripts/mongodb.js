// sudo docker ps -a

// sudo docker -it e56206890dba /
// 	mongo -u rafaelleal -p minhasenhasecreta --authenticationDatabase herois

// show dbs
// use herois

// show collections

db.herois.insert({
	nome: "Flash",
	poder: "Velocidade",
	dataNascimento: "1995-01-01"
});

db.herois.find();
db.herois.find().pretty();

for (let i = 0; i <= 100000; i++) {
	db.herois.insert({
		nome: `Clone-${i}`,
		poder: "Velocidade",
		dataNascimento: "1995-01-01"
	});
}

db.heroirs.count();

db.herois.findOne();

db.herois
	.find()
	.limit(1000)
	.sort({ nome: -1 });

db.herois.find({}, { poder: 1, _id: 0 });

db.herois.find({ nome: "Flash" });

// --- Create
db.herois.insert({
	nome: "Flash",
	poder: "Velocidade",
	dataNascimento: "1995-01-01"
});

// --- Read
db.herois.find();

// --- Update
db.herois.update(
	{ _id: ObjectId("5e85532ed827637543e83b3f") },
	{ nome: "Mulher Maravilha" }
);

db.herois.update(
	{ _id: ObjectId("5e8553e2d827637543e83b53") },
	{ $set: { nome: "Lanterna Verde" } }
);

db.herois.update({ poder: "Velocidade" }, { $set: { poder: "Super Força" } });

// --- Delete

db.herois.remove();
db.herois.remove({});
db.herois.remove({ nome: "Mulher Maravilha" });
