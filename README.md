frontend-nanodegree-neighborhood-map-project
===============================

# Neighborhood Map Project
by Jerrik

## Descritpion
Map of Escondido CA hardcoded with various locations of interest.
Utilize buttons at top to quickly find the best Bars, Restaurants, Parks,
Hiking Trails, and Shopping Centers this city has to offer. Or try searching
for an area with the search bar! (searches must at least partially match location titles)

This project was made using Google Maps API, to provide the map and markers, and Yelp API
to provide the location information for each location's info window.

## Install
You can host this page.. I have done so through Python and Ngrok, using the resulting URL.
    `python -m SimpleHttpServer 8080`
    `./ngrok http 8080`
Otherwise you can clone the repo and open `indexKO.html` in your browser and begin using the Map program!

### Disclaimer: 
You will need your own Yelp API and Google Maps API keys to insert in both
`indexKO.html` (Google Maps API key) and `scriptKO.html` (Yelp API Keys).

## Contributions
Open source, feel free to make additions/optmizations.

## Extra Notes for Grader
Used MarkN's helpful API code - https://discussions.udacity.com/t/how-to-make-ajax-request-to-yelp-api/13699/10 

## License
MIT License

Copyright (c) 2016 Jerrik Neri

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
