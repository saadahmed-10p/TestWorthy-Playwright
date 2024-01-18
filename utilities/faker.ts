import { faker } from "@faker-js/faker"

 export class FakerUtility {
    
    faker5Words(){
        return faker.word.words(5)
    }
    
    faker5To10Words(){
        return faker.word.words({ count: { min: 5, max: 10 } })
    }
}
