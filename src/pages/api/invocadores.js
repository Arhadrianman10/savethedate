import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("leagueofdogs");

        const { season } = req.query; // Obtener el parámetro 'season' de la consulta

        let query = {};
        if (season) {
            query.Season__c = season; // Filtrar por temporada si se proporciona el parámetro
        }

        const invocadores = await db
            .collection("invocadores")
            .find(query)
            .toArray();

        res.json(invocadores);
    } catch (e) {
        console.log(e);
        console.error(e);
        res.status(500).send("Error al conectar con la base de datos");
    }
};