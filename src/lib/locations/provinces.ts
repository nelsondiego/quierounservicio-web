export type Province = {
  id: number;
  name: string;
  lat: number;
  lon: number;
};

export const provinces: Province[] = [
  { 'id': 54, 'name': "Misiones", 'lat': -26.875396508683, 'lon': -54.651696623037 },
  { 'id': 74, 'name': "San Luis", 'lat': -33.757725744914, 'lon': -66.028129819584 },
  { 'id': 70, 'name': "San Juan", 'lat': -30.865367997962, 'lon': -68.889490848684 },
  { 'id': 30, 'name': "Entre Ríos", 'lat': -32.058873543645, 'lon': -59.201447551464 },
  { 'id': 78, 'name': "Santa Cruz", 'lat': -48.815485182706, 'lon': -69.955762167197 },
  { 'id': 62, 'name': "Río Negro", 'lat': -40.40579571788, 'lon': -67.229329893694 },
  { 'id': 26, 'name': "Chubut", 'lat': -43.788623352988, 'lon': -68.526759394335 },
  { 'id': 14, 'name': "Córdoba", 'lat': -32.142932663607, 'lon': -63.801753274166 },
  { 'id': 50, 'name': "Mendoza", 'lat': -34.629887305896, 'lon': -68.58312281838 },
  { 'id': 46, 'name': "La Rioja", 'lat': -29.685776298315, 'lon': -67.181735969443 },
  { 'id': 10, 'name': "Catamarca", 'lat': -27.335833281022, 'lon': -66.947682429993 },
  { 'id': 42, 'name': "La Pampa", 'lat': -37.131553773595, 'lon': -65.446654660695 },
  { 'id': 86, 'name': "Santiago del Estero", 'lat': -27.782411655094, 'lon': -63.252386656859 },
  { 'id': 18, 'name': "Corrientes", 'lat': -28.774304704641, 'lon': -57.801219197791 },
  { 'id': 82, 'name': "Santa Fe", 'lat': -30.706927158812, 'lon': -60.949836943024 },
  { 'id': 90, 'name': "Tucumán", 'lat': -26.947800183079, 'lon': -65.364757944148 },
  { 'id': 58, 'name': "Neuquén", 'lat': -38.64175758246, 'lon': -70.11857051806 },
  { 'id': 66, 'name': "Salta", 'lat': -24.2991344492, 'lon': -64.814462960063 },
  { 'id': 22, 'name': "Chaco", 'lat': -26.386430906123, 'lon': -60.76583074386 },
  { 'id': 34, 'name': "Formosa", 'lat': -24.894972594871, 'lon': -59.932440580087 },
  { 'id': 38, 'name': "Jujuy", 'lat': -23.320078421135, 'lon': -65.764252218034 },
  { 'id': 2, 'name': "Ciudad Autónoma de Buenos Aires", 'lat': -34.614493411969, 'lon': -58.445856354543 },
  { 'id': 6, 'name': "Buenos Aires", 'lat': -36.676941518053, 'lon': -60.558831981572 },
  { 'id': 94, 'name': "Tierra del Fuego", 'lat': -82.52151781221, 'lon': -50.742748604979 }
];

provinces.sort((a, b) => a.name.localeCompare(b.name));