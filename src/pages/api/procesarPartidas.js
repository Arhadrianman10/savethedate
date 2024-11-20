// Importa las utilidades necesarias
import { procesarPartidas } from '../../app/partidas/utilidades';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { partidasData, invocadoresData, season } = req.body;
      const partidasProcesadas = procesarPartidas(partidasData, invocadoresData, season);
      res.status(200).json(partidasProcesadas);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al procesar las partidas" });
    }
  } else {
    res.status(405).end(); // Método no permitido
  }
}
