import { Application, Request, Response } from "express";
import CoursesData from "../../data/courses.json";
const axios = require("axios")
require('dotenv').config();
const APY_KEY = process.env.APY_KEY_YOUTUBE 



export const loadApiEndpoints = (app: Application): void => {
  app.get("/api", (req: Request, res: Response) => {
    return res.status(200).send(CoursesData);
  });

  app.get("/youtube", async (req: Request, res: Response) => {
    let youTubeApi = "https://youtube.googleapis.com/youtube/v3/search";
    let part = "snippet";
    let query = "te felicito";
    // let apiKeyYouTube = "AIzaSyDr0UkQq34rwvDof2Dpfg0cNDKwRgV9KBM";
   
    const options = {
    method: 'GET',
    url: youTubeApi,
    params: {
      part: part,
      q: query,
      key: APY_KEY
    },         
  };

    try {
      let resul = await axios.request(options)
      .then(function (response: any) {
        console.log(response.data);
        return response.data;
  
      }).catch(function (error: any) {
  
        console.error(error);
        return error.data;
      });
  
      return res.status(200).json(resul);
      
    } catch (error) {

      console.log(error);
      return res.send('Ocurrió un error');
    }

  });


};





// app.get("/player", async (req: Request, res: Response) => {
//   let marvelUrl = 'https://gateway.marvel.com:443/v1/public/characters'
//   let marvelUrl2 = 'http://gateway.marvel.com/v1/public/comics';

//   let publicKey = 'fc9e2780601c613b77ad994a4047c5bf';
//   let privateKey ='24ec078998c258ff388824cb5788c23de46c1e05';
//   // let toHash = `1${privateKey}${publicKey}`; // llevarlo a password generator md5
  
//   // 124ec078998c258ff388824cb5788c23de46c1e05fc9e2780601c613b77ad994a4047c5bf
//   // https://www.md5hashgenerator.com/
//   let hashKey = 'a6761c0adee6c18fef88fefec13c880b';
  
//   // https://developer.marvel.com/docs#!/public/getCreatorCollection_get_0
//   // https://developer.marvel.com/account#
  
//   const options = {
//     method: 'GET',
//     url: marvelUrl,
//     params: {
//       ts: 1,
//       apikey: publicKey,
//       hash: hashKey
//     },         
//   };

//   try {
//     let resul = await axios.request(options)
//     .then(function (response: any) {
//       console.log(response.data);
//       return response.data;

//     }).catch(function (error: any) {

//       console.error(error);
//       return error.data;
//     });

//     return res.status(200).json(resul);
    
//   } catch (error) {

//     console.log(error);
//     return res.send('Ocurrió un error');
//   }

// });


//----------------------------------------------------------------


// app.get("/hotels", async (req: Request, res: Response) => {
   
//   const options = {
//     method: 'GET',
//     url: 'https://hotels4.p.rapidapi.com/locations/v2/search',
//     params: {query: 'new york', locale: 'en_US', currency: 'USD'},
//     headers: {
//       'X-RapidAPI-Key': '48eb7b4950mshb04905a10b9cba3p1e0016jsnf7eb2a3b0711',
//       'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
//     }
//   };

//   try {
//     let resul = await axios.request(options)
//     .then(function (response: any) {
//       console.log(response.data);
//       return response.data;

//     }).catch(function (error: any) {

//       console.error(error);
//       return error.data;
//     });

//     return res.status(200).json(resul);
    
//   } catch (error) {

//     console.log(error);
//     return res.send('Ocurrió un error');
//   }

// });