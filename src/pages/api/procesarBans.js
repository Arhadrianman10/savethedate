// Importa las utilidades necesarias
import { procesarBans } from '../../app/partidas/utilidades';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { seasonsData } = req.body;
      const bansProcesados = procesarBans(seasonsData);
      res.status(200).json(bansProcesados);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al procesar las partidas", error: error.message });
    }
  } else {
    res.status(405).end(); // Método no permitido
  }
}
