// Importa las utilidades necesarias
import { procesarSeasons } from '../../app/partidas/utilidades';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { seasonsData } = req.body;
      const seasonsProcesadas = procesarSeasons(seasonsData);
      res.status(200).json(seasonsProcesadas);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al procesar las partidas", error: error.message });
    }
  } else {
    res.status(405).end(); // Método no permitido
  }
}
