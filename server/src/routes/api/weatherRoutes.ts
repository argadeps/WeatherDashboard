import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
// TODO: GET weather data from city name
// TODO: save city to search history


router.post('/', async (req: Request, res: Response) => {
  try {
    const cityName = req.body.cityName;
    

    if (!cityName) {
      return res.status(400).json({error:'City Name is required'})
    }

      const data = await WeatherService.getWeatherForCity(cityName);
      await HistoryService.addCity(cityName);
      return res.json(data);
    
  } catch (error) {
     return res.status(500).json(error);
  }
});

router.get('/history', async (_req: Request, res: Response) => {
  HistoryService.getCities()
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ error: 'City ID is required' });
      return;
    }

    await HistoryService.removeCity(req.params.id);
    res.json({ success: 'Removed city from search history' });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
