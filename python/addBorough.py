import io
import json
import reverse_geocoder as rg

with open('Positions.json') as json_file:
	data = json.load(json_file)
	for p in data:
		coordinates = [(p['lat'], p['long'])]
		results = rg.search(coordinates, mode=1)
		p['borough'] = results[0]['name']
	with open('Positions_Boroughs.json', 'w') as json_out:
		json.dump(data, json_out)

