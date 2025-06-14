interface DogInterface {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
};

interface LocationInterface {
    zip_code: string
    latitude: number
    longitude: number
    city: string
    state: string
    county: string
}

interface CoordinatesInterface {
    lat: number;
    lon: number;
}

interface MatchInterface {
    match: string
}

export { DogInterface, LocationInterface, CoordinatesInterface, MatchInterface };