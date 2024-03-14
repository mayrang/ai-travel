import { client } from "./sanity";


type User = {
    id: string;
    name: string;
    image: string
}

export async function createUser({id, name, image}:User){
    try{
        const result = await client.createIfNotExists({
            _id: id,
            _type: "user",
            userId: id,
            name,
            image,
            friends: [],
            travels: [],
        });
        console.log("responst", result)
        return result;
    }catch(err){
        return "에러가 발생했습니다."
    }
}