// Function accepts CSV, returns... function 2, in which the data parsed from CSV was closed (closure).

function acceptCSV(csv) {
    let cities = csv.split("\n")
        .filter(string => !(string.startsWith("#") || string.trim() === ""))
        .map(string => {
            const [x, y, name, population] = string.split(",");
            return { x, y, name, population }
        })
        .sort((a, b) => b.population - a.population)
        .slice(0, 10)
        .reduce((result, currentValue, index) => ({
            ...result,
            [currentValue.name]: { population: currentValue.population, rating: index + 1 }
        }), {});
    return (text) => {
        let names = new RegExp(Object.keys(cities).join("|"), 'g');
        return text.replace(names, city => `"${city}" (${cities[city].rating}
       місце в ТОП-10 найбільших міст України, населення ${cities[city].population} людей)`);
    }
}

let csvData = `48.30,32.16,Кропивницький,200000,
44.38,34.33,Алушта,31440,
49.46,30.17,Біла Церква,200131,
49.54,28.49,Бердичів,87575,#некоммент

#
46.49,36.58,#Бердянськ,121692,
49.15,28.41,Вінниця,356665,
#45.40,34.29,Джанкой,43343,
50.27,30.30,Київ,2611327,
46.29,30.44,Одеса,1029049,
50.02,36.14,Харків,1470902,
49.26,27.06,Хмельницький,253994,
48.31,35.08,Дніпро,1065008,

# в цьому файлі три рядки-коментаря :)`;


let csvFunction = acceptCSV(csvData);
let text = "міста: Київ, Одеса"
let textTransformFunction = csvFunction(text);

console.log(textTransformFunction);


