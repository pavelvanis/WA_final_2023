
# House estate

Uživatelé mají možnost se zaregistrovat a hledat nebo vytvářet nové nabídky prodeje domů.

## Obsah

- [Popis](#popis)
- [Funkce](#funkce) 
- [Instalace](#instalace)
- [Použití](#použití)
- [Technologie](#technologie)

## Popis

Na stránce je možné vytvářet nové nabídky prodejů domů a prohlížet si nabídky ostatních uživatelů.

## Funkce

- Registrace
- Zobrazení všech nabídek
- Informace o profilu uživatele a jeho aktuálních nabídkách

## Instalace

1. Stažení projektu: `git clone https://github.com/pavelvanis/WA_final_2023.git`

## Použití

#### Abys mohl spustit projekt, musíš mít nainstalovaný `Node.js`

#### Backend

1. Nainstaluj všechny potřebné knihovny pomocí `npm install`
2.  Spuštění projektu: `npm start`
3. Server s backendem bude naslouchat na portu `3000`
 

#### API
 - API poběží na adrese `http://localhost:3000/api/`
	
	#### !! API je přístupná pouze s tokenem, který se generuje uživateli při přihlášení !!

	## Users 
	- GET -  `/user` - vrátí seznam všech uživatelů v databázi
	- POST -  `/user` - vytvoří nového uživatele
	- GET -  `/user/:id` - vrátí informace o uživateli podle id
	- PATCH -  `/user/:id` - aktualizuje uživatele s daným id
	- DELETE -  `/user/:id` - vymaže uživatele s daným id

	## Houses 
	- GET -  `/house` - vrátí seznam všech domů v databázi
	- POST -  `/house` - vytvoří nový dům
	- GET -  `/house/:id` - vrátí informace o domu podle zadaného id
	- PATCH -  `/house/:id` - aktualizuje dům s daným id
	- DELETE -  `/house/:id` - vymaže dům s daným id

	## Offers
	- GET -  `/offer` - vrátí seznam všech nabídek v databázi
	- POST -  `/offer` - vytvoří novou nabídku
	- GET -  `/offer/:id` - vrátí informace o nabídce podle zadaného id
	- PATCH -  `/offer/:id` - aktualizuje nabídku s daným id
	- DELETE -  `/offer/:id` - vymaže nabídku s daným id

#### Frontend

1. Frontend se nachází v podsložce `client`, takže se musíš příkazem `cd client` přepnout do jiné složky
2. Projekt spustíme: `npm run dev`
3. Stránka se spustí na portu `5173`

##  Technologie

- **Vite** - vytváření react aplikace
- **React** - frontend
- **MongoDB** - databáze
- **Node.JS**
- **express** - backend
- **nodemon** - spouštění serveru
- **http-errors** - vytváření errorů
- **dotenv** - ukládání tajných dat
- **axios** - posílání requestů
- **bcrypt** - hashování hesel
- **jsonwebtoken** - vytváření tokenu pro uživatele
- **mongoose** - práce s MongoDB
- **chakra UI** - css framework
- **react-router-dom** - routing na stránce

