import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("leagueofdogs");

        const { season, fields } = req.query;

        let result;
        if (fields) {
            // Si 'fields' está presente, agrupar por esos campos
            let groupQuery = {
                $group: {
                    _id: {},
                    uniqueValues: { $addToSet: "$$ROOT" } // Recolectar documentos únicos
                }
            };

            fields.split(',').forEach(field => {
                groupQuery.$group._id[field] = `$${field}`;
            });

            let matchQuery = {};
            if (season) {
                matchQuery.Season__c = season;
            }

            // Procesar los campos a devolver
            let projection = {};
            fields.split(',').forEach(field => {
                projection[field] = 1;
            });

            result = await db
                .collection("partidas")
                .aggregate([
                    { $match: matchQuery },
                    { $project: projection }, // Añadir la etapa de proyección aquí
                    groupQuery
                ])
                .toArray();

        } else {
            // Si 'fields' no está presente, realizar una consulta normal
            let query = {};
            if (season) {
                query.Season__c = season; // Filtrar por temporada si se proporciona el parámetro
            }

            result = await db
                .collection("partidas")
                .find(query)
                .toArray();
        }

        res.json(result);
    } catch (e) {
        console.log(e);
        console.error(e);
        res.status(500).send("Error al conectar con la base de datos");
    }
};