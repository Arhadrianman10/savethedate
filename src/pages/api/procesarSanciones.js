// Importa las utilidades necesarias
import { procesarSanciones } from '../../app/partidas/utilidades';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { invocadoresData, seasonsData } = req.body;
      const sancionesProcesados = procesarSanciones(invocadoresData, seasonsData);

      res.status(200).json(sancionesProcesados);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al procesar las partidas", error: error.message });
    }
  } else {
    res.status(405).end(); // Método no permitido
  }
}
